import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllFeedBack = createAsyncThunk("feedback/getAllFeedBack", async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/v1/getAllFeedback")
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})

export const addFeedback = createAsyncThunk("feedback/addFeedback", async (feedback) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/createFeedback", feedback)
        return response.data
    } catch (e) {
        console.log(e);
    }
})


const feedbackSlice = createSlice({
    name: "feedback",
    initialState: {
        feedbacks: [],
        status: "idle",
        error: null,
        uploading: false
    },
    reducers: {
        feedbackAdded: (state, action) => {
            state.feedbacks.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFeedBack.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllFeedBack.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const feedback = action.payload.data;
                feedback.forEach(element => {
                    if (!state.feedbacks.find(feedback => feedback._id === element._id)) {
                        state.feedbacks.push(element);
                    }
                });
            })
            .addCase(getAllFeedBack.rejected, (state) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addFeedback.pending, (state) => {
                state.uploading = true;
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                // state.feedbacks.push(action.payload)
                state.uploading = false;
            })
            .addCase(addFeedback.rejected, (state) => {
                state.uploading = false;
            })
    }
    // extraReducers: {
    //     [getAllFeedBack.pending]: (state, action) => {
    //         state.status = "loading"
    //     },
    //     [getAllFeedBack.fulfilled]: (state, action) => {
    //         state.status = "succeeded"
    //         state.feedbacks = state.feedbacks.concat(action.payload)
    //     },
    //     [getAllFeedBack.rejected]: (state, action) => {
    //         state.status = "failed"
    //         state.error = action.error.message
    //     }
    // }
})

export const { feedbackAdded } = feedbackSlice.actions
export default feedbackSlice.reducer

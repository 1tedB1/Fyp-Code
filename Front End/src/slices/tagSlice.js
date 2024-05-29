import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllTags = createAsyncThunk("tag/getAllTags", async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/v1/getAllTags")
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})
export const createTag = createAsyncThunk("tag/createTag", async (tag) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/createTag", tag)
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

const tagSlice = createSlice({
    name: "tag",
    initialState: {
        tags: [],
        status: null,
        
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(getAllTags.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getAllTags.fulfilled, (state, { payload }) => {
                state.tags = payload;
                state.status = 'success';
            })
            .addCase(getAllTags.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(createTag.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createTag.fulfilled, (state, { payload }) => {
                state.tags.push(payload);
                state.status = 'success';
            })
            .addCase(createTag.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
})




export default tagSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getPairRequestByUserId = createAsyncThunk("pairRequest/getPairRequestByUserId", async () => {
    try {
        let token = localStorage.getItem("token")
        console.log(token);
        const response = await axios.post("http://localhost:4000/api/v1/getPairRequestByUserId", { token })
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})

export const createPairRequest = createAsyncThunk("pairRequest/createPairRequest", async (pairRequest) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/createPairRequest", pairRequest)
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})

export const deletePairRequest = createAsyncThunk("pairRequest/deletePairRequest", async (pairRequestId) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/deletePairRequest", {pairRequestId})
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})

const pairRequestSlice = createSlice({
    name: "pairRequest",
    initialState: {
        pairRequest: [],
        status: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPairRequestByUserId.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getPairRequestByUserId.fulfilled, (state, action) => {
                state.pairRequest = action.payload;
                state.status = "success";
            })
            .addCase(getPairRequestByUserId.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(createPairRequest.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(createPairRequest.fulfilled, (state, action) => {
                state.pairRequest.push(action.payload);
                state.status = "success";
            })
            .addCase(createPairRequest.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(deletePairRequest.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(deletePairRequest.fulfilled, (state, action) => {
                // state.pairRequest = state.pairRequest.filter((pairRequest) => pairRequest._id !== action.payload._id);
                state.status = "success";
            })
            .addCase(deletePairRequest.rejected, (state, action) => {
                state.status = "failed";
            })
    },
});


export default pairRequestSlice.reducer;

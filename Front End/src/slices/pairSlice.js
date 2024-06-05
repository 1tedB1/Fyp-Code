import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"


export const fetchPairs = createAsyncThunk("pair/fetchPairs", async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/v1/getAllPair")
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})

export const createPair = createAsyncThunk("pair/createPair", async (pair) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/cretaePair", pair)
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

export const deletePair = createAsyncThunk("pair/deletePair", async (id) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/deletePair", {id})
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

export const shareWorkInPair = createAsyncThunk("pair/shareWorkInPair", async (work) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/shareWorkInPair", work)
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

export const addReviewToShareWork = createAsyncThunk("pair/addReviewToShareWork", async (review) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/addReviewToShareWork", review)
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

const pairSlice = createSlice({
    name: "pair",
    initialState: {
        pairs: [],
        status: null,
        selectedPairId : null,
    },
    reducers: {
        setSelectedPairId: (state, { payload }) => {
            state.selectedPairId = payload
        }
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchPairs.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPairs.fulfilled, (state, { payload }) => {
                state.pairs = payload;
                state.status = 'success';
            })
            .addCase(fetchPairs.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(createPair.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createPair.fulfilled, (state, { payload }) => {
                state.pairs.push(payload);
                state.status = 'success';
            })
            .addCase(createPair.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(deletePair.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deletePair.fulfilled, (state, { payload }) => {
                state.pairs = state.pairs.filter(pair => pair._id !== payload._id);
                state.status = 'success';
            })
            .addCase(deletePair.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(shareWorkInPair.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(shareWorkInPair.fulfilled, (state, { payload }) => {
                // state.pairs.push(payload);
                state.status = 'success';
            })
            .addCase(shareWorkInPair.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addReviewToShareWork.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addReviewToShareWork.fulfilled, (state, { payload }) => {
                // state.pairs.push(payload);
                state.status = 'success';
            })
            .addCase(addReviewToShareWork.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
})

export const { setSelectedPairId } = pairSlice.actions

export default pairSlice.reducer
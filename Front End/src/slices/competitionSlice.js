import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const addEntry = createAsyncThunk("competition/addEntry", async (data) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/addEntry", data)
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})

export const getAllCompetitions = createAsyncThunk("competition/getAllCompetitions", async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/v1/getAllCompetitions")
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})


const competitionSlice = createSlice({
    name: "competition",
    initialState: {
        competitions: [],
        status: "loading",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCompetitions.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getAllCompetitions.fulfilled, (state, { payload }) => {
                state.competitions = payload;
                state.status = "success";
            })
            .addCase(getAllCompetitions.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(addEntry.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addEntry.fulfilled, (state,) => {
                // state.competitions = payload;
                state.status = "success";
            })
            .addCase(addEntry.rejected, (state, action) => {
                state.status = "failed";
            })
    },
});

export default competitionSlice.reducer;

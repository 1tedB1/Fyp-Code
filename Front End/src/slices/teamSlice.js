import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTeams = createAsyncThunk("team/getAllTeams", async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/v1/getTeam")
        // console.log(res);
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})

export const createTeam = createAsyncThunk("team/createTeam", async (team) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/createTeam", team)
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

export const deleteTeam = createAsyncThunk("team/deleteTeam", async (id) => {
    try {
        await axios.post("http://localhost:4000/api/v1/deleteTeam", { id })
        return id
    } catch (e) {
        console.log(e);
    }
})

export const addSharedWork = createAsyncThunk("team/addSharedWork", async (data) => {
    try {
        await axios.post("http://localhost:4000/api/v1/addSharedWork", data)
        return data
    } catch (e) {
        console.log(e);
    }
})

const teamSlice = createSlice({
    name: "team",
    status: "loading",
    initialState: {
        teams: [],
        status: "loading",
        userTeams: [],
        selectedTeam: null,
    },
    reducers: {
        getUserTeams: (state, action) => {
            state.userTeams = state.teams.filter(team => team.members.includes(action.payload));
        },
        getTeamById: (state,action)=>{
            
            // state.selectedTeam = state.teams.find(team=>team._id===action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTeams.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getAllTeams.fulfilled, (state, { payload }) => {
                
                state.teams = payload;
                // console.log("hi", state.teams)
                // state.userTeams = state.teams.filter(team => team.members.includes(action.payload));
                state.status = 'success';
            })
            .addCase(getAllTeams.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(createTeam.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createTeam.fulfilled, (state, { payload }) => {
                state.teams.push(payload);
                state.status = 'success';
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(deleteTeam.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteTeam.fulfilled, (state, { payload }) => {
                state.teams = state.teams.filter(team => team._id !== payload);
                state.status = 'success';
            })
            .addCase(deleteTeam.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addSharedWork.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addSharedWork.fulfilled, (state, { payload }) => {
                // const { id, content, title } = payload;
                // const team = state.teams.find(team => team._id === id);
                // team.sharedWork.push({ content, title });
                state.status = 'success';
            })
            .addCase(addSharedWork.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
})

export const { getUserTeams, getTeamById } = teamSlice.actions

export default teamSlice.reducer

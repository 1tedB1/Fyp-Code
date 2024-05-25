import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    // console.log("here");
    try {
        const response = await axios.get("http://localhost:4000/api/v1/getAll")
        // console.log(response.data);
    } catch (e) {
        console.log(e);
    }
    // const data = await response.json()
    // console.log(data);
    // console.log("h");
    // return data
})

export const loginUser = createAsyncThunk("user/loginUser", async ({ email, password }) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/login", { email, password })
        if (response.data.success) {
            localStorage.setItem("token", response.data.token)
            return response.data
        }
        else
            throw new Error("User not found")

    } catch (e) {
        throw e;
    }
})

export const getUser = createAsyncThunk("user/getUser", async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:4000/api/v1/getUser", { token })
        return response.data
    } catch (e) {
        throw e;
    }
})



const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        status: "loggedOut",
        userId: "",
        token: ""
    },
    reducers: {
        logOutUser: (state,) => {
            state.userId = ""
            state.token = ""
            state.isAuthenticated = false;
            state.status = 'loggedOut';
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                // state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {

            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { id, token } = action.payload
                state.userId = id
                state.token = token
                state.isAuthenticated = true;
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state) => {
                state.userId = ""
                state.token = ""
                state.isAuthenticated = false;
                state.status = 'failed';
            })
            .addCase(getUser.pending, (state) => {

            })
            .addCase(getUser.fulfilled, (state, action) => {
                const { id } = action.payload
                const token = localStorage.getItem("token")
                state.userId = id
                state.token = token
                state.isAuthenticated = true;
                state.status = 'succeeded';
            })
            .addCase(getUser.rejected, (state) => {
                state.userId = ""
                state.token = ""
                state.isAuthenticated = false;
                state.status = 'failed';
            })
    }
})


// console.dir(userSlice.actions);

export default userSlice.reducer
export const { login } = userSlice.actions


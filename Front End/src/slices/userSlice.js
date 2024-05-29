import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    // console.log("here");
    try {
        const response = await axios.get("http://localhost:4000/api/v1/getAll")
        // console.log(response.data);
        // console.log("f", response.data.data);
        // console.log("all users slice ", response.data);
        return response.data.data
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
        // console.log("hererere")
        const token = localStorage.getItem("token")
        const response = await axios.post("http://localhost:4000/api/v1/getUser", { token })
        // console.log("res", response);
        return response.data.id
    } catch (e) {
        console.log("er", e);
        throw e;
    }
})


const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isAuthenticated: false,
        status: "loggedOut",
        userId: "",
        loggedInUser: null,
        token: "",
    },
    reducers: {
        logOutUser: (state) => {
            state.userId = ""
            state.token = ""
            state.isAuthenticated = false;
            state.status = 'loggedOut',
                state.loggedInUser = null,
                localStorage.removeItem("token");
        },
        getUserById: (state, action) => {
            state.users.find(user => user._id == action.payload.id)
            console.log(state.users);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                // state.status = 'succeeded';
                state.users = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'loggedOut';
                // state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { id, token } = action.payload
                state.userId = id
                state.token = token
                state.isAuthenticated = true;
                state.status = 'succeeded'
                state.loggedInUser = state.users.find(user => user._id == id);

            })
            .addCase(loginUser.rejected, (state) => {
                state.userId = ""
                state.token = ""
                state.isAuthenticated = false;
                state.status = 'loggedOut'
                state.loggedInUser = null;
            })
            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                // console.log("action.payload =",action.payload);
                const token = localStorage.getItem("token")
                state.userId = action.payload
                // console.log(state.userId);
                state.token = token
                state.isAuthenticated = true;
                state.status = 'succeeded'
                state.loggedInUser = state.users.find(user => user._id == action.payload);
                // console.log(state.loggedInUser);
            })
            .addCase(getUser.rejected, (state) => {
                state.userId = ""
                state.token = ""
                state.isAuthenticated = false;
                state.status = 'loggedOut'
                state.loggedInUser = null;
            })
    }
})


// console.dir(userSlice.actions);

export const { logOutUser, getUserById } = userSlice.actions
export default userSlice.reducer

// export const { login,logOutUser, } = userSlice.actions


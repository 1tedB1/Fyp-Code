import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllChats = createAsyncThunk("chat/getAllChats", async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/v1/getAllChats")
        return response.data.data
    } catch (e) {
        console.log(e);
        throw e
    }
})


export const sendChat = createAsyncThunk("chat/sendChat", async (chat) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/sendChat", chat)
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

export const deleteChat = createAsyncThunk("chat/deleteChat", async (id) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/deleteChat", { id })
        console.log(response);
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

export const editChat = createAsyncThunk("chat/editChat", async (chat) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/editChat", chat)
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

export const viewChat = createAsyncThunk("chat/viewChat", async (id) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/viewChat", { id })
        return response.data.data
    } catch (e) {
        console.log(e);
    }
})

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllChats.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getAllChats.fulfilled, (state, { payload }) => {
                state.chats = payload;
                state.status = 'success';
            })
            .addCase(getAllChats.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(sendChat.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(sendChat.fulfilled, (state, { payload }) => {
                state.chats.push(payload);
                state.status = 'success';
            })
            .addCase(sendChat.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(deleteChat.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteChat.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.chats = state.chats.filter(chat => chat._id !== payload.id);
                state.status = 'success';
            })
            .addCase(deleteChat.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(viewChat.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(viewChat.fulfilled, (state, { payload }) => {
                state.chats = state.chats.map(chat => chat._id === payload._id ? { ...chat, viewed: true } : chat);
                state.status = 'success';
            })
            .addCase(viewChat.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
})

export default chatSlice.reducer

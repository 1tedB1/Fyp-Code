import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllArticles = createAsyncThunk('article/getAllArticles', async () => {
    // console.log(1);

    try {
        const response = await axios.get('http://localhost:4000/api/v1/getAllArticles')
        // console.log(1);
        // console.log(response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
        console.log(error)
    }
})

export const createArticle = createAsyncThunk('article/createArticle', async (article) => {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/createArticle', article)
        return response.data.data
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
})

export const viewArticle = createAsyncThunk('article/viewArticle', async (article) => {
    // console.log("article ", article);
    try {
        const response = await axios.post('http://localhost:4000/api/v1/viewArticle', article)
        return response.data.message
    } catch (error) {
        throw error
    }
})

export const likeArticle = createAsyncThunk('article/likeArticle', async (article) => {
    // console.log("article ", article);
    try {
        const response = await axios.post('http://localhost:4000/api/v1/likeArticle', article)
        return response.data.message
    } catch (error) {
        throw error
    }
})

export const disLikeArticle = createAsyncThunk('article/disLikeArticle', async (article) => {
    // console.log("article ", article);
    try {
        const response = await axios.post('http://localhost:4000/api/v1/disLikeArticle', article)
        console.log(response.data);
        return response.data.message
    } catch (error) {
        throw error
    }
})
export const deleteContent = createAsyncThunk('article/deleteContent', async (articleId) => {
    try {
        console.log(articleId);
        const response = await axios.post('http://localhost:4000/api/v1/removeArticle', { articleId })
        return response.data.message

    } catch (error) {
        console.log(error);
        
        throw error
    }

})

export const updateArticle = createAsyncThunk('article/updateArticle', async (article) => {
    try {
        const response = await axios.put('http://localhost:4000/api/v1/updateArticle', article)
        return response.data.data
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
})

const contentSlice = createSlice({
    name: 'article',
    initialState: {
        articles: [],
        status: 'idle',
        error: null,
        selectedArticle: null,
        changeInProgress: false
    },
    reducers: {
        articleAdded: (state, action) => {
            state.articles.push(action.payload)
        },
        articleUpdated: (state, action) => {
            const { id, title, content } = action.payload
            const existingArticle = state.articles.find(article => article.id === id)
            if (existingArticle) {
                existingArticle.title = title
                existingArticle.content = content
            }
        },
        
        articleSelected: (state, action) => {
            state.selectedArticle = action.payload

        },
        removeSelectedArticle: (state, action) =>{
            state.selectedArticle = null;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllArticles.fulfilled, (state, action) => {
                state.articles = [];
                state.status = 'succeeded'
                const articles = action.payload.data;
                articles.forEach(element => {
                    if (!state.articles.find(article => article._id === element._id)) {
                        state.articles.push(element);
                    }
                });
            })
            .addCase(getAllArticles.rejected, (state) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(createArticle.pending, (state) => {

            })
            .addCase(createArticle.fulfilled, (state, action) => {
                // state.articles.push(action.payload)
            })
            .addCase(createArticle.rejected, (state) => {

            })
            .addCase(viewArticle.pending, (state) => {
                state.changeInProgress = true
            })
            .addCase(viewArticle.fulfilled, (state, action) => {
                state.changeInProgress = false

            })
            .addCase(viewArticle.rejected, (state) => {
                state.changeInProgress = false
            })
            .addCase(likeArticle.pending, (state) => {
                console.log("suded called");

                state.changeInProgress = true
                

            })
            .addCase(likeArticle.fulfilled, (state, action) => {
                console.log("succeded called");
                state.changeInProgress = false

            })
            .addCase(likeArticle.rejected, (state) => {
                console.log("suded done");

                state.changeInProgress = false

            })
            .addCase(disLikeArticle.pending, (state) => {
                state.changeInProgress = true

            })
            .addCase(disLikeArticle.fulfilled, (state, action) => {
                console.log("succeded called");
                state.changeInProgress = false

            })
            .addCase(disLikeArticle.rejected, (state) => {
                state.changeInProgress = false

            })
            .addCase(deleteContent.pending, (state)=>{
                state.status = "deleting"
            })
            .addCase(deleteContent.rejected,(state)=>{
                state.status = "rejected"
            })
            .addCase(deleteContent.fulfilled, (state)=>{
                state.status = "succeeded"
            })
    }

})

export const { articleAdded, articleUpdated, articleSelected } = contentSlice.actions
export default contentSlice.reducer

// console.log(2);
// await getAllArticles()

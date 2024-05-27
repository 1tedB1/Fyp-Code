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


const contentSlice = createSlice({
    name: 'article',
    initialState: {
        articles: [],
        status: 'idle',
        error: null,
        selectedArticle: null
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
        articleDeleted: (state, action) => {
            const { id } = action.payload
            state.articles = state.articles.filter(article => article.id !== id)
        },
        articleSelected: (state, action) => {
            state.selectedArticle = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllArticles.fulfilled, (state, action) => {
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
    }

})

export const { articleAdded, articleUpdated, articleDeleted, articleSelected } = contentSlice.actions
export default contentSlice.reducer

// console.log(2);
// await getAllArticles()

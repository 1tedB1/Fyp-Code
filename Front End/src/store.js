import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import userSlice from "./slices/userSlice";
import contentSlice from "./slices/contentSlice";
import feedbackSlice from "./slices/feedbackSlice";
import tagSlice from "./slices/tagSlice"
import competitionSlice from "./slices/competitionSlice";




// export const { login } = userSlice.actions

const store = configureStore({
    reducer: {
        user: userSlice,
        content: contentSlice,
        feedback: feedbackSlice,
        tag:tagSlice,
        competition: competitionSlice
    }
})

// console.log(await store.dispatch(fetchUser()));
// const ans = await store.dispatch(fetchUser())
// console.log(ans);
// store.dispatch(fetchUser())

export default store





























// import { useSelector } from "react-redux"
// const counterSlice = createSlice({
//     name: "counter",
//     initialState: {
//         value: 0
//     },

//     reducers: {
//         incremented: state => {
//             state.value += 1
//             console.log(state.value);
//         },
//         decremented: state => {
//             state.value -= 1
//             console.log(state.value);
//         },
//         doubled: state => {
//             state.value *= 2
//             console.log(state.value);
//         }
//     }


// })

// const userSlice = createSlice({
//     name: "user",
//     initialState: [{
//         name: "ashir"
//     },
//     {
//         name: "ali"
//     }
// ],

//     reducers: {
//         increment: state => {
//             state.value += 1
//             console.log(state.value);
//         },
//         decrement: state => {
//             state.value -= 1
//             console.log(state.value);
//         },

//     }


// })


// export const { incremented, decremented, doubled } = counterSlice.actions
// export const { increment, decrement } = userSlice.actions
// const store = configureStore({
//     reducer: {
//         counter: counterSlice.reducer,
//         user: userSlice.reducer
//     }
// })

// const state = store.getState()
// // console.log(store.reducer);
// // store.dispatch(state)
// console.log(state.user);

// // useSelector(state => state.counter.value)
// console.log('hi');


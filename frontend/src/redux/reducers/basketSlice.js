import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getBasketThunk = createAsyncThunk("/basket/get", async () => {
    const res = await axios.get("http://localhost:5000/basket");
    return res.data
})

export const postBasketThunk = createAsyncThunk("/basket/post", async (data) => {
    await axios.post("http://localhost:5000/basket", data);
    return data
})

export const deleteBasketThunk = createAsyncThunk("/basket/delete", async (id) => {
    await axios.delete(`http://localhost:5000/basket/${id}`);
    return id
})

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basket: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder

            .addCase(getBasketThunk.fulfilled, (state, action) => {
                state.basket = action.payload;
            })

            .addCase(postBasketThunk.fulfilled, (state, action) => {
                state.basket.push(action.payload);
            })

            .addCase(deleteBasketThunk.fulfilled, (state, action) => {
                state.basket = state.basket.filter(item => item._id !== action.payload);
            })
    }
})

export default basketSlice.reducer;
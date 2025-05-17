import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsThunk = createAsyncThunk("/product/get", async () => {
    const res = await axios.get("http://localhost:5000/pro");
    return res.data
})

export const postProductsThunk = createAsyncThunk("/product/post", async (data) => {
    await axios.post("http://localhost:5000/pro", data);
    return res.data
})

export const deleteProductsThunk = createAsyncThunk("/product/delete", async (id) => {
    await axios.delete(`http://localhost:5000/pro/${id}`);
    return id
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder

            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(postProductsThunk.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })

            .addCase(deleteProductsThunk.fulfilled, (state, action) => {
                state.products = state.products.filter(item => item._id !== action.payload);
            })
    }
})

export default productSlice.reducer;
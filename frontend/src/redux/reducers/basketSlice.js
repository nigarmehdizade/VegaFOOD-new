import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBasketThunk = createAsyncThunk("/basket/get", async () => {
    const res = await axios.get("http://localhost:5000/basket");
    return res.data;
});
export const postBasketThunk = (product) => async (dispatch, getState) => {
    try {
        const basket = getState().basket.basket;
        const existingItem = basket.find(item => item.name === product.name);

        if (existingItem) {

            const updatedCount = existingItem.count + 1;
            await axios.patch(`http://localhost:5000/basket/${existingItem._id}`, { count: updatedCount });
        } else {

            await axios.post('http://localhost:5000/basket', { ...product, count: 1 });
        }

        dispatch(getBasketThunk());
    } catch (err) {
        console.error(err);
    }
};

export const updateBasketCountThunk = createAsyncThunk(
    "basket/updateCount",
    async ({ id, count }) => {
        const res = await axios.patch(`http://localhost:5000/basket/${id}`, { count });
        return res.data;
    }
);

export const deleteBasketThunk = createAsyncThunk("/basket/delete", async (id) => {
    await axios.delete(`http://localhost:5000/basket/${id}`);
    return id;
});


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
            .addCase(deleteBasketThunk.fulfilled, (state, action) => {
                state.basket = state.basket.filter(item => item._id !== action.payload);
            })
            .addCase(updateBasketCountThunk.fulfilled, (state, action) => {
                const updated = action.payload;
                state.basket = state.basket.map(item =>
                    item._id === updated._id ? updated : item
                );
            });
    }
});

export default basketSlice.reducer;

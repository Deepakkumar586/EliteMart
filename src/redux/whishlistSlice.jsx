import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    whishlists: [],
};

const whishlistSlice = createSlice({
    name: "whishlist",
    initialState,
    reducers: {
        addToWhishlist(state, action) {
            const newItem = action.payload;


            const exists = state.whishlists.some(item => item.id === newItem.id);
            if (exists) return;

            state.whishlists.push({
                id: newItem.id,
                title: newItem.title,
                price: newItem.price,
                totalPrice: newItem.price,
                image: newItem.image,
            });
        },

        removeWhishlist(state, action) {
            const id = action.payload;
            state.whishlists = state.whishlists.filter(item => item.id !== id);
        }
    }
});

export const { addToWhishlist, removeWhishlist } = whishlistSlice.actions;
export default whishlistSlice.reducer;

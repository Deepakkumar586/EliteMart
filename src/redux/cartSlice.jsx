import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [],
    totalQuantity: 0,
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.carts.find((item) => item.id === newItem.id);

            if (!existingItem) {
                state.carts.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    image: newItem.thumbnail,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }

            state.totalAmount += newItem.price;
            state.totalQuantity++;

        },
        removeToCart(state, action) {
            const id = action.payload;
            const existingItem = state.carts.find((item) => item.id === id);
            if (existingItem) {
                state.carts = state.carts.filter((item) => item.id !== id);
                state.totalAmount -= existingItem.totalPrice;
                state.totalQuantity -= existingItem.quantity;

            }
        },
        updateToCart(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.carts.find((item) => item.id === id);
            if (existingItem && quantity > 0) {
                const quantityDifference = quantity - existingItem.quantity;
                existingItem.quantity = quantity;
                existingItem.totalPrice = existingItem.price * quantity;
                state.totalAmount += existingItem.price * quantityDifference;
                state.totalQuantity += quantityDifference;
            }
        },
        removeQuantity(state, action) {

            const id = action.payload;
            const existingItem = state.carts.find((item) => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
                state.totalAmount -= existingItem.price;
                state.totalQuantity--;
            }

        },
        clearCart(state) {
            state.carts = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    },


})

export const { addToCart, removeToCart, updateToCart, removeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
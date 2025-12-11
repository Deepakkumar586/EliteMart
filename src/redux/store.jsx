// import { configureStore } from "@reduxjs/toolkit";

// import productSlice from "./productSlice.jsx";
// import cartSlice from "./cartSlice.jsx";
// const store = configureStore({
//     reducer: {
//         product: productSlice,
//         cart: cartSlice,
//     },
// });
// export default store;


import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice.jsx";
import cartSlice from "./cartSlice.jsx";
import whishlistSlice from './whishlistSlice.jsx'

import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart", "whishlist"], // only cart and whishlist will be persisted


};

const rootReducer = combineReducers({
    product: productSlice,
    cart: cartSlice,
    whishlist: whishlistSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

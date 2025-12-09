import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    searchValue: "",
    filterData: [],

}

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
            state.filterData = state.products.filter((product) => {
                return product.title.toLowerCase().includes(state.searchValue.toLowerCase());
            })
        }



    },


})

export const { setProducts, setSearchValue } = productSlice.actions;
export default productSlice.reducer;
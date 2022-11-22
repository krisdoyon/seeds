import { createSlice } from "@reduxjs/toolkit";
import allProducts from "../assets/seeds.json";

const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem("wishlist")) || [],
  wishlistAmount: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, { payload: id }) => {
      state.wishlistItems.push(
        allProducts.find((product) => product.id === id)
      );
    },
    removeWishlist: (state, { payload: id }) => {
      state.wishlistItems = state.wishlistItems.filter(
        (product) => product.id !== id
      );
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
    updateWishlistAmount: (state) => {
      state.wishlistAmount = state.wishlistItems.length;
    },
  },
});

export const {
  addWishlist,
  removeWishlist,
  clearWishlist,
  updateWishlistAmount,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

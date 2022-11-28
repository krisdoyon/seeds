import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/seeds.json";

const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem("wishlist")) || [],
  wishlistAmount: 0,
  allProducts: JSON.parse(localStorage.getItem("products")) || [...data],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, { payload: id }) => {
      state.wishlistItems.push(
        state.allProducts.find((product) => product.id === id)
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
    updateWishlistItems: (state) => {
      const newProducts = JSON.parse(localStorage.getItem("products"));
      const newWishlistItems = state.wishlistItems.map((item) => {
        return newProducts.find((product) => product.id === item.id);
      });
      state.wishlistItems = newWishlistItems;
    },
  },
});

export const {
  addWishlist,
  removeWishlist,
  clearWishlist,
  updateWishlistAmount,
  updateWishlistItems,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

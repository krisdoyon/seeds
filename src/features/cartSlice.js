import { createSlice } from "@reduxjs/toolkit";
import allProducts from "../assets/seeds.json";

const initialPromo = {
  code: null,
  percent: 0,
  minimum: null,
  amount: 0,
};

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  amount: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  promo: initialPromo,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addItem: (state, { payload: { id, quantity } }) => {
      const product = allProducts.find((item) => item.id === id);
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (!cartItem) {
        state.cartItems.push({ ...product, quantity });
      } else {
        const newQuantity = cartItem.quantity + quantity;
        cartItem.quantity =
          newQuantity > product.inStock ? product.inStock : newQuantity;
      }
    },
    removeItem: (state, { payload: id }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    toggleAmount: (state, { payload: { action, id } }) => {
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (action === "increase" && cartItem.quantity < cartItem.inStock)
        ++cartItem.quantity;
      if (action === "decrease" && cartItem.quantity > 1) --cartItem.quantity;
    },
    calculateTotals: (state) => {
      let subtotal = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        amount += item.quantity;
        subtotal += item.quantity * (item.salePrice || item.price);
      });
      state.subtotal = subtotal;

      if (state.subtotal < state.promo.minimum) {
        state.promo = initialPromo;
      } else {
        state.promo.amount = state.subtotal * state.promo.percent;
      }
      state.tax = (state.subtotal - state.promo.amount) * 0.0635;
      state.shippingCost = state.subtotal < 5000 ? 499 : 0;
      state.total =
        state.subtotal + state.shippingCost + state.tax - state.promo.amount;
      state.amount = amount;
      if (state.amount === 0) state.promo = initialPromo;
    },
    addPromo: (state, { payload }) => {
      if (
        payload &&
        state.promo.code !== payload.code &&
        state.subtotal >= payload.minimum
      ) {
        state.promo = payload;
        state.promo.amount = payload.percent * state.subtotal;
      }
    },
    removePromo: (state) => {
      state.promo = initialPromo;
    },
  },
});

export const {
  clearCart,
  addItem,
  removeItem,
  toggleAmount,
  calculateTotals,
  addPromo,
  removePromo,
} = cartSlice.actions;

export default cartSlice.reducer;

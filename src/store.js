import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productsSlice";
import modalReducer from "./features/modalSlice";
import ordersReducer from "./features/ordersSlice";
import checkoutReducer from "./features/checkoutSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    modal: modalReducer,
    orders: ordersReducer,
    checkout: checkoutReducer,
    auth: authReducer,
  },
});

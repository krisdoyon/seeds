import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productsSlice";
import wishlistReducer from "./features/wishlistSlice";
import modalReducer from "./features/modalSlice";
import ordersReducer from "./features/ordersSlice";
import checkoutReducer from "./features/checkoutSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    modal: modalReducer,
    orders: ordersReducer,
    checkout: checkoutReducer,
  },
});

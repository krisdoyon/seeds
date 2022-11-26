import { createSlice } from "@reduxjs/toolkit";
import { generateOrderNumber } from "../utils/generateOrderNumber";

const initialState = {
  orders: JSON.parse(localStorage.getItem("orders")) || [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (
      state,
      { payload: { products, payment, shipping, billing } }
    ) => {
      let orderNumber = generateOrderNumber();
      let isNumberUnique = !state.orders.some(
        (order) => order.orderNumber === orderNumber
      );
      while (!isNumberUnique) {
        orderNumber = generateOrderNumber();
      }
      const order = {
        orderNumber,
        products,
        date: new Date().getTime(),
        payment,
        billing,
        shipping,
      };
      console.log(order);
      state.orders.push(order);
    },
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;

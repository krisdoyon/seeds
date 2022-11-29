import { createSlice } from "@reduxjs/toolkit";
import { generateOrderNumber } from "../utils/generateOrderNumber";

const initialState = {
  orders: JSON.parse(localStorage.getItem("orders")) || [],
  currentOrder: "",
  error: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (
      state,
      { payload: { products, payment, shipping, billing, shippingSame } }
    ) => {
      let orderNumber;
      do {
        orderNumber = generateOrderNumber();
        // eslint-disable-next-line no-loop-func
      } while (state.orders.some((order) => order.orderNumber === orderNumber));
      const order = {
        orderNumber,
        date: new Date().getTime(),
        displayDate: new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }).format(new Date().getTime()),
        amount: products.length,
        products,
        billing,
        shipping,
        payment,
        shippingSame,
      };
      state.orders.unshift(order);
      state.currentOrder = order;
    },
    loadSingleOrder: (state, { payload: orderNumber }) => {
      state.error = false;
      const order = state.orders.find(
        (order) => order.orderNumber === orderNumber
      );
      if (!order) {
        state.error = true;
        return;
      }
      state.currentOrder = order;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    loadTestOrders: (state, { payload }) => {
      state.orders = payload;
    },
  },
});

export const { addOrder, loadSingleOrder, clearOrders, loadTestOrders } =
  ordersSlice.actions;

export default ordersSlice.reducer;

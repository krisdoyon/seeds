import { createSlice } from "@reduxjs/toolkit";
import { generateOrderNumber } from "../utils/generateOrderNumber";

const initialState = {
  orders: JSON.parse(localStorage.getItem("orders")) || [],
  // currentOrder: "",
  get currentOrder() {
    return this.orders[0];
  },
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
        products,
        billing,
        shipping,
        payment,
        shippingSame,
      };
      console.log(order);
      state.orders.push(order);
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
  },
});

export const { addOrder, loadSingleOrder } = ordersSlice.actions;

export default ordersSlice.reducer;

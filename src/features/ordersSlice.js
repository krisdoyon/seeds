import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateOrderNumber } from "../utils/generateOrderNumber";
import axios from "axios";
import { API_URL } from "../assets/config";
import { sendProductUpdates } from "./productsSlice";
import { clearCart } from "./cartSlice";

export const placeOrder = createAsyncThunk(
  "ordersSlice/placeOrder",
  async (order, thunkAPI) => {
    try {
      const {
        auth: { userId, token },
      } = thunkAPI.getState();
      const { data: products } = await axios(`${API_URL}/products.json`);
      const quantityUpdates = order.products.map((product) => {
        const { databaseId, quantity } = product;
        return {
          databaseId,
          newData: { inStock: products[databaseId].inStock - quantity },
        };
      });
      if (quantityUpdates.some((update) => update.newData.inStock < 0)) {
        throw new Error(`Not enough in stock, please try again`);
      }
      const {
        data: { name: databaseId },
      } = await axios.post(
        `${API_URL}/users/${userId}/orders.json?auth=${token}`,
        order
      );
      await thunkAPI.dispatch(sendProductUpdates(quantityUpdates));
      await thunkAPI.dispatch(clearCart());
      return { databaseId, ...order };
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const returnOrder = createAsyncThunk(
  "ordersSlice/returnOrder",
  async (databaseId, thunkAPI) => {
    try {
      const {
        auth: { userId, token },
        orders: { orders },
      } = thunkAPI.getState();
      const { products: orderProducts } = orders.find(
        (order) => order.databaseId === databaseId
      );
      await axios.delete(
        `${API_URL}/users/${userId}/orders/${databaseId}.json?auth=${token}`
      );
      const { data: products } = await axios(`${API_URL}/products.json`);
      const quantityUpdates = orderProducts.map((product) => {
        const { databaseId, quantity } = product;
        return {
          databaseId,
          newData: { inStock: products[databaseId].inStock + quantity },
        };
      });
      await thunkAPI.dispatch(sendProductUpdates(quantityUpdates));
      return databaseId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "ordersSlice/getOrders",
  async (_, thunkAPI) => {
    try {
      const {
        auth: { userId, token },
      } = thunkAPI.getState();
      const { data: orders } = await axios(
        `${API_URL}/users/${userId}/orders.json?auth=${token}`
      );
      const loadedOrders = [];
      for (const key in orders) {
        loadedOrders.push({ databaseId: key, ...orders[key] });
      }
      return loadedOrders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  orders: JSON.parse(localStorage.getItem("orders")) || [],
  currentOrder: "",
  error: null,
  isLoading: false,
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
  },
  extraReducers: (builder) => {
    // placeOrder
    builder.addCase(placeOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(placeOrder.fulfilled, (state, { payload: order }) => {
      state.isLoading = false;
      state.orders.push(order);
      state.currentOrder = order;
    });
    builder.addCase(placeOrder.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      console.log(payload);
    });

    // fetchOrders
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, { payload: orders }) => {
      state.isLoading = false;
      state.orders = orders;
    });
    builder.addCase(fetchOrders.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    // returnOrder
    builder.addCase(returnOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(returnOrder.fulfilled, (state, { payload: databaseId }) => {
      state.isLoading = false;
      state.orders = state.orders.filter(
        (order) => order.databaseId !== databaseId
      );
    });
    builder.addCase(returnOrder.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { addOrder, loadSingleOrder, clearOrders, loadTestOrders } =
  ordersSlice.actions;

export default ordersSlice.reducer;

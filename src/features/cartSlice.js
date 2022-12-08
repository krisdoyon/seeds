import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../assets/config";
import axios from "axios";
import { updateAllProducts } from "./productsSlice";
import { openModal } from "./modalSlice";

const initialPromo = {
  code: null,
  percent: 0,
  minimum: null,
  amount: 0,
};

const initialState = {
  cartItems: [],
  cartId: localStorage.getItem("cartId") || null,
  amount: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  promo: JSON.parse(sessionStorage.getItem("promo")) || initialPromo,
  isLoading: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk(
  "cartSlice/fetchCartItems",
  async (cartId, thunkAPI) => {
    try {
      const { data: cart } = await axios(`${API_URL}/carts/${cartId}.json`);
      const { data: products } = await axios(`${API_URL}/products.json`);
      const cartItems = [];
      for (const key in cart) {
        cartItems.push({
          databaseId: key,
          ...products[key],
          quantity: cart[key].quantity,
        });
      }
      thunkAPI.dispatch(updateAllProducts(products));
      return cartItems;
    } catch (error) {
      thunkAPI.dispatch(
        openModal({
          type: "error",
          message: "Couldn't get your cart items from the database",
          error: error.message,
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cartSlice/addCartItem",
  async ({ databaseId, quantity }, thunkAPI) => {
    try {
      let cartId = localStorage.getItem("cartId") || null;
      const { data: products } = await axios(`${API_URL}/products.json`);
      const inStock = products[databaseId].inStock;
      if (cartId) {
        const { data } = await axios(
          `${API_URL}/carts/${cartId}/${databaseId}.json`
        );
        const currentQuantity = data?.quantity || 0;
        quantity =
          inStock - currentQuantity < quantity
            ? inStock
            : currentQuantity + quantity;
        await axios.patch(`${API_URL}/carts/${cartId}.json`, {
          [databaseId]: { quantity },
        });
      } else {
        const response = await axios.post(`${API_URL}/carts.json`, {
          [databaseId]: { quantity },
        });
        cartId = response.data.name;
      }
      thunkAPI.dispatch(updateAllProducts(products));
      return {
        cartId,
        product: { databaseId, quantity, ...products[databaseId] },
      };
    } catch (error) {
      thunkAPI.dispatch(
        openModal({
          type: "error",
          message: "Couldn't add item to your cart",
          error: error.message,
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendQuantityUpdate = createAsyncThunk(
  "cartSlice/sendQuantityUpdate",
  async ({ databaseId }, thunkAPI) => {
    try {
      const { cart } = thunkAPI.getState();
      let newQuantity = cart.cartItems.find(
        (item) => item.databaseId === databaseId
      ).quantity;
      const { data: products } = await axios(`${API_URL}/products.json`);
      const inStock = products[databaseId].inStock;
      newQuantity = newQuantity > inStock ? inStock : newQuantity;
      await axios.patch(`${API_URL}/carts/${cart.cartId}.json`, {
        [databaseId]: { quantity: newQuantity },
      });
      thunkAPI.dispatch(updateAllProducts(products));
    } catch (error) {
      thunkAPI.dispatch(
        openModal({
          type: "error",
          message: "Couldn't send quantity update to the database",
          error: error.message,
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cartSlice/removeCartItem",
  async (cartItemId, thunkAPI) => {
    try {
      const {
        cart: { cartId },
      } = thunkAPI.getState();
      await axios.delete(`${API_URL}/carts/${cartId}/${cartItemId}.json`);
      return cartItemId;
    } catch (error) {
      thunkAPI.dispatch(
        openModal({
          type: "error",
          message: "Couldn't remove item from your cart",
          error: error.message,
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cartSlice/clearCart",
  async (_, thunkAPI) => {
    try {
      const {
        cart: { cartId },
      } = thunkAPI.getState();
      await axios.delete(`${API_URL}/carts/${cartId}.json`);
      localStorage.removeItem("cartId");
    } catch (error) {
      thunkAPI.dispatch(
        openModal({
          type: "error",
          message: "Couldn't clear your cart",
          error: error.message,
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

      state.promo.amount = state.subtotal * state.promo.percent;
      state.tax = (state.subtotal - state.promo.amount) * 0.0635;
      state.shippingCost =
        state.subtotal > 0 && state.subtotal < 5000 ? 499 : 0;
      state.total =
        state.subtotal + state.shippingCost + state.tax - state.promo.amount;
      state.amount = amount;
    },
    addPromo: (state, { payload }) => {
      if (
        payload &&
        state.promo.code !== payload.code &&
        state.subtotal >= payload.minimum
      ) {
        state.promo = payload;
        sessionStorage.setItem("promo", JSON.stringify(payload));
        state.promo.amount = payload.percent * state.subtotal;
      }
    },
    removePromo: (state) => {
      state.promo = initialPromo;
      sessionStorage.removeItem("promo");
    },
  },
  extraReducers: (builder) => {
    // addCartItem
    builder.addCase(addCartItem.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      addCartItem.fulfilled,
      (state, { payload: { cartId, product } }) => {
        state.isLoading = false;
        localStorage.setItem("cartId", cartId);
        state.cartId = cartId;
        let cartItem = state.cartItems.find((item) => item.id === product.id);
        if (!cartItem) {
          state.cartItems.push(product);
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== product.id
          );
          state.cartItems.push(product);
        }
      }
    );
    builder.addCase(addCartItem.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    // sendQuantityUpdate
    builder.addCase(sendQuantityUpdate.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendQuantityUpdate.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(sendQuantityUpdate.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    // fetchCartItems
    builder.addCase(fetchCartItems.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, { payload }) => {
      state.cartItems = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCartItems.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    // removeCartItem
    builder.addCase(removeCartItem.pending, (state, { payload }) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeCartItem.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.cartItems = state.cartItems.filter(
        (item) => item.databaseId !== payload
      );
    });
    builder.addCase(removeCartItem.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    // clearCart
    builder.addCase(clearCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
    builder.addCase(clearCart.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { toggleAmount, calculateTotals, addPromo, removePromo } =
  cartSlice.actions;

export default cartSlice.reducer;

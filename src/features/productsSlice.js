import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../assets/config";
import axios from "axios";
import { openModal } from "./modalSlice";

const initialFilters = {
  new: false,
  onSale: false,
  inStock: false,
  search: "",
};

export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios(`${API_URL}/products.json`);
      const data = response.data;
      const newProducts = [];
      for (const key in data) {
        newProducts.push({ databaseId: key, ...data[key] });
      }
      return newProducts;
    } catch (error) {
      thunkAPI.dispatch(
        openModal({
          type: "error",
          message: "Couldn't load products",
          error: error.message,
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendProductUpdates = createAsyncThunk(
  "productsSlice/updateProduct",
  // Expects an array of products where each product is an object of the form ex: {databaseId, newData:{inStock: 3}}
  async (products, thunkAPI) => {
    try {
      for (const product of products) {
        await axios.patch(
          `${API_URL}/products/${product.databaseId}.json`,
          product.newData
        );
      }
      await thunkAPI.dispatch(fetchProducts());
      thunkAPI.dispatch(updateWishlist());
    } catch (error) {
      thunkAPI.dispatch(
        openModal({
          type: "error",
          message: "Couldn't send product updates",
          error: error.message,
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allProducts: null,
  currentProducts: null,
  allCategories: null,
  newProducts: null,
  filters: initialFilters,
  currentProduct: {},
  notFound: false,
  sort: "title-descending",
  wishlist: {
    items: JSON.parse(localStorage.getItem("wishlist")) || [],
    get amount() {
      return this.items.length;
    },
  },
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, { payload: category }) => {
      state.notFound = false;
      if (category && !state.allCategories.find((cat) => cat === category)) {
        state.notFound = true;
      }
      if (!category) category = "all";
      let newProducts =
        category === "all"
          ? state.allProducts
          : state.allProducts.filter(
              (product) => product.category === category
            );
      if (state.filters.new) {
        newProducts = newProducts.filter((product) => product.details.isNew);
      }
      if (state.filters.onSale) {
        newProducts = newProducts.filter((product) => product.salePrice);
      }
      if (state.filters.inStock) {
        newProducts = newProducts.filter((product) => product.inStock !== 0);
      }
      if (state.filters.search) {
        newProducts = newProducts.filter(
          (product) =>
            product.title
              .toLowerCase()
              .includes(state.filters.search.toLowerCase()) ||
            product.category
              .toLowerCase()
              .includes(state.filters.search.toLowerCase())
        );
      }
      if (state.sort === "title-descending")
        state.currentProducts = [...newProducts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      if (state.sort === "title-ascending") {
        state.currentProducts = [...newProducts].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }
      if (state.sort === "price-ascending") {
        state.currentProducts = [...newProducts].sort(
          (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
        );
      }
      if (state.sort === "price-descending") {
        state.currentProducts = [...newProducts].sort(
          (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
        );
      }
    },
    updateFilters: (state, { payload: { filter, value } }) => {
      state.filters[`${filter}`] = value;
    },
    updateSort: (state, { payload: sort }) => {
      state.sort = sort;
    },
    clearFilters: (state) => {
      state.filters = initialFilters;
    },
    loadSingleProduct: (state, { payload: id }) => {
      state.notFound = false;
      const product = state.allProducts.find((product) => product.id === id);
      if (!product) {
        state.notFound = true;
        return;
      }
      state.currentProduct = product;
    },
    updateAllProducts: (state, { payload: APIproducts }) => {
      const newProducts = [];
      for (const key in APIproducts) {
        newProducts.push({ databaseId: key, ...APIproducts[key] });
      }
      state.allProducts = newProducts;
    },

    // WISHLIST
    addWishlist: (state, { payload: id }) => {
      state.wishlist.items.push(
        state.allProducts.find((product) => product.id === id)
      );
      state.wishlist.amount = state.wishlist.items.length;
    },
    removeWishlist: (state, { payload: id }) => {
      state.wishlist.items = state.wishlist.items.filter(
        (product) => product.id !== id
      );
      state.wishlist.amount = state.wishlist.items.length;
    },
    clearWishlist: (state) => {
      state.wishlist.items = [];
      state.wishlist.amount = 0;
    },
    updateWishlist: (state) => {
      const newWishlistItems = state.wishlist.items.map((item) => {
        return {
          ...state.allProducts.find((product) => product.id === item.id),
        };
      });
      state.wishlist.items = newWishlistItems;
    },
  },
  extraReducers: (builder) => {
    // fetchProducts
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.allProducts = payload;
      state.newProducts = payload.filter((product) => product.details.isNew);
      state.allCategories = [
        ...new Set(payload.map((product) => product.category)),
      ].sort((a, b) => a.localeCompare(b));
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    // sendProductUpdates
    builder.addCase(sendProductUpdates.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendProductUpdates.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(sendProductUpdates.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const {
  loadProducts,
  loadSingleProduct,
  updateFilters,
  clearFilters,
  updateSort,
  updateProducts,
  resetProducts,
  addWishlist,
  removeWishlist,
  clearWishlist,
  updateWishlist,
  updateAllProducts,
} = productsSlice.actions;

export default productsSlice.reducer;

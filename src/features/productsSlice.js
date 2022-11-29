import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/seeds.json";

const initialFilters = {
  new: false,
  onSale: false,
  inStock: false,
  search: "",
};

const initialState = {
  allProducts: JSON.parse(localStorage.getItem("products")) || [...data],
  get currentProducts() {
    return this.allProducts;
  },
  get newProducts() {
    return this.allProducts.filter((product) => product.details.isNew);
  },
  allCategories: [...new Set(data.map((product) => product.category))].sort(
    (a, b) => a.localeCompare(b)
  ),
  filters: initialFilters,
  currentProduct: {},
  error: false,
  sort: "title-descending",
  wishlist: {
    items: JSON.parse(localStorage.getItem("wishlist")) || [],
    get amount() {
      return this.items.length;
    },
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, { payload: category }) => {
      state.error = false;
      if (category && !state.allCategories.find((cat) => cat === category)) {
        state.error = true;
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
      state.error = false;
      const product = state.allProducts.find((product) => product.id === id);
      if (!product) {
        state.error = true;
        return;
      }
      state.currentProduct = product;
    },
    updateProducts: (state, { payload: products }) => {
      products.forEach((product) => {
        const toUpdate = state.allProducts.find(
          (item) => item.id === product.id
        );
        toUpdate.inStock = toUpdate.inStock - product.quantity;
      });
    },
    resetProducts: (state) => {
      state.allProducts = [...data];
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
} = productsSlice.actions;

export default productsSlice.reducer;

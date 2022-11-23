import { createSlice } from "@reduxjs/toolkit";
import allProducts from "../assets/seeds.json";

const allCategories = [
  ...new Set(allProducts.map((product) => product.category)),
].sort((a, b) => a.localeCompare(b));

const initialFilters = {
  new: false,
  onSale: false,
  search: "",
};

const initialState = {
  products: [...allProducts],
  allCategories,
  filters: initialFilters,
  currentProduct: {},
  error: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, { payload: category }) => {
      state.error = false;
      if (category && !allCategories.find((cat) => cat === category)) {
        state.error = true;
      }
      if (!category) category = "all";
      let newProducts =
        category === "all"
          ? initialState.products
          : allProducts.filter((product) => product.category === category);
      if (state.filters.new) {
        newProducts = newProducts.filter((product) => product.details.isNew);
      }
      if (state.filters.onSale) {
        newProducts = newProducts.filter((product) => product.salePrice);
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

      state.products = [...newProducts].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    },
    updateFilters: (state, { payload: { filter, value } }) => {
      state.filters[`${filter}`] = value;
    },
    clearFilters: (state) => {
      state.filters = initialFilters;
    },
    loadSingleProduct: (state, { payload: id }) => {
      state.error = false;
      const product = allProducts.find((product) => product.id === id);
      if (!product) {
        state.error = true;
        return;
      }
      state.currentProduct = product;
    },
  },
});

export const { loadProducts, loadSingleProduct, updateFilters, clearFilters } =
  productsSlice.actions;

export default productsSlice.reducer;

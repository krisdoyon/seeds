import { createSlice } from "@reduxjs/toolkit";
import allProducts from "../data/seeds.json";

const allCategories = [
  ...new Set(allProducts.map((product) => product.category)),
].sort((a, b) => a.localeCompare(b));

const initialFilters = {
  new: false,
  onSale: false,
};

const initialState = {
  products: [...allProducts],
  allCategories,
  filters: initialFilters,
  currentProduct: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, { payload: category }) => {
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
      state.currentProduct = allProducts.find((product) => product.id === id);
    },
  },
});

export const { loadProducts, loadSingleProduct, updateFilters, clearFilters } =
  productsSlice.actions;

export default productsSlice.reducer;

import { createSlice, current } from "@reduxjs/toolkit";
import { formatCheckoutInput } from "../utils/formatCheckoutInput";
import { validateInput } from "../utils/validateInput";

const initialState = {
  contact: {
    email: { value: "", touched: false, hasError: true, error: "" },
    phone: { value: "", touched: false, hasError: true, error: "" },
  },
  billing: {
    billFirst: { value: "", touched: false, hasError: true, error: "" },
    billLast: { value: "", touched: false, hasError: true, error: "" },
    billAddress1: { value: "", touched: false, hasError: true, error: "" },
    billAddress2: { value: "", touched: false, hasError: false, error: "" },
    billCity: { value: "", touched: false, hasError: true, error: "" },
    billState: { value: "", touched: false, hasError: true, error: "" },
    billZip: { value: "", touched: false, hasError: true, error: "" },
  },
  shipping: {
    shipFirst: { value: "", touched: false, hasError: true, error: "" },
    shipLast: { value: "", touched: false, hasError: true, error: "" },
    shipAddress1: { value: "", touched: false, hasError: true, error: "" },
    shipAddress2: { value: "", touched: false, hasError: false, error: "" },
    shipCity: { value: "", touched: false, hasError: true, error: "" },
    shipState: { value: "", touched: false, hasError: true, error: "" },
    shipZip: { value: "", touched: false, hasError: true, error: "" },
  },
  payment: {
    payName: { value: "", touched: false, hasError: true, error: "" },
    payCardNum: { value: "", touched: false, hasError: true, error: "" },
    payExpMonth: { value: "", touched: false, hasError: true, error: "" },
    payExpYear: { value: "", touched: false, hasError: true, error: "" },
    payCardCode: { value: "", touched: false, hasError: true, error: "" },
  },
  shippingSame: true,
  isFormValid: false,
};

const testInfo = {
  contact: {
    email: {
      value: "johnsmith@gmail.com",
      touched: true,
      hasError: false,
      error: "",
    },
    phone: { value: "8609492323", touched: true, hasError: false, error: "" },
  },
  billing: {
    billFirst: { value: "John", touched: true, hasError: false, error: "" },
    billLast: { value: "Smith", touched: true, hasError: false, error: "" },
    billAddress1: {
      value: "25 Redwood St.",
      touched: true,
      hasError: false,
      error: "",
    },
    billAddress2: { value: "", touched: true, hasError: false, error: "" },
    billCity: {
      value: "Portland",
      touched: true,
      hasError: false,
      error: "",
    },
    billState: { value: "ME", touched: true, hasError: false, error: "" },
    billZip: { value: "04101", touched: true, hasError: false, error: "" },
  },
  shipping: {
    shipFirst: { value: "", touched: true, hasError: false, error: "" },
    shipLast: { value: "", touched: true, hasError: false, error: "" },
    shipAddress1: { value: "", touched: true, hasError: false, error: "" },
    shipAddress2: { value: "", touched: true, hasError: false, error: "" },
    shipCity: { value: "", touched: true, hasError: false, error: "" },
    shipState: { value: "", touched: true, hasError: false, error: "" },
    shipZip: { value: "", touched: true, hasError: false, error: "" },
  },
  payment: {
    payName: { value: "John Smith", touched: true, hasError: false, error: "" },
    payCardNum: {
      value: "4496 1600 0032 4588",
      touched: true,
      hasError: false,
      error: "",
    },
    payExpMonth: { value: "01", touched: true, hasError: false, error: "" },
    payExpYear: { value: "2023", touched: true, hasError: false, error: "" },
    payCardCode: { value: "159", touched: true, hasError: false, error: "" },
  },
  shippingSame: true,
  isFormValid: true,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateForm: (state, { payload: { name, value, category, touched } }) => {
      value = formatCheckoutInput(name, value);
      const { hasError, error } = validateInput(name, value);
      state[category][name] = { value, touched, hasError, error };
    },
    validateForm: (state) => {
      let isFormValid = true;
      const categoriesToCheck = [state.contact, state.billing, state.payment];
      if (!state.shippingSame) {
        categoriesToCheck.push(state.shipping);
      }
      categoriesToCheck.forEach((category) => {
        for (const key in category) {
          if (category[key].hasError) {
            isFormValid = false;
          }
        }
      });
      state.isFormValid = isFormValid;
    },
    updateShippingSame: (state) => {
      const newShippingSame = !state.shippingSame;
      if (!newShippingSame) {
        for (const key in state.shipping) {
          if (!state.shipping[key].value) {
            state.shipping[key].touched = false;
          }
        }
      }
      state.shippingSame = newShippingSame;
    },
    resetForm: () => initialState,
    loadTestInfo: () => testInfo,
    loadProfileInfo: (state, { payload }) => {
      ["billing", "contact", "shipping"].forEach((category) => {
        for (const key in state[category]) {
          state[category][key].value = payload[category][key].value;
          if (state[category][key].value !== "") {
            state[category][key].hasError = false;
          }
        }
        state.shippingSame = payload.shippingSame;
      });
    },
  },
});

export const {
  updateForm,
  updateShippingSame,
  validateForm,
  resetForm,
  loadTestInfo,
  loadProfileInfo,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

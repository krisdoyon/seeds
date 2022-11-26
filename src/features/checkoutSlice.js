import { createSlice } from "@reduxjs/toolkit";
import { formatCheckoutInput } from "../utils/formatCheckoutInput";
import { validateCheckoutInput } from "../utils/validateCheckoutInput";

export const initialState = {
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

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateForm: (state, { payload: { id, value, category, touched } }) => {
      value = formatCheckoutInput(id, value);
      const { hasError, error } = validateCheckoutInput(id, value);
      state[category][id] = { value, touched, hasError, error };
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
  },
});

export const { updateForm, updateShippingSame, validateForm } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;

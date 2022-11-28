import { createSlice } from "@reduxjs/toolkit";
import { formatCheckoutInput } from "../utils/formatCheckoutInput";
import { validateCheckoutInput } from "../utils/validateCheckoutInput";

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

// TEMP STATE FOR DEVELOPMENT

// const tempState = {
//   contact: {
//     email: {
//       value: "email@gmail.com",
//       touched: true,
//       hasError: false,
//       error: "",
//     },
//     phone: { value: "2073479192", touched: true, hasError: false, error: "" },
//   },
//   billing: {
//     billFirst: { value: "Kris", touched: true, hasError: false, error: "" },
//     billLast: { value: "Doyon", touched: true, hasError: false, error: "" },
//     billAddress1: {
//       value: "11 Hampden Rd.",
//       touched: true,
//       hasError: false,
//       error: "",
//     },
//     billAddress2: { value: "", touched: true, hasError: false, error: "" },
//     billCity: {
//       value: "Stafford Springs",
//       touched: true,
//       hasError: false,
//       error: "",
//     },
//     billState: { value: "CT", touched: true, hasError: false, error: "" },
//     billZip: { value: "06076", touched: true, hasError: false, error: "" },
//   },
//   shipping: {
//     shipFirst: { value: "", touched: true, hasError: false, error: "" },
//     shipLast: { value: "", touched: true, hasError: false, error: "" },
//     shipAddress1: { value: "", touched: true, hasError: false, error: "" },
//     shipAddress2: { value: "", touched: true, hasError: false, error: "" },
//     shipCity: { value: "", touched: true, hasError: false, error: "" },
//     shipState: { value: "", touched: true, hasError: false, error: "" },
//     shipZip: { value: "", touched: true, hasError: false, error: "" },
//   },
//   payment: {
//     payName: { value: "Kris Doyon", touched: true, hasError: false, error: "" },
//     payCardNum: {
//       value: "4496 1600 0032 4588",
//       touched: true,
//       hasError: false,
//       error: "",
//     },
//     payExpMonth: { value: "01", touched: true, hasError: false, error: "" },
//     payExpYear: { value: "2023", touched: true, hasError: false, error: "" },
//     payCardCode: { value: "159", touched: true, hasError: false, error: "" },
//   },
//   shippingSame: true,
//   isFormValid: true,
// };

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
    resetForm: () => initialState,
  },
});

export const { updateForm, updateShippingSame, validateForm, resetForm } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;

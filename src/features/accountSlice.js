import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { validateInput } from "../utils/validateInput";
import axios from "axios";
import { API_URL } from "../assets/config";

const initialState = {
  contact: {
    email: { value: "" },
    phone: { value: "", touched: false, hasError: true, error: "" },
  },
  billing: {
    billFirst: { value: "", touched: false, hasError: true, error: "" },
    billLast: { value: "", touched: false, hasError: true, error: "" },
    billAddress1: {
      value: "",
      touched: false,
      hasError: false,
      error: "",
    },
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
  shippingSame: true,
  isFormValid: false,
  isLoading: false,
  error: null,
};

export const sendProfileUpdate = createAsyncThunk(
  "accountSlice/sendProfileUpdate",
  async (updates, thunkAPI) => {
    try {
      const {
        auth: { userId, token },
      } = thunkAPI.getState();
      await axios.patch(
        `${API_URL}/users/${userId}/profile.json?auth=${token}`,
        updates
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "accountSlice/fetchProfile",
  async ({ userId, token }, thunkAPI) => {
    if (!userId || !token) {
      const {
        auth: { userId, token },
      } = thunkAPI.getState();
    }
    try {
      const { data } = await axios(
        `${API_URL}/users/${userId}/profile.json?auth=${token}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateForm: (state, { payload: { name, value, category, touched } }) => {
      const { hasError, error } = validateInput(name, value);
      state[category][name] = { value, touched, hasError, error };
    },
    validateForm: (state) => {
      let isFormValid = true;
      const categoriesToCheck = [state.contact, state.billing];
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
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (!payload) return;
      Object.keys(payload).forEach((category) => {
        for (const key in payload[category]) {
          state[category][key].value = payload[category][key];
          state[category][key].hasError = false;
        }
      });
      state.shippingSame = payload?.shippingSame || true;
    });
    builder.addCase(fetchProfile.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      console.log("fetch profile failed");
    });

    builder.addCase(sendProfileUpdate.fulfilled, (state) => {
      state.isFormValid = false;
    });
  },
});

export const { updateForm, updateShippingSame, validateForm, resetForm } =
  accountSlice.actions;

export default accountSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SIGNUP_URL, LOGIN_URL, API_URL } from "../assets/config";
import { fetchProfile } from "./accountSlice";
import axios from "axios";
import { openModal } from "./modalSlice";

export const sendAuthRequest = createAsyncThunk(
  "authSlice/sendAuthRequest",
  async ({ email, password, requestType }, thunkAPI) => {
    let url;
    if (requestType === "signup") url = SIGNUP_URL;
    if (requestType === "login") url = LOGIN_URL;
    try {
      const authResponse = await axios.post(
        url,
        {
          email,
          password,
          returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { idToken, localId } = authResponse.data;
      if (requestType === "signup") {
        const data = {
          contact: { email },
        };
        await axios.put(
          `${API_URL}/users/${localId}/profile.json?auth=${idToken}`,
          data
        );
      }

      if (requestType === "login") {
        await thunkAPI.dispatch(
          fetchProfile({ userId: localId, token: idToken })
        );
      }
      return authResponse.data;
    } catch (error) {
      thunkAPI.dispatch(
        openModal({
          type: "error",
          message: "Couldn't send account authorization request",
          error: error.message,
        })
      );
      return thunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);

const initialState = {
  emailInput: {
    touched: false,
    hasError: false,
    error: "",
  },
  passwordInput: { touched: false, hasError: false, error: "" },
  token: localStorage.getItem("token") || null,
  expirationTime: localStorage.getItem("expirationTime") || null,
  userId: localStorage.getItem("userId") || null,
  isLoggedIn: false,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTouched: (state, { payload: { input, value } }) => {
      state[input].touched = value;
    },
    getTokenData: (state) => {
      const expirationTime = localStorage.getItem("expirationTime");
      const remainingTime = expirationTime - Date.now();
      if (remainingTime <= 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("userId");
      } else {
        state.token = localStorage.getItem("token");
        state.expirationTime = localStorage.getItem("expirationTime");
        state.userId = localStorage.getItem("userId");
        state.isLoggedIn = true;
      }
      state.isLoading = false;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.expirationTime = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendAuthRequest.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendAuthRequest.fulfilled, (state, { payload: data }) => {
      state.token = data.idToken;
      state.isLoggedIn = true;
      state.userId = data.localId;
      localStorage.setItem("token", data.idToken);
      localStorage.setItem(
        "expirationTime",
        Date.now() + data.expiresIn * 1000
      );
      localStorage.setItem("userId", data.localId);
      state.isLoading = false;
    });
    builder.addCase(sendAuthRequest.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      if (payload === "EMAIL_EXISTS") {
        state.emailInput.hasError = true;
        state.emailInput.touched = true;
        state.emailInput.error =
          "This email address associated with an existing account";
      }
      if (payload === "INVALID_EMAIL") {
        state.emailInput.hasError = true;
        state.emailInput.touched = true;
        state.emailInput.error = "Enter a valid email address";
      }
      if (payload.includes("WEAK_PASSWORD")) {
        state.passwordInput.hasError = true;
        state.passwordInput.touched = true;
        state.passwordInput.error = "Password must be at least 6 characters";
      }
      if (payload.includes("INVALID_PASSWORD")) {
        state.passwordInput.hasError = true;
        state.passwordInput.touched = true;
        state.passwordInput.error = "Invalid password";
      }
      if (payload.includes("EMAIL_NOT_FOUND")) {
        state.emailInput.hasError = true;
        state.emailInput.touched = true;
        state.emailInput.error =
          "This email address is not associated with an existing account";
      }
    });
  },
});

export const { logout, getTokenData } = authSlice.actions;

export default authSlice.reducer;

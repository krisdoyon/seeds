import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConfirmModalOpen: false,
  isPromoModalOpen: false,
  isErrorModalOpen: false,
  title: null,
  id: null,
  type: null,
  action: null,
  error: null,
  message: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      { payload: { type, action, page, title, id, error, message } }
    ) => {
      console.log(error);
      console.log(message);
      state.type = type;
      state.action = action || null;
      state.page = page || null;
      state.title = title || null;
      state.id = id || null;
      state.error = error || null;
      state.message = message || null;
      if (type === "confirm") {
        state.isConfirmModalOpen = true;
      }
      if (type === "promo") {
        state.isPromoModalOpen = true;
      }
      if (type === "error") {
        state.isErrorModalOpen = true;
      }
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

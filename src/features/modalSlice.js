import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConfirmModalOpen: false,
  isPromoModalOpen: false,
  isErrorModalOpen: false,
  isSuccessModalOpen: false,
  title: null,
  id: null,
  type: null,
  action: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload: { type, action, page, title, id } }) => {
      state.type = type;
      state.action = action || null;
      state.page = page || null;
      state.title = title || null;
      state.id = id || null;
      if (type === "confirm") {
        state.isConfirmModalOpen = true;
      }
      if (type === "promo") {
        state.isPromoModalOpen = true;
      }
      if (type === "error") {
        state.isErrorModalOpen = true;
      }
      if (type === "success") {
        state.isSuccessModalOpen = true;
      }
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConfirmModalOpen: false,
  isPromoModalOpen: false,
  title: "",
  id: "",
  type: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload: { type, title, id } }) => {
      state.type = type;
      if (type === "cart" || type === "wishlist" || type === "clear") {
        state.isConfirmModalOpen = true;
      }
      if (type === "cart" || type === "wishlist") {
        state.title = title;
        state.id = id;
      }
      if (type === "promo") {
        state.isPromoModalOpen = true;
      }
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

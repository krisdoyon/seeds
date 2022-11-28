import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConfirmModalOpen: false,
  isPromoModalOpen: false,
  title: "",
  id: "",
  type: "",
  action: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload: { type, action, page, title, id } }) => {
      state.type = type;
      state.action = action || "";
      state.page = page || "";
      if (type === "confirm") {
        state.isConfirmModalOpen = true;
      }
      if (type === "promo") {
        state.isPromoModalOpen = true;
      }
      if (action === "remove") {
        state.title = title;
        state.id = id;
      }
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    title: "",
    id: "",
    type: "",
  },
  reducers: {
    openModal: (state, { payload: { type, title, id } }) => {
      state.type = type;
      state.title = title;
      state.id = id;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

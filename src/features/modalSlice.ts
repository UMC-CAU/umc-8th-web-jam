import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isCartClearModalOpen: boolean;
}

const initialState: ModalState = {
  isCartClearModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCartClearModal: (state) => {
      state.isCartClearModalOpen = true;
    },
    closeCartClearModal: (state) => {
      state.isCartClearModalOpen = false;
    },
  },
});

export const { openCartClearModal, closeCartClearModal } = modalSlice.actions;
export default modalSlice.reducer;
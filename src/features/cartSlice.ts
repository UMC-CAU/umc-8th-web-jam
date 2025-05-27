// cart 상태에 대한 로직을 정의하는 Redux slice: increase, decrease 등의 reducer 함수 포함
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItem';

type CartItem = {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
};

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.amount += 1;
    },
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.amount > 0) item.amount -= 1;
      if (item && item.amount < 1)
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    clear: (state) => {
      state.cartItems = [];
    },
  },
});

export const { increase, decrease, clear } = cartSlice.actions;
export default cartSlice.reducer;

// cart 상태에 대한 로직을 정의하는 Redux slice: increase, decrease 등의 reducer 함수 포함
// createSlice()를 통해 장바구니 상태의 형태와 변경 로직 정의
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
  totalAmount: number;
  totalPrice: number;
}

const initialState: CartState = {
  cartItems,
  totalAmount: 0,
  totalPrice: 0,
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
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * Number(item.price);
      });

      state.totalAmount = amount;
      state.totalPrice = total;
    },
  },
});

export const { increase, decrease, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;

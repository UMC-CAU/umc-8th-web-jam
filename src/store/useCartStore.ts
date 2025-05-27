// Zustand는 그 자체가 상태 저장소이자 액션 컨트롤러로 Redux처럼 따로 Slice를 만들 필요가 없다.
// 전역 상태와 조작 함수를 한 파일에서 정의하고 사용할 수 있는 구조
// Redux는 여러 slice를 통합하고 미들웨어를 붙이기 위해 configureStore()를 사용해야 했다.
// 하지만 Zustand는 각 상태 훅이 독립적인 store 역할을 한다.
import { create } from 'zustand';
import cartItemsData from '../constants/cartItem';

// cartSlice.ts에 있던 부분
type CartItem = {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
};

// cartSlice.ts에 있던 부분
type CartStore = {
  cartItems: CartItem[];
  totalAmount: number;
  totalPrice: number;
  isCartClearModalOpen: boolean;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clearCart: () => void;
  openClearCartModal: () => void;
  closeClearCartModal: () => void;
  calculateTotals: () => void;
};

// cartSlice.ts에 있던 부분
export const useCartStore = create<CartStore>((set, get) => ({
  // initial state
  cartItems: cartItemsData,
  totalAmount: 0,
  totalPrice: 0,
  isCartClearModalOpen: false,

  // reducers였던 것들
  increase: (id) =>
    set((state) => {
      const updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      );
      return { cartItems: updatedItems };
    }),

  decrease: (id) =>
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id);
      let updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item,
      );
      if (item && item.amount <= 1) {
        updatedItems = state.cartItems.filter((item) => item.id !== id);
      }
      return { cartItems: updatedItems };
    }),

  remove: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  openClearCartModal: () => set({ isCartClearModalOpen: true }),
  closeClearCartModal: () => set({ isCartClearModalOpen: false }),

  calculateTotals: () => {
    const { cartItems } = get();
    const { totalAmount, totalPrice } = cartItems.reduce(
      (acc, item) => {
        acc.totalAmount += item.amount;
        acc.totalPrice += item.amount * Number(item.price);
        return acc;
      },
      { totalAmount: 0, totalPrice: 0 },
    );
    set({ totalAmount, totalPrice });
  },
}));

// Redux 전역 상태 저장소: 여러 slice들을 하나로 합쳐서 중앙에서 관리
// 이 store는 <Provider store={store}>로 main.tsx에서 앱 전체에 주입됨
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import modalReducer from '../features/modalSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
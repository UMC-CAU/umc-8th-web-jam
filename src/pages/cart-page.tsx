// useSelector()로 Redux 상태(cartItems, totalAmount, totalPrice)를 읽어 UI에 반영
// useDispatch()로 Redux 액션 (increase, remove, clearCart, calculateTotals)을 실행
// 이 컴포넌트는 Redux 상태를 읽고, 쓰는 UI 뷰 계층
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import CartItem from '../components/CartItem';
import CartClearModal from '../components/CartClearModal';
import { calculateTotals } from '../features/cartSlice';
import { openCartClearModal } from '../features/modalSlice';

const CartPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const isCartClearModalOpen = useSelector(
    (state: RootState) => state.modal.isCartClearModalOpen
  );

  // 장바구니 아이템 변경 시 총합 계산
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">🛒 장바구니</h2>
        <div className="flex gap-4 font-bold text-md text-white ">
          <span>총 {totalAmount}개</span>
          <span>총 {totalPrice}원</span>
        </div>
      </div>

      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}

       <button
        onClick={() => dispatch(openCartClearModal())}
        className="m-10 px-5 py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
      >
        전체 삭제
      </button>

      {isCartClearModalOpen && <CartClearModal />}
    </div>
  );
};

export default CartPage;

import CartItem from '../components/CartItem';
import CartClearModal from '../components/CartClearModal';
import { useCartStore } from '../store/useCartStore';
import { useEffect } from 'react';

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    totalPrice,
    isCartClearModalOpen,
    openClearCartModal,
    calculateTotals,
  } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  const handleClear = () => {
    if (cartItems.length === 0) {
      alert('장바구니에 상품이 없습니다.');
      return;
    }
    openClearCartModal();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-4 text-white">
        <h2 className="text-xl font-bold">🛒 장바구니</h2>
        <div className='flex text-md font-bold gap-4'>
            <span>총 {totalAmount}개</span>
            <span>총 {totalPrice}원</span>
        </div>
        

      </div>

      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}

      <button onClick={handleClear} className="m-10 rounded px-5 py-2 border hover:bg-red-500">
        전체 삭제
      </button>

      {isCartClearModalOpen && <CartClearModal />}
    </div>
  );
};

export default CartPage;
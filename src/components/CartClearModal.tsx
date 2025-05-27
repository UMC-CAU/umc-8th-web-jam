import { useCartStore } from '../store/useCartStore';

const CartClearModal = () => {
  const { clearCart, closeClearCartModal } = useCartStore();

  const handleConfirm = () => {
    clearCart();
    closeClearCartModal();
  };

  const handleCancel = () => {
    closeClearCartModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <p className="mb-4 text-lg text-black font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button onClick={handleConfirm} className="px-4 py-2 bg-green-400 rounded hover:bg-green-500 border">네</button>
          <button onClick={handleCancel} className="px-4 py-2 bg-red-400 rounded hover:bg-red-500 text-white rounded">아니오</button>
        </div>
      </div>
    </div>
  );
};

export default CartClearModal;
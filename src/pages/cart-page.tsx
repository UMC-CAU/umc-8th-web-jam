import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import CartItem from '../components/CartItem';
import { useDispatch } from 'react-redux';
import { clear } from '../features/cartSlice'
const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          {...item} // id, title, singer, price, img, amount 모두 props로 전달
        />
      ))}
      <button onClick={() => dispatch(clear())} className="m-10 px-5 py-2 rounded border-3">
        전체 삭제
      </button>
    </div>
  );
};

export default CartPage;

import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          {...item} // id, title, singer, price, img, amount 모두 props로 전달
        />
      ))}
    </div>
  );
};

export default CartPage;
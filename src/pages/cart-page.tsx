import cartItems from '../constants/cartItem';
import CartItem from '../components/CartItem';

const CartPage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      {cartItems.map((item) => (
        <CartItem
          id={item.id}
          title={item.title}
          singer={item.singer}
          price={item.price}
          img={item.img}
          amount={item.amount}
        />
      ))}
    </div>
  );
};

export default CartPage;
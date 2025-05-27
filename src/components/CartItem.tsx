import { useCartStore } from '../store/useCartStore';


type CartItemProps = {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
};

const CartItem = ({ id, title, singer, price, img, amount }: CartItemProps) => {
  const { increase, decrease, } = useCartStore();

  return (
    <div className="flex items-center py-4 border-b text-white">
      <img src={img} alt={title} className="w-16 h-16 object-cover rounded" />
      <div className="ml-4 flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-400">{singer}</div>
        <div className="mt-1 font-bold">₩{Number(price).toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => decrease(id)}
          className="border px-2 py-1"
        >
          -
        </button>
        <span>{amount}</span>
        <button
          onClick={() => increase(id)}
          className="border px-2 py-1"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
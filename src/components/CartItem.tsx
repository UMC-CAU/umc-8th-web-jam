type CartItemProps = {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
};

const CartItem = ({ title, singer, price, img, amount }: CartItemProps) => {
  return (
    <div className="flex items-center py-4 border-b">
      <img src={img} alt={title} className="w-16 h-16 object-cover rounded" />
      <div className="ml-4 flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-600">{singer}</div>
        <div className="mt-1 font-bold">₩{Number(price).toLocaleString()}</div>
      </div>
      <div className="flex items-center">
        <button className="px-2 py-1 border">-</button>
        <span className="px-3">{Number(amount)}</span>
        <button className="px-2 py-1 border">+</button>
      </div>
    </div>
  );
};

export default CartItem;

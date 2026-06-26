import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Cart() {
  const cart = useSelector(
    (state) => state.cart.items
  );
  const {removeFromCart , addToCart, decreaseQuantity } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        
        <h1 className="text-2xl font-semibold mb-4">
          Your cart is empty 🛒
        </h1>

        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet
        </p>

        <Link
          to="/product"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  const totalPrice = cart.reduce((total, item)=>{
    return total + item.price * item.quantity;
  }, 0)

  return (
    <div className="px-4 pt-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border p-4 rounded shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-sm">
                {item.title}
              </h2>

              <p className="font-bold mt-1">
                ₹{item.price}
              </p>

              {/* Quantity controls */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQuantity(index)}
                  className=" cursor-pointer px-2 bg-gray-200"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => addToCart(item)}
                  className="cursor-pointer px-2 bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(index)}
              className="cursor-pointer text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="mt-8 flex justify-between items-center border-t pt-4">
          <h2 className="text-xl font-semibold">
            Total
          </h2>

          <span className="text-xl font-bold">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
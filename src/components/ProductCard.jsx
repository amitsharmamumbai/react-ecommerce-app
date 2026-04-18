export default function ProductCard({ item, onAddToCart }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">

      <img
        src={item.image}
        alt={item.title}
        className="w-full h-40 object-contain mb-3"
      />

      <h2 className="text-sm font-semibold line-clamp-2">
        {item.title}
      </h2>

      <p className="font-bold text-lg mt-2">₹{item.price}</p>

      <button
        onClick={() => onAddToCart(item)}
        className="mt-3 cursor-pointer w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
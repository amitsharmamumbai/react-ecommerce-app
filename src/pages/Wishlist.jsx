import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function Wishlist() {

  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.items
  )

  if(wishlist.length === 0){
     return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        
        <h1 className="text-2xl font-semibold mb-4">
          ❤️ Your wishlist is empty 🛒
        </h1>

        <p className="text-gray-500 mb-6">
          Save products you like to buy them later.
        </p>

        <Link
          to="/product"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Browse Products
        </Link>

      </div>
    );
  }
  return (
     <div className="px-4 pt-8 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
    
          <div className="space-y-4">
            {wishlist.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border p-4 rounded shadow-sm"
              >
                <img
                  src={item.thumbnail}
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
    
                  {/* Wishlist actions */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                      className=" cursor-pointer bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Remove
                    </button>
        
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="cursor-pointer bg-black text-white px-4 py-2 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}
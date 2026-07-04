import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductCard({ item }) {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

    const isWishlisted = wishlist.find(
      (wishlistItem) => wishlistItem.id === item.id
    )

  return (
    <div className="relative border rounded-lg p-4 shadow hover:shadow-lg transition">

      <button
        onClick={() => 
          isWishlisted
           ? dispatch(removeFromWishlist(item.id))
           : dispatch(addToWishlist(item))
          }

        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow cursor-pointer hover:bg-gray-100 transition"
      >
        { isWishlisted 
            ? (<FaHeart className="text-gray-700 text-xl" />)
            : (<FaRegHeart className="text-gray-700 text-xl" />)
        }
        
      </button>

      <Link to={`/product/${item.id}`}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-40 object-contain mb-3"
        />

        <h2 className="text-sm font-semibold line-clamp-2">
          {item.title}
        </h2>

        <p className="font-bold text-lg mt-2">₹{item.price}</p>
      </Link>
    
      <button
        onClick={() => dispatch(addToCart(item))}
        className="mt-3 cursor-pointer w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
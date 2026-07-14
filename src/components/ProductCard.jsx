import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify"

export default function ProductCard({ item }) {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlist.find(
    (wishlistItem) => wishlistItem.id === item.id
  )

  const handleAddToCart = () =>{
    dispatch(addToCart(item));
    toast.success("Product added to cart" , {
      toastId : "add-to-cart",
    });
  }

  const handleWishList = () =>{
    if(isWishlisted){
      dispatch(removeFromWishlist(item.id))
      toast.success("Product removed from wishlist" , {
        toastId: "wishlist-removed",
      });
    } 
    else{
      dispatch(addToWishlist(item));
      toast.success("Product Added to wishlist" , {
        toastId: "wishlist-added",
      });
    }
  }

  return (
    <div className="relative border rounded-lg p-4 shadow hover:shadow-lg transition">

      <button
        onClick={handleWishList}

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
        onClick={handleAddToCart}
        className="mt-3 cursor-pointer w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
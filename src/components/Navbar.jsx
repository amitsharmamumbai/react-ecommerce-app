import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cart = useSelector(
    (state) => state.cart.items
  );

  const wishlist = useSelector(
    (state) => state.wishlist.items
  )

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <nav className="sticky top-0 bg-white shadow z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          MyStore
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/product">Products</Link>
          <Link to="/wishlist" className="relative">
            ❤️ Wishlist
            <span className="ml-1 text-xs bg-black text-white px-2 py-0.5 rounded">
              {wishlist.length}
            </span>
          </Link>
          <Link to="/cart" className="relative">
            Cart
            <span className="ml-1 text-xs bg-black text-white px-2 py-0.5 rounded">
              {totalItems}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
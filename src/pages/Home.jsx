import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(
        res.data.products.slice(0, 8)
      );
    });
  }, []);

  return (
    <div className="px-4 pt-8 max-w-6xl mx-auto">

      {/* Hero Section */}
      <div className="bg-gray-100 p-10 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to MyStore 🚀
        </h1>

        <p className="text-gray-600 mb-6">
          Discover amazing products at unbeatable prices
        </p>

        <Link
          to="/product"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Shop Now
        </Link>
      </div>

      {/* Featured Products */}
      <div>
        <h2 className="text-2xl pt-6 font-bold mb-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/product"
            className="underline text-sm"
          >
            View All Products →
          </Link>
        </div>
      </div>

    </div>
  );
}
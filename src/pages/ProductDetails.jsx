import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <h1 className="p-8 text-red-500">
        Product not found
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        <div className="border rounded-lg p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {product.title}
          </h1>

          <p className="text-gray-500 mt-2 capitalize">
            {product.category}
          </p>

          <p className="text-3xl font-bold mt-4">
            ₹{product.price}
          </p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <p className="text-gray-500">
            Brand: {product.brand}
          </p>

          <p className="mt-2">
            Rating: ⭐ {product.rating}
          </p>

          <p className="mt-2">
            Stock: {product.stock}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
          >
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  );
}
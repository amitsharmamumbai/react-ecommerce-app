import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [cart , setCart] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(()=>{
    getProducts()
    .then((res)=>{
        setProducts(res.data);
        setLoading(false);
    })
    .catch((err)=>{
        console.log(err);
        setError(true);
        setLoading(false);
    })
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <h1 className="p-8 text-red-500">Something went wrong</h1>;
  }

  return (
    <div className="px-4 pt-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
            />
          ))}
        </div>
    </div>
  );
}
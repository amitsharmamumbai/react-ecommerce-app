import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [cart , setCart] = useState([]);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");

  useEffect(()=>{
    getProducts()
    .then((res)=>{
      setProducts(res.data.products);
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

  let filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category === selectedCategory
    );
  }

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category))
  ];

  if (sortOption === "lowToHigh") {
  filteredProducts.sort(
    (a, b) => a.price - b.price
    );
  }

  if (sortOption === "highToLow") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortOption === "rating") {
    filteredProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <div className="px-4 pt-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        <div className="mb-6 grid grid-cols-3 gap-2">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="border p-2 rounded w-full"
          />

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
            className="border p-2 rounded  w-full"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Default</option>
            <option value="lowToHigh">
              Price: Low → High
            </option>
            <option value="highToLow">
              Price: High → Low
            </option>
            <option value="rating">
              Rating: High → Low
            </option>
          </select>

        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAddToCart={(item) =>
                    dispatch(addToCart(item))
                }
            />
          ))}
        </div>
    </div>
  );
}
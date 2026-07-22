import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";
import SkeletonCard from "../components/SkeletonCard";

import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [cart , setCart] = useState([]);
  const dispatch = useDispatch();

  const SKELETON_COUNT = 8;

  const PRODUCTS_PER_PAGE = 8; 

  const [currentPage, setCurrentPage] = useState(1);

  const [totalProducts , setTotalProducts] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");

  useEffect(()=>{

    setLoading(true);

    const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;

    getProducts(PRODUCTS_PER_PAGE , skip)
    .then((res)=>{
      setProducts(res.data.products);
      setTotalProducts(res.data.total);
      setLoading(false);
  })
    .catch((err)=>{
        setError(true);
        setLoading(false);
    })
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const pages = [];

  for(let i = 1 ; i <= totalPages; i++){
    pages.push(i);
  }


  if (loading) {
  return (
    <div className="px-4 pt-8 max-w-6xl mx-auto">

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>

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

  const START_PAGES = 6;
  const SIDE_PAGES = 2;
  const displayPages = [];

  //Beginning case start

  if (currentPage <= 4) {
    for (let i = 1; i <= Math.min(START_PAGES, totalPages); i++) {
      displayPages.push(i);
    }

    if (totalPages > START_PAGES) {
      displayPages.push("...");
      displayPages.push(totalPages);
    }
  }
  // Beginning case end

  // End case start

  else if (currentPage >= totalPages - 3) {
    displayPages.push(1);
    displayPages.push("...");

    for (let i = totalPages - 5; i <= totalPages; i++) {
      displayPages.push(i);
    }
  }
  // End case ends

  // Middle case starts

  else {
    displayPages.push(1);
    displayPages.push("...");

    for (let i = currentPage - SIDE_PAGES; i <= currentPage + SIDE_PAGES; i++) {
      displayPages.push(i);
    }

    displayPages.push("...");
    displayPages.push(totalPages);
  }
  // Middle case ends

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
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex justify-end mt-y">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled = {currentPage === 1}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
          </div>
          <div className="flex items-center my-8">
            {
              displayPages.map((page, index) => {
                if (page === "...") {
                  return (
                    <span key={`ellipsis-${index}`} className="mx-2">
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 cursor-pointer border rounded mx-1 ${
                      page === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {page}
                  </button>
                );
              })
            }
          </div>
          <div className="flex justify-end my-8">
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled = {currentPage === totalPages}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
    </div>
  );
}
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get params from URL
  const searchQuery = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "default";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/search?q=${searchQuery}`
        );
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    if (searchQuery) fetchProducts();
  }, [searchQuery]);

  console.log( products);
  

  // Sort products
  const sortedProducts = products?.results?.sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return 0;
  });

  // Update URL when sort changes
  const handleSortChange = (newSort) => {
    setSearchParams({ q: searchQuery, sort: newSort });
  };

  if (error) return <div>Error: {error}</div>;
  if (!products) return <div>Loading...</div>;

  return (
    <div>
      {/* Sort Filter */}
      <div className="my-5">
        <label>Sort by: </label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="border p-1"
        >
          <option value="default">Default</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="flex flex-wrap gap-4">
        {sortedProducts?.map((product) => (
          <div key={product._id} className="p-3 border rounded">
            <a href={`/products/${product.slug}/${product._id}`}>
              <img 
                src={product.images[0].url} 
                alt={product.name}
                className="w-25"
                width={"100px"}
              />
            </a>
            <p className="font-bold mt-2">{product.name}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
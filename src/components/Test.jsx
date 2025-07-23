import { useState, useEffect } from 'react';
import { FiStar, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Test = () => {
  // State for products and filters
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  
  // URL params
  const searchQuery = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "default";

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    brand: true,
    price: true,
    availability: true
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = searchQuery 
          ? `${import.meta.env.VITE_URL}/search?q=${searchQuery}`
          : `${import.meta.env.VITE_URL}/products`;
        
        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    
    fetchProducts();
  }, [searchQuery]);

  // Sort products
  const sortedProducts = products?.results?.sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return 0;
  });

  // Filter products
  const filteredProducts = sortedProducts?.filter(product => {
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    if (inStockOnly && !product.inStock) return false;
    return true;
  });

  // Get unique categories and brands
  const categories = [...new Set(products?.results?.map(p => p.category) || [])];
  const brands = [...new Set(products?.results?.map(p => p.brand) || [])];

  // Helper functions
  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const handleFilterToggle = (type, value) => {
    const setter = type === 'category' ? setSelectedCategories : setSelectedBrands;
    setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 200]);
    setInStockOnly(false);
  };

  if (error) return <div>Error: {error}</div>;
  if (!products) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 shadow rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center">
              <FiFilter className="mr-2" /> Filters
            </h2>
            <button 
              className="text-blue-600 text-sm hover:underline"
              onClick={resetFilters}
            >
              Clear all
            </button>
          </div>

          {/* Price Filter */}
          <div className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('price')}>
              <h3 className="font-semibold">Price</h3>
              {expandedFilters.price ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedFilters.price && (
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('category')}>
              <h3 className="font-semibold">Category</h3>
              {expandedFilters.category ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedFilters.category && (
              <div className="mt-2 space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleFilterToggle('category', category)}
                      className="mr-2"
                    />
                    <label className="text-sm">
                      {category} ({products.results.filter(p => p.category === category).length})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('brand')}>
              <h3 className="font-semibold">Brand</h3>
              {expandedFilters.brand ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedFilters.brand && (
              <div className="mt-2 space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleFilterToggle('brand', brand)}
                      className="mr-2"
                    />
                    <label className="text-sm">
                      {brand} ({products.results.filter(p => p.brand === brand).length})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Availability Filter */}
          <div className="mb-6">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('availability')}>
              <h3 className="font-semibold">Availability</h3>
              {expandedFilters.availability ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedFilters.availability && (
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(!inStockOnly)}
                    className="mr-2"
                  />
                  <span className="text-sm">In Stock Only</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {searchQuery ? `Search: "${searchQuery}"` : "All Products"}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">
                {filteredProducts?.length || 0} results
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSearchParams({ 
                  q: searchQuery, 
                  sort: e.target.value 
                })}
                className="border p-2 rounded"
              >
                <option value="default">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProducts?.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map(product => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <a href={`/products/${product.slug}/${product._id}`}>
                    <img 
                      src={product.images[0]?.url} 
                      alt={product.name}
                      className="w-full h-48 object-contain mb-4"
                    />
                  </a>
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="font-bold text-lg mb-3">${product.price.toFixed(2)}</div>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded text-sm font-medium transition-colors">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
import { useState, useEffect } from 'react';
import { FiStar, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import axios from 'axios';

const Test = () => {
        const [product, setProduct] = useState()

  // Sample product data
  const allProducts = [
    { id: 1, name: 'Premium Blender', price: 89.99, rating: 4.5, category: 'Appliances', brand: 'KitchenAid', inStock: true },
    { id: 2, name: 'Non-Stick Cookware Set', price: 129.99, rating: 4.2, category: 'Cookware', brand: 'T-fal', inStock: true },
    { id: 3, name: 'Air Fryer', price: 79.99, rating: 4.7, category: 'Appliances', brand: 'Ninja', inStock: false },
    { id: 4, name: 'Chef Knife Set', price: 59.99, rating: 4.3, category: 'Cutlery', brand: 'Cuisinart', inStock: true },
    { id: 5, name: 'Food Processor', price: 109.99, rating: 4.4, category: 'Appliances', brand: 'Cuisinart', inStock: true },
    { id: 6, name: 'Mixing Bowl Set', price: 29.99, rating: 4.1, category: 'Utensils', brand: 'Pyrex', inStock: true },
  ];

  // State for filters
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

  // Get unique categories and brands for filters
  const categories = [...new Set(allProducts.map(product => product.category))];
  const brands = [...new Set(allProducts.map(product => product.brand))];

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter(product => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    
    // Availability filter
    if (inStockOnly && !product.inStock) return false;
    
    return true;
  });


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/products`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        // setError(error.message);
      }
    };

    fetchProduct();
  }, []);


  // Toggle filter sections
  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  // Handle category/brand selection
  const handleFilterToggle = (type, value) => {
    if (type === 'category') {
      setSelectedCategories(prev =>
        prev.includes(value) ? prev.filter(cat => cat !== value) : [...prev, value]
      );
    } else if (type === 'brand') {
      setSelectedBrands(prev =>
        prev.includes(value) ? prev.filter(brand => brand !== value) : [...prev, value]
      );
    }
  };




  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col00000 md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-25 md:w-1/4 bg-white p-4 shadow rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center">
              <FiFilter className="mr-2" /> Filters
            </h2>
            <button 
              className="text-blue-600 text-sm hover:underline"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedBrands([]);
                setPriceRange([0, 200]);
                setInStockOnly(false);
              }}
            >
              Clear all
            </button>
          </div>

          {/* Price Filter */}
          <div className="mb-6 border-b pb-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFilter('price')}
            >
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
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFilter('category')}
            >
              <h3 className="font-semibold">Category</h3>
              {expandedFilters.category ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedFilters.category && (
              <div className="mt-2 space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cat-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleFilterToggle('category', category)}
                      className="mr-2"
                    />
                    <label htmlFor={`cat-${category}`} className="text-sm">
                      {category} ({allProducts.filter(p => p.category === category).length})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="mb-6 border-b pb-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFilter('brand')}
            >
              <h3 className="font-semibold">Brand</h3>
              {expandedFilters.brand ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedFilters.brand && (
              <div className="mt-2 space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleFilterToggle('brand', brand)}
                      className="mr-2"
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm">
                      {brand} ({allProducts.filter(p => p.brand === brand).length})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Availability Filter */}
          <div className="mb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFilter('availability')}
            >
              <h3 className="font-semibold">Availability</h3>
              {expandedFilters.availability ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedFilters.availability && (
              <div className="mt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(!inStockOnly)}
                    className="mr-2"
                  />
                  <label htmlFor="inStock" className="text-sm">
                    In Stock Only
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Kitchen Products</h2>
            <div className="text-sm">
              <span className="font-semibold">{filteredProducts.length}</span> results
            </div>
          </div>

           {filteredProducts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="lg:grid-cols-3 gap-6 flex flex-wrap">

              {product?.results?.map(product => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gray-200 mb-4 rounded flex items-center justify-center">
                    <span className="text-gray-500"></span>


    






      


      </div>

     <div key={product._id} style={{width:'250px'}}>
                  <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                                <a href={`/products/${product.slug}/${product._id}`}>
       <img src={product.images[0]} alt="product" width={"199px"} />
       </a>
         <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      </div>

                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={i < Math.floor(product.rating) ? 'fill-current' : ''} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="font-bold text-lg mb-2">${product.price.toFixed(2)}</div>
                  {!product.inStock && (
                    <div className="text-red-500 text-sm mb-2">Out of Stock</div>
                  )}
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-1 rounded text-sm font-medium transition-colors">
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
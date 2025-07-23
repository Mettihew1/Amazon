import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.length >= 2) {
        setIsLoading(true);
        axios.get(`${import.meta.env.VITE_URL}/search/suggestions?query=${encodeURIComponent(input)}`)
          .then(res => setSuggestions(res.data))
          .catch(console.error)
          .finally(() => setIsLoading(false));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.title);
    navigate(`/products/${suggestion.slug}/${suggestion._id}`);

    setSuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}`);
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />
          <button type="submit">Search</button>
        </div>
        
        {isLoading && <div className="loading-indicator">Loading...</div>}
        
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((item) => (
              <li 
                key={item._id}
                onClick={() => handleSuggestionClick(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
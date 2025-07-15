import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // ✅ Use environment variable for backend URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/?search=${query}`);
      onSearch(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

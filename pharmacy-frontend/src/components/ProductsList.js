import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductsList.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20); 
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/', {
          params: { search: searchQuery } 
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  // Calculate current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleAddToCart = async (product) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/products/${product.id}/`, {
        stock: product.stock - 1
      });
      const updatedProduct = { ...product, stock: product.stock - 1 };
      setProducts(products.map(p => p.id === product.id ? updatedProduct : p));
      dispatch({ type: 'ADD_TO_CART', payload: updatedProduct });
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products-list">
      <div className="search-container">
        <input
          type="text"
          className="input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg className="search__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10.5 0C4.694 0 0 4.694 0 10.5S4.694 21 10.5 21c2.374 0 4.554-.818 6.274-2.174l4.092 4.092 1.5-1.5-4.092-4.092A10.452 10.452 0 0021 10.5C21 4.694 16.306 0 10.5 0zM10.5 19C5.81 19 2 15.19 2 10.5S5.81 2 10.5 2 19 5.81 19 10.5 15.19 19 10.5 19z" />
        </svg>
      </div>
      {currentProducts.length > 0 ? (
        <div className="product-grid">
          {currentProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}

      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProductsList;

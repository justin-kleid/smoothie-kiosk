"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router'; 
import { useCart } from '../contexts/cart-context';
import "../app/globals.css"

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const getImagePath = (productName) => {
    const imageName = productName.toLowerCase().replace(/\s+/g, '_') + '.png';
    switch (imageName) {
      case 'green_smoothie.png':
      case 'kiwi_smoothie.png':
      case 'mango_smoothie.png':
        return `/img/${imageName}`;
      default:
        return '/img/mystery_smoothie.png';
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <h1 className="page-title">Welcome to the Smoothie Kiosk</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id.$oid} className="product-card">
            <img src={getImagePath(product.name)} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router'; 
import { useCart } from '../contexts/cart-context';

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
    <div>
      <Navbar />
      <h1>Welcome to the Smoothie Kiosk</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product._id.$oid} className="product">
            <img src={getImagePath(product.name)} alt={product.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {/* add styles l8er */}
    </div>
  );
}

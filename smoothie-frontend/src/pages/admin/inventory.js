import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({name: '', quantity: 0, price: 0, description: ''});

  const fetchProducts = () => {
    fetch('http://127.0.0.1:5000/admin/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching inventory:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateQuantity = (productId, newQuantity, adjustment) => {
    const updatedQuantity = adjustment === 'increase' ? newQuantity + 1 : newQuantity - 1;
    fetch(`http://127.0.0.1:5000/admin/products`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: productId, quantity: updatedQuantity }),
    })
    .then(response => response.json())
    .then(() => fetchProducts())
    .catch(error => console.error("Error updating product quantity:", error));
  };

  const handleDeleteProduct = (productId) => {
    fetch(`http://127.0.0.1:5000/admin/products?id=${productId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(() => fetchProducts())
    .catch(error => console.error("Error deleting product:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === 'quantity' || name === 'price') {
      finalValue = value === '' ? '' : Number(value);
    }
    setNewProduct(prevState => ({ ...prevState, [name]: finalValue }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    fetch(`http://127.0.0.1:5000/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
    .then(response => response.json())
    .then(() => {
      fetchProducts(); // Refresh the list
      setNewProduct({name: '', quantity: 0, price: 0, description: ''}); // Reset form
    })
    .catch(error => console.error("Error adding product:", error));
  };

  return (
    <div>
      <Navbar />
      <h1>Inventory Management</h1>
      <form onSubmit={handleAddProduct}>
        <input
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          name="quantity"
          type="number"
          value={newProduct.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          required
        />
        <input
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button type="submit">Add Product</button>
      </form>
      {products.map((product) => (
        <div key={product._id.$oid}>
          <p>Name: {product.name}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleUpdateQuantity(product._id.$oid, product.quantity, 'increase')}>Increase Quantity</button>
          <button onClick={() => handleUpdateQuantity(product._id.$oid, product.quantity, 'decrease')} disabled={product.quantity <= 0}>Decrease Quantity</button>
          <button onClick={() => handleDeleteProduct(product._id.$oid)}>Delete Product</button>
        </div>
      ))}
    </div>
  );
}

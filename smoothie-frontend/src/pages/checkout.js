import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useCart } from '../contexts/cart-context';
import { useRouter } from 'next/router';


const Checkout = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');

  const handlePurchase = async (e) => {
    e.preventDefault();

    if (!customerName || !email || !address || !creditCard) {
      alert('Please fill the  required fields.');
      return;
    }

    let allPurchasesSuccessful = true;

    // Go thru cart and process purchases one by one
    for (const item of cart) {
      for (let i = 0; i < item.quantity; i++) {
        const purchaseData = {
          item: {
            name: item.name,
            price: item.price,
            quantity: 1,
            description: item.description,
          },
          customer_info: {
            name: customerName,
            email: email,
            address: address,
            credit_card: creditCard,
          },
        };

        // POST to backend to handle purchse with database
        const response = await fetch('http://127.0.0.1:5000/purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(purchaseData),
        });

        const data = await response.json();
        if (!data.success) {
          console.error('Purchase failed for item:', item.name, data.error || 'Unknown error');
          alert('Purchase failed for item: ' + item.name + ' - ' + (data.error || 'Unknown error'));
          allPurchasesSuccessful = false;
          break;
        }
      }
    }

    // Clear cart + go to success page after purchase
    if (allPurchasesSuccessful) {
      clearCart();
      router.push('/success');
    } else {
      console.error('Some  purchase failed.');
    }
  };

  return (
    <div className="checkout-container">
      <Navbar />
      <h1 className="page-title">Checkout Page</h1>
      <div className="cart-summary">
        <h2>Your Cart Items:</h2>
        <ul>
          {cart.map((item) => (
            <li key={item._id.$oid} className="cart-item">
              {item.name} - {item.quantity} x ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handlePurchase} className="checkout-form">
        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label>
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="creditCard">Credit Card:</label>
          <input
            id="creditCard"
            type="text"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Confirm Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;

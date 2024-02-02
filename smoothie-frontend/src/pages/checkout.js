import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useCart } from '../contexts/cart-context'; // Make sure the path matches your file structure
import { useRouter } from 'next/router';

const Checkout = () => {
  const { cart, clearCart } = useCart();  // Access the cart from context
  const router = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');

  const handlePurchase = async (e) => {
    e.preventDefault();
  

    const isFormValid = () => {
      return customerName && email && address && creditCard;
    };
    // Prevent form submission if fields not filled
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }
    let allPurchasesSuccessful = true;
    // Preparing customer_info object
    const customer_info = {
      name: customerName,
      email: email,
      address: address,
      credit_card: creditCard, // TODO: handle this better if not a demo
    };
  
    for (const item of cart) {
      // Make a request for each unit of quantity for the item
      for (let i = 0; i < item.quantity; i++) {
        try {
          const response = await fetch('http://127.0.0.1:5000/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              item: {
                name: item.name,
                price: item.price,
                quantity: 1,
                description: item.description,
              },
              customer_info,
            }),
          });
  
          const data = await response.json();
          if (!data.success) {
            console.error('Purchase failed for item:', item.name, data.error || 'Unknown error');
            alert('Purchase failed for item: ' + item.name + ' - ' + (data.error || 'Unknown error'));
            break;
          }
        } catch (error) {
          console.error('Error making purchase for item:', item.name, error);
          break;
        }
      }
    }
  
    if (allPurchasesSuccessful) {
      clearCart();
      router.push('/success');
    } else {
      console.error('Some or all purchases failed.');
    }
  };
  

  return (
    <div>
      <Navbar />
      <h1>Checkout Page</h1>
      <div>
        <h2>Your Cart Items:</h2>
        <ul>
          {cart.map((item) => (
            <li key={item._id.$oid}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handlePurchase}>
        <div>
          <label>Customer Name:</label>
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Credit Card:</label>
          <input type="text" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
        </div>
        <button type="submit">Confirm Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../contexts/cart-context';

const Navbar = () => {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const { cart } = useCart();

  return (
    <nav>
      <div className="links">
        <Link href="/admin/dashboard">Admin</Link>
        <Link href="/">Menu</Link>
        <Link href="/checkout">Checkout</Link>
        <div
          className="cart-link"
          onMouseEnter={() => setShowCartDropdown(true)}
          onMouseLeave={() => setShowCartDropdown(false)}
        >
          Cart
          {showCartDropdown && (
            <div className="cart-dropdown">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item._id.$oid} className="cart-item">
                    {item.name} - {item.quantity}
                  </div>
                ))
              ) : (
                <div className="cart-item">Your cart is empty.</div>
              )}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        nav {
          background-color: #4a5568;
          color: white;
          padding: 0.75rem 1rem;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
        }
        .links {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .admin-link {
          margin-right: auto; /* Pushes all other links to the right */
        }
        a, .cart-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          margin-left: 20px; /* Space between links */
          display: flex;
          align-items: center; /* Align icon with text */
          position: relative; /* For dropdown positioning */
          cursor: pointer;
        }
        .cart-dropdown {
          position: absolute;
          top: 100%;
          right: 0; /* Aligns dropdown to the right of the cart link */
          background-color: white;
          color: black;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 10px;
          display: flex;
          flex-direction: column;
          width: max-content;
        }
        .cart-item {
          margin: 5px 0;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

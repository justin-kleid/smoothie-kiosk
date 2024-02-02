import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';

const Success = () => {
  return (
    <div className="success-container">
      <Navbar />
      <img src="img/mystery_smoothie.png" alt="success img" />
      <h1 className="success-title">Purchase Successful!</h1>
      <p className="success-message">Your order has been processed.</p>
      <Link href="/" className="home-link">Go back to menu</Link>
      <style jsx>{`
        .success-container {
          text-align: center;
          padding: 20px;
        }

        .success-image {
          max-width: 200px;
          margin: 20px auto;
          display: block;
        }

        .success-title {
          font-size: 24px;
          margin: 10px 0;
        }

        .success-message {
          font-size: 18px;
          margin: 10px 0;
        }

        .home-link {
          color: #0071ff;
          font-weight: bold;
          text-decoration: none;
          margin-top: 20px;
          display: inline-block;
        }

        .home-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Success;

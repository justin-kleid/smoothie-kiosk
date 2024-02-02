import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/admin/sales')
      .then(response => response.json())
      .then(data => {
        setSales(data);
      })
      .catch(error => console.error("Error fetching sales records:", error));
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <h1>Sales Records</h1>
      <div className="sales-list">
        {sales.map((sale, index) => (
          <div className="sales-card" key={index}>
            <h2>Product ID: {sale.product_id}</h2>
            <p>Customer Name: {sale.customer_info.name}</p>
            <p>Customer Email: {sale.customer_info.email}</p>
            <p>Customer Address: {sale.customer_info.address}</p>
            <p>Quantity: {sale.quantity}</p>
            <p>Sale Price: ${sale.sale_price}</p>
            <p>Transaction ID: {sale.transaction_id}</p>
            <p>Status: {sale.status}</p>
            <p>Date of Purchase: {new Date(sale.date_of_purchase.$date).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .sales-container {
          padding: 20px;
          background-color: #f4f4f4; /* Light gray background */
          font-family: 'Arial', sans-serif; /* Change the font family */
        }

        .sales-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .sales-card {
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h2 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        p {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
}

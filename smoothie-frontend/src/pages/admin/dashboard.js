import React from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1 className="title">Admin Dashboard</h1>
      <div className="links">
      <Link href="/" className="link">
          <div className="card">Menu</div>
        </Link>
        <Link href="/admin/inventory" className="link">
          <div className="card">Manage Inventory</div>
        </Link>
        <Link href="/admin/sales" className="link">
          <div className="card">View Sales</div>
        </Link>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .title {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .links {
          display: flex;
          gap: 20px;
        }

        .link {
          text-decoration: none;
          color: #333;
        }

        .card {
          background-color: #f4f4f4;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          min-width: 200px;
          text-align: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .card:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;

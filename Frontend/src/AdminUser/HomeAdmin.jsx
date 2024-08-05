import React from "react";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to the Admin Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Company Overview
        </h2>
        <p className="text-gray-700">
          Welcome to the management dashboard of [Company Name]. Here you can
          manage products, orders, and user accounts. Ensure the smooth
          operation of the e-commerce platform by regularly checking the status
          and performance of the store.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Manage Products
          </h3>
          <p className="text-gray-700 mb-4">
            Add, update, and remove products. Ensure all product information is
            up-to-date and accurately reflects the stock availability.
          </p>
          <Link
            to="/admin/addproduct"
            className="text-blue-500 hover:underline"
          >
            Go to Product Management{" "}
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Manage Orders
          </h3>
          <p className="text-gray-700 mb-4">
            View and update order statuses. Ensure orders are processed and
            shipped on time to maintain customer satisfaction.
          </p>
          <Link to="/admin/Order" className="text-blue-500 hover:underline">
            Go to Order Management{" "}
          </Link>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Admin Tips</h3>
        <p className="text-gray-700 mb-4">
          Stay updated with the latest trends and best practices in e-commerce
          management. Regularly review system performance and address any issues
          promptly to ensure a seamless experience for customers.
        </p>
      </div>
    </div>
  );
};

export default HomeAdmin;

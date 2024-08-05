import React from "react";
const HomeCustomer = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-20">
        Welcome again
      </h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Company Overview
        </h2>
        <p className="text-gray-700">
          Welcome to the management dashboard of this shopping. Here you can see
          our products, orders, and user accounts. Ensure the smooth operation
          of the e-commerce platform by regularly checking the status and
          performance of the store.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-700 mb-4">
            View and update order statuses. Ensure orders are processed and
            shipped on time to maintain customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCustomer;

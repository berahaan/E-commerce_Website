import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, calculateTotalPrice, clearCart } = useCart();
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const [submitted, setFormsubmitted] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    email: "",
    transactionUrl: "",
  });
  const totalPrice = calculateTotalPrice().toFixed(2);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      customerInfo,
      cart,
      totalPrice,
    };
    console.log("Total price front end ", totalPrice);

    try {
      const response = await axios.post(
        "http://localhost:2000/checkout",
        orderDetails
      );

      if (response.data.success) {
        setConfirm(true);
        clearCart();
        setCustomerInfo({
          name: "",
          address: "",
          email: "",
          transactionUrl: "",
        });
        setFormsubmitted(true);
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error placing order.");
    }
  };
  setTimeout(() => {
    // setConfirm(false);
  }, 6000);
  return (
    <div className="container mx-auto p-4 flex justify-center mt-7">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">Checkout your money here </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-auto">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={(e) => {
                setCustomerInfo({ ...customerInfo, name: e.target.value });
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={customerInfo.address}
              // onChange={handleInputChange}
              onChange={(e) => {
                setCustomerInfo({ ...customerInfo, address: e.target.value });
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              // onChange={handleInputChange}
              onChange={(e) => {
                setCustomerInfo({ ...customerInfo, email: e.target.value });
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Transaction URL you can use telebirr or cbe{" "}
            </label>
            <input
              type="text"
              name="transactionUrl"
              value={customerInfo.transactionUrl}
              // onChange={handleInputChange}
              onChange={(e) => {
                setCustomerInfo({
                  ...customerInfo,
                  transactionUrl: e.target.value,
                });
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Total Price: ${calculateTotalPrice().toFixed(2)}
            </h2>
          </div>
          <div className="flex justify-between mt-4">
            {submitted ? (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
                disabled
              >
                Place Order
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Place Order
              </button>
            )}
            <Link to="/customer/cart">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded mx-auto"
              >
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-auto max-w-md">
        {confirm && (
          <p className="text-xl text-orange-400">
            Order placed successfully! We will verify your transaction and
            confirm your order shortly Via Your provided email. <br /> Thanks !!
          </p>
        )}
        {/* <footer className="mx-auto w-full">
          u can use our account number and send only transaction Url in inout
          field aboves <br />
          cbe:1000930393030 telebirr:0930300303 dashenbank :20202020002
          abaybank:39939393
        </footer> */}
      </div>
    </div>
  );
};

export default Checkout;

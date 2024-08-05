import React from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();
  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 min-h-screen mt-10 text-center">
        <h1 className="text-2xl font-bold mb-8">Your Cart is Empty</h1>
        <h2 className="text-2xl font-bold mb-8">
          Please first add your favorite product from store here{" "}
        </h2>
        <Link to="/customer/productlistCustomer" className="text-blue-500">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen mt-10">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      {cart.map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-4"
        >
          <div className="flex items-center">
            <img
              src={`http://localhost:2000/image/${product.image}`}
              alt={product.productName}
              className="w-32 h-32 object-cover"
            />
            <div className="p-4 flex-1">
              <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-semibold text-gray-800">
                ${product.price}
              </p>
              {product.discount && (
                <p className="text-red-500 font-semibold">
                  {product.discount}% OFF
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <Link to="/customer/productlistCustomer" className="text-blue-500">
        Continue Shopping
      </Link>
      <div className="text-right">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => navigate("/customer/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;

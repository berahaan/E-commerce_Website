import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerNavbar({ email }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:2000/customer", {
          withCredentials: true,
        });
        const response1 = await axios.get(
          `http://localhost:2000/getUsername/${email}`
        );
        setUsername(response1.data.Username);
        console.log("Username from database:", response1.data.Username);
      } catch (error) {
        if (error.response || error.response.status === 401) {
          navigate("/login");
        } else {
          alert("An error occurred");
        }
      }
    };
    if (email) {
      fetchUsername();
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen bg-cover bg-center">
      <nav className="bg-gray-800 p-4 fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">
            {" "}
            Hi {username}
          </div>
          <div className="space-x-4">
            <Link
              to="/customer/HomeCustomer"
              className="text-gray-300 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/customer/productlistCustomer"
              className="text-gray-300 hover:text-white"
            >
              Product List
            </Link>
            <Link
              to="/customer/cart"
              className="text-gray-300 hover:text-white"
            >
              Cart List
            </Link>
            <Link
              to="/customer/notification"
              className="text-gray-300 hover:text-white"
            >
              Notification
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default CustomerNavbar;

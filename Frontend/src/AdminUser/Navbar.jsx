import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Navbar({ email }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:2000/admin", {
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
          <div className="text-white text-lg font-semibold ">
            Hi {username} Welcome
          </div>
          <div className="space-x-4">
            <Link to="/admin/home" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link
              to="/admin/Addproduct"
              className="text-gray-300 hover:text-white"
            >
              Add product
            </Link>
            <Link
              to="/admin/product-list"
              className="text-gray-300 hover:text-white"
            >
              Product list
            </Link>

            <Link to="/admin/Order" className="text-gray-300 hover:text-white">
              Ordered Product
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;

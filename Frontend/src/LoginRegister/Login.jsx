import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Customers/CustomerNavbar";
const Login = ({ setEmail }) => {
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmaillocal] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginSucces, setLoginSucess] = useState(false);
  const [notloginSucces, setNotLoginSucess] = useState(false);
  const [showRequiredfilled, setRequiredFilled] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const registerData = {
        password,
        role,
        email,
      };

      const response = await axios.post(
        "http://localhost:2000/login",
        registerData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setLoginSucess(true);
        setEmail(email);
        switch (role) {
          case "admin":
            navigate("/admin");
            break;
          case "customer":
            navigate("/customer");
            break;
          default:
            alert("Log in failed");
            break;
        }
      } else if (response.status === 204) {
        alert("User not found, please sign up first");
      } else if (response.status === 206) {
        setRequiredFilled(true);
        // alert("Please fill up all required filled and log in !!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setNotLoginSucess(true);
      } else {
        console.error("An error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  setTimeout(() => {
    setNotLoginSucess(false);
    setRequiredFilled(false);
  }, 6000);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmaillocal(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              // required
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              // required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 pr-3 mt-8 flex items-center text-sm leading-5"
            >
              {passwordVisible ? (
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12h2m-6 4h6M4 6h6m-6 4h6m-6 4h6m8 4h-6M4 6h6m-6 4h6m-6 4h6m8 4h-6"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12h2m-6 4h6M4 6h6m-6 4h6m-6 4h6m8 4h-6M4 6h6m-6 4h6m-6 4h6m8 4h-6"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // required
            >
              <option value=""></option>
              <option value="admin">admin</option>
              <option value="customer">customer</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-36 ${
                loading && "cursor-not-allowed opacity-50"
              }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 108 8h-4l4 4-4 4v-4a8 8 0 01-8 8H4z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="text-sm mt-4">
            {showRequiredfilled && (
              <p className="text-red-600 mx-12 ">
                Please fill all required filled and try again
              </p>
            )}
            {notloginSucces && (
              <p className="text-red-600 mx-12 ">Login Failed try again</p>
            )}
          </div>
          <div className="text-xl mt-6">
            If you haven't registered, please
            <Link
              to="/register"
              className="px-2 text-green-400 hover:text-green-500"
            >
              sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

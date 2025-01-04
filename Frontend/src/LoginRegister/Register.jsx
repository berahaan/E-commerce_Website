import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [Username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailExist, setEmailexist] = useState(false);
  const [showRequiredfilled, setRequiredFilled] = useState(false);
  const [pass, setPass] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const lengthM = password.length;

    try {
      const register = {
        Username,
        email,
        password,
        role,
      };
      const response = await axios.post(
        "http://localhost:2000/register",
        register
      );
      if (lengthM <= 5) {
        setPass(true);
        return;
      }
      if (response.status === 204) {
        setRequiredFilled(true);
        return;
      }
      if (response.status === 203) {
        setEmailexist(true);
        return;
      }
      alert("Users registered successfully !! ");
      navigate("/login");
    } catch (error) {
      console.log(error);
      // if (error.response.status === 203) {
      //   cl
      // }
    }
  };
  setTimeout(() => {
    setEmailexist(false);
    setRequiredFilled(false);
    setPass(false);
  }, 5000);
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Sign-Up Here
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label
              htmlFor="Username"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              User Name
            </label>
            <input
              id="Username"
              type="text"
              value={Username}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your email"
            />
            {emailExist && (
              <p className="text-sm text-red-600 mt-2">
                Email already exists. Try another account!
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 0 12 0c5.523 0 10 4.477 10 10 0 1.648-.42 3.24-1.162 4.647m-2.33 5.03A4.978 4.978 0 0012 16a4.978 4.978 0 00-3.394 1.361m8.469 2.354a4.978 4.978 0 00-2.257-.744"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.98 8.654A10.03 10.03 0 0012 2a10.03 10.03 0 018.02 6.654M19.02 15.346A10.03 10.03 0 0112 22a10.03 10.03 0 01-8.02-6.654M15 12H9m12 0a10.03 10.03 0 00-3.98 6.654M3.98 15.346A10.03 10.03 0 0112 22M9 12h6"
                  />
                </svg>
              )}
            </button>
            {pass && (
              <p className="text-sm text-red-600 mt-2">
                Password should be greater than 5 characters
              </p>
            )}
          </div>

          {/* Role Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="">Select a role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Error Messages */}
          {showRequiredfilled && (
            <p className="text-sm text-red-600">
              Please fill in all required fields
            </p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-200"
            >
              Register
            </button>
          </div>

          {/* Login Redirect */}
          <div className="text-center text-gray-700 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:underline"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

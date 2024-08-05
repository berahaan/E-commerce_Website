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
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="max-w-md w-full bg-gray-200 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">Sign-Up here </h2>
        <form
          onSubmit={handleSubmit}
          className=""
          style="background-color: #00000076"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="Username"
            >
              User name
            </label>
            <input
              id="Username"
              type="text"
              value={Username}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-1">
            {emailExist && (
              <p className="text-red-600">
                Email already exist try with different account !!{" "}
              </p>
            )}
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
                    d="M15 12h2m-6 4h6M4 6h6m-6 4h6m-6 4h6m8 4h-6M4 6h6m-6 4h6m-6 4h6m8 4h-6M4 6h6m-6 4h6m-6 4h6m8 4h-6"
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
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              className="outline-none w-full  max-h-min "
              onChange={(e) => {
                setRole(e.target.value);
              }}
              // required
            >
              <option value=""></option>
              <option value="customer">customer</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 mx-20 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          {showRequiredfilled && (
            <p className="text-red-600 mx-14">
              Please fill all required filled{" "}
            </p>
          )}
          {pass && (
            <p className="text-red-600 mx-14">
              Password should be greater than 5{" "}
            </p>
          )}
          <div className="text-xl mt-6 text-teal-600">
            if u have already account
            <Link
              to="/login"
              className="px-2 text-green-400 hover:text-green-500"
            >
              Login
            </Link>
            here
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

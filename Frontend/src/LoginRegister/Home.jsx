import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Our E-commerce Site
        </h1>
        <p className="text-lg mb-4">Please Log in or sign up below</p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;

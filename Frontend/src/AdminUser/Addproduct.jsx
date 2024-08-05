import React, { useEffect, useState } from "react";
import axios from "axios";

function Addproduct() {
  const [file, setFile] = useState();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [Catagory, setCatagory] = useState("");
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("Catagory", Catagory);
    console.log({
      productName,
      description,
      price,
      discount,
      Catagory,
    });
    try {
      await axios.post("http://localhost:2000/upload", formData);
      alert("Product added successfully successful");
      //   fetchImages(); // Fetch images again after upload
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add New Product
        </h2>
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="catagory"> Select Catagory </label>
            <select
              id="Catagory"
              value={Catagory}
              onChange={(e) => setCatagory(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 w-full"
            >
              <option value=""></option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="shoes">shoes</option>
              <option value="Laptop">Laptop</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Jacket">Jacket</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Discount</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;

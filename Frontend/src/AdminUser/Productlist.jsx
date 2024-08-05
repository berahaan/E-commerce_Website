import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCart } from "../Customers/CartContext";
import { useNavigate } from "react-router-dom";

function Productlist() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Catagory, setCatagory] = useState("");
  const modalRef = useRef();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const [editedProduct, setEditedProduct] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedDiscount, setEditeDiscount] = useState("");
  const [editedDiscrption, setEditeDiscription] = useState("");
  const [editedImages, setEditeImages] = useState("");
  const [editedCatagory, seteditedCatagory] = useState("");
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const fetchImages = async (Catagory) => {
    try {
      const response = Catagory
        ? await axios.get(`http://localhost:2000/find/${Catagory}`)
        : await axios.get("http://localhost:2000/getimage");
      setImages(response.data);
      setEditedProduct(null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Failed to load images.");
    }
  };

  useEffect(() => {
    fetchImages(Catagory);
  }, [Catagory]);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleEdit = (product) => {
    setEditedProduct(product);
    setEditedName(product.productName || "");
    seteditedCatagory(product.Catagory || "");
    setEditedPrice(product.price || "");
    setEditeDiscount(product.discount || "");
    setEditeImages(product.image || "");
    setEditeDiscription(product.description || "");
  };

  const handleSave = async () => {
    try {
      let imageUrl = editedImages; // Default to existing image URL

      // If a new image file is selected, upload it
      if (typeof editedImages === "object") {
        const formData = new FormData();
        formData.append("file", editedImages);
        formData.append("productName", editedName);
        formData.append("description", editedDiscrption);
        formData.append("price", editedPrice);
        formData.append("discount", editedDiscount);
        formData.append("Catagory", editedCatagory);
        const uploadResponse = await axios.post(
          "http://localhost:2000/upload",
          formData
        );

        imageUrl = uploadResponse.data.imageUrl; // Assuming your server returns the image URL
      }

      await axios.put(
        `http://localhost:2000/updateProduct/${editedProduct._id}`,
        {
          price: editedPrice,
          discount: editedDiscount,
          productName: editedName,
          image: imageUrl,
          description: editedDiscrption,
          Catagory: editedCatagory,
        }
      );

      alert("Products updated successfully");
      fetchImages(Catagory);
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      setImages(images.filter((x) => x._id !== id));
      const response = await axios.delete(`http://localhost:2000/remove/${id}`);
      alert("Product deleted successfully ");
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const setCatgry = (e) => {
    console.log("Here is a category selected ", e);
    setCatagory(e);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 min-h-screen mt-10">
      <h1 className="text-2xl font-bold text-center mb-8">Our Product List</h1>
      <div className=" flex justify-between mb-4 ">
        <select
          id="Catagory"
          value={Catagory}
          onChange={(e) => setCatgry(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-gray-400"
        >
          <option value="">All Products</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="shoes">Shoes</option>
          <option value="Laptop">Laptop</option>
          <option value="T-shirt">T-shirt</option>
          <option value="Jacket">Jacket</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
            <img
              src={`http://localhost:2000/image/${img.image}`}
              alt={`Uploaded ${index}`}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              {editedProduct === img ? (
                <div>
                  <input
                    type="text"
                    value={editedName}
                    className="outline-none bg-gray-300"
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <input
                    type="file"
                    onChange={(e) => setEditeImages(e.target.files[0])}
                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
              ) : (
                <h2 className="text-xl font-bold mb-2">{img.productName}</h2>
              )}
              <p className="text-gray-600 mb-2">{img.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-800">
                  {img.price} birr
                </p>
                {img.discount && (
                  <p className="text-red-500 font-semibold">
                    {img.discount}% OFF
                  </p>
                )}
              </div>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => handleDelete(img._id)}
              >
                Delete
              </button>
              {editedProduct === img ? (
                <div>
                  <button
                    onClick={handleSave}
                    className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 m-4 rounded "
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditedProduct(null)}
                    className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(img)}
                  className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-6 rounded"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productlist;

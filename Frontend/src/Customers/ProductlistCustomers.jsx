import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCart } from "./CartContext";

function Productlist() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Catagory, setCatagory] = useState("");
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const modalRef = useRef();
  const { addToCart } = useCart();

  const fetchImages = async (Catagory) => {
    try {
      const response = Catagory
        ? await axios.get(`http://localhost:2000/find/${Catagory}`)
        : await axios.get("http://localhost:2000/getimage");
      setImages(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load images.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(Catagory);
  }, [Catagory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProduct(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage(`Added ${product.productName} to cart`);
    setShowCartMessage(true);
    setTimeout(() => {
      setShowCartMessage(false);
    }, 3000);
  };

  const setCatgry = (e) => {
    setCatagory(e);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 min-h-screen mt-10 relative">
      <h1 className="text-2xl font-bold text-center mb-8 mt-4">
        Our Product List
      </h1>
      <div className="flex justify-between mb-4">
        <select
          id="Catagory"
          value={Catagory}
          onChange={(e) => setCatgry(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-gray-400 flex-1"
        >
          <option value="">All Products</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="shoes">shoes</option>
          <option value="Laptop">Laptop</option>
          <option value="T-shirt">T-shirt</option>
          <option value="Jacket">Jacket</option>
          <option value="other">other</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() =>
                setSelectedProduct({
                  productName: img.productName,
                  price: img.price,
                  discount: img.discount,
                  description: img.description,
                  image: img.image,
                })
              }
            >
              <img
                src={`http://localhost:2000/image/${img.image}`}
                alt={`Uploaded ${index}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{img.productName}</h2>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(img);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {showCartMessage && (
          <div className="fixed top-20 right-4 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-300">
            {cartMessage}
          </div>
        )}
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <img
              src={`http://localhost:2000/image/${selectedProduct.image}`}
              alt={selectedProduct.productName}
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">
              {selectedProduct.productName}
            </h2>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Price: ${selectedProduct.price}
            </p>
            {selectedProduct.discount && (
              <p className="text-red-500 font-semibold mb-2">
                Discount: {selectedProduct.discount}% OFF
              </p>
            )}
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productlist;

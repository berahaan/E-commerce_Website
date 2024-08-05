import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:2000/getorders");
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders.");
        setLoading(false);
      }
    };
    setInterval(() => {
      fetchOrders();
    }, 5000);
  }, []);

  const sendEmail = async (order) => {
    const templateParams = {
      to_name: order.name,
      to_email: order.email,
      order_id: order._id,
      order_total: order.totalPrice.toFixed(2),
      transaction_url: `https://${order.transactionUrl}`,
    };

    try {
      const response = await emailjs.send(
        "service_g85h72t",
        "template_x39bbw8",
        templateParams,
        "750VwY2asRkZYGSCp"
      );
      console.log("Email sent successfully!", response.status, response.text);
      return { success: true };
    } catch (error) {
      console.error("Failed to send email.", error);
      return { success: false, error };
    }
  };

  const handleConfirm = async (orderId, order) => {
    try {
      const response = await axios.put(
        `http://localhost:2000/confirm-order/${orderId}`
      );
      if (response.data.success) {
        const emailResponse = await sendEmail(order); ///
        if (!emailResponse.success) {
          alert("Failed to send email. Please try again.");
          setOrders((prevOrders) =>
            prevOrders.map((o) =>
              o._id === orderId
                ? {
                    ...o,
                    status: false,
                    confirmationMessage: "",
                  }
                : o
            )
          ); // Send confirmation email
        } else {
          alert("order is confirmed and email is successfully sent !!");
          setOrders((prevOrders) =>
            prevOrders.map((o) =>
              o._id === orderId
                ? {
                    ...o,
                    status: true,
                    confirmationMessage:
                      response.data.order.confirmationMessage,
                  }
                : o
            )
          );
        }
      } else {
        alert("Failed to confirm order.");
      }
    } catch (err) {
      console.error("Error confirming order:", err);
      alert("Error confirming order.");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Admin Orders</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border-b">seq.no</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Address</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Transaction URL</th>
            <th className="p-2 border-b">Total Price</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td className="p-2 border-b">{index + 1}</td>
              <td className="p-2 border-b">{order.name}</td>
              <td className="p-2 border-b">{order.address}</td>
              <td className="p-2 border-b">{order.email}</td>
              <td className="p-2 border-b">
                <a
                  href={`https://${order.transactionUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {order.transactionUrl}
                </a>
              </td>
              <td className="p-2 border-b">
                {order.totalPrice ? `$${order.totalPrice.toFixed(2)}` : "N/A"}
              </td>
              <td className="p-2 border-b">
                {order.status ? "Confirmed" : "Pending"}
              </td>
              <td className="p-2 border-b">
                {!order.status && (
                  <button
                    onClick={() => handleConfirm(order._id, order)}
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;

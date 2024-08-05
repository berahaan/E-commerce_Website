import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Notification = () => {
  const { orderId } = useParams();
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    const fetchConfirmationMessage = async () => {
      if (!orderId) return; // Ensure orderId is defined
      try {
        const response = await axios.get(
          `http://localhost:2000/confirmation-message/${orderId}`
        );
        setConfirmationMessage(response.data.confirmationMessage);
      } catch (error) {
        console.error("Error fetching confirmation message:", error);
      }
    };

    fetchConfirmationMessage();
  }, [orderId]);
  console.log("here in notification pages ", orderId);

  return (
    <div className="confirmation-message mt-24">
      {confirmationMessage ? (
        <p>{confirmationMessage}</p>
      ) : (
        <p>No confirmation message available.</p>
      )}
    </div>
  );
};

export default Notification;

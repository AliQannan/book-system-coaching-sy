import React, { useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/Context";

function PayPalPayment() {
  const { docId } = useParams();
  const navigate = useNavigate();

  const {
    backendUrl,
    token,
    slotDate,
    slotTime,
    userId,
    amount,
  } = useContext(AppContext);

  // ✅ Validate required data before rendering
  if (!slotDate || !slotTime || !userId || !amount) {
    toast.error("Missing booking information");
    navigate(`/appointment/${docId}`);
    return null;
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            <span className="text-blue-500">Pay with</span> PayPal
          </h2>

          {/* Appointment Summary */}
          <div className="mb-6 text-center">
            <p className="text-gray-600 mb-2">Appointment Details:</p>
            <p className="text-sm text-gray-500">
              Date: {slotDate.replace(/_/g, "/")}
            </p>
            <p className="text-sm text-gray-500">Time: {slotTime}</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">
              Amount: ${amount}
            </p>
          </div>

          {/* PayPal Button */}
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={async () => {
              try {
                const { data } = await axios.post(
                  `${backendUrl}/api/paypal/create-order`,
                  { docId },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      token: token,
                    },
                  }
                );

                if (data?.id) return data.id;
                else throw new Error("Invalid PayPal order response");
              } catch (error) {
                console.error("Error creating PayPal order:", error);
                toast.error("Failed to create payment order");
                throw error;
              }
            }}
            onApprove={async (data) => {
              try {
                const res = await axios.post(
                  `${backendUrl}/api/paypal/capture-order`,
                  {
                    orderID: data.orderID,
                    docId,
                    userId,
                    slotDate,
                    slotTime,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      token: token,
                    },
                  }
                );

                if (res.data.success) {
                  toast.success(res.data.message || "Payment successful!");
                  navigate("/my-appointments");
                } else {
                  toast.error(res.data.message || "Payment failed.");
                }
              } catch (err) {
                console.error("Payment capture error:", err);
                toast.error("Payment processing failed. Please try again.");
              }
            }}
            onError={(err) => {
              console.error("PayPal error:", err);
              toast.error("Payment failed. Please try again.");
            }}
            onCancel={() => {
              toast.info("Payment cancelled");
              navigate(`/appointment/${docId}`);
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;

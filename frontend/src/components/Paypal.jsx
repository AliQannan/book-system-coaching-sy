import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PayPalPayment() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { slotDate, slotTime, userId, amount, backendUrl } = location.state; // passed from previous page

  return (
    <PayPalScriptProvider
      options={{
"client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID ,
 currency: "USD",
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            <span className="text-blue-500">Pay with</span> PayPal
          </h2>
          <PayPalButtons
            createOrder={async () => {
              const { data } = await axios.post(`${backendUrl}/api/paypal/create-order`, {
                amount,
              });
              return data.id;
            }}
            onApprove={async (data) => {
              const res = await axios.post(`${backendUrl}/api/paypal/capture-order`, {
                orderID: data.orderID,
                docId,
                userId,
                slotDate,
                slotTime,
              });
              if (res.data.success) {
                toast.success("Payment successful! Appointment booked.");
                navigate("/my-appointments");
              } else {
                toast.error(res.data.message);
              }
            }}
            onError={(err) => {
              console.error(err);
              toast.error("Payment failed. Try again.");
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;

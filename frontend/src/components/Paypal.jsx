import React, { useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/Context";
import { ShieldCheck, Lock, Clock, Calendar, User, CheckCircle } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <ShieldCheck className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Secure Payment
            </h1>
            <p className="text-lg text-gray-600">
              Complete your appointment booking with confidence
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Payment Form */}
              <div className="p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Payment Details
                  </h2>
                  <div className="flex items-center space-x-1 text-green-600">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm font-medium">Secure</span>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                    Appointment Summary
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Consultation Fee
                      </span>
                      <span className="font-semibold text-gray-900">${amount}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Date
                      </span>
                      <span className="font-medium text-gray-900">
                        {slotDate.replace(/_/g, "/")}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Time
                      </span>
                      <span className="font-medium text-gray-900">{slotTime}</span>
                    </div>
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-xl font-bold text-blue-600">${amount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Method
                  </h3>
                  
                  {/* PayPal Button Container */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Pay</span>
                        </div>
                        <span className="font-semibold text-gray-900">PayPal</span>
                      </div>
                      <img 
                        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" 
                        alt="PayPal" 
                        className="h-8"
                      />
                    </div>
                    
                    <PayPalButtons
                      style={{ 
                        layout: "vertical",
                        shape: "pill",
                        color: "blue",
                        height: 48
                      }}
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

                {/* Security Badges */}
                <div className="flex items-center justify-center space-x-6 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs">SSL Secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span className="text-xs">Encrypted</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Trust Elements */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-10 text-white">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">
                      Why Choose PayPal?
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-white bg-opacity-20 rounded-full p-2 mt-1">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">
                            Buyer Protection
                          </h4>
                          <p className="text-blue-100 text-sm">
                            Get a full refund if your service isn't as described
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-white bg-opacity-20 rounded-full p-2 mt-1">
                          <Lock className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">
                            Secure Encryption
                          </h4>
                          <p className="text-blue-100 text-sm">
                            Your financial information is never shared with us
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-white bg-opacity-20 rounded-full p-2 mt-1">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">
                            Instant Confirmation
                          </h4>
                          <p className="text-blue-100 text-sm">
                            Receive immediate booking confirmation after payment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonials */}
                  <div className="mt-8">
                    <div className="bg-white bg-opacity-10 rounded-xl p-6">
                      <p className="text-blue-100 italic mb-4">
                        "The payment process was smooth and secure. I received my confirmation instantly!"
                      </p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">Sarah M.</p>
                          <p className="text-blue-200 text-sm">Regular Client</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Support Info */}
                  <div className="mt-6 text-center">
                    <p className="text-blue-200 text-sm">
                      Need help? <a href="#" className="underline hover:text-white">Contact Support</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Your payment is secured with 256-bit SSL encryption. By completing this payment, 
              you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
            </p>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;
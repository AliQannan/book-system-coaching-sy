import React from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-r from-blue-100 via-cyan-100 to-blue-50 text-gray-800 rounded-2xl my-16 mx-4 sm:mx-8 p-10 sm:p-16 overflow-hidden shadow-lg">
      {/* Decorative background shapes */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-300/20 rounded-full blur-2xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight text-blue-900">
          Empowering You to Grow and Succeed
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          NextStep helps you enhance your skills, gain confidence, and find new
          opportunities — guiding you to achieve personal and professional growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              navigate("/coaches");
              scrollTo(0, 0);
            }}
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Meet Our Coaches
          </button>

          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="border-2 border-blue-600 text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300"
          >
            Start Your Journey
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Your next step to personal and professional growth starts here.
        </p>
      </div>
    </section>
  );
}

export default Banner;

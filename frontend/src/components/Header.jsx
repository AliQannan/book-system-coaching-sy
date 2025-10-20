import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";

function Header() {
  return (
    <header className="relative rounded-3xl overflow-hidden shadow-lg h-[480px] md:h-[600px]">
      
      {/* Background Image (Full Header) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.header_img})` }}
      ></div>
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-16 md:py-24 h-full">

        {/* -------- LEFT SIDE (Text Content) -------- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 text-center md:text-left h-full">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Achieve Your Career Goals <br /> With Expert Coaching
          </h1>

          <p className="text-gray-700 text-sm md:text-base font-light mt-2 max-w-md">
            Build a standout CV, improve your skills, and get guidance from <span className="text-blue-500 ">professional </span>  coaches. Start your journey to your dream job today.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link
              to="#speciality"
              className="flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-teal-600 hover:scale-105 transition-all duration-300"
            >
              Explore Services
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 border border-gray-900 text-gray-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-900 hover:text-white hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* -------- RIGHT SIDE (Empty / Decorative) -------- */}
        <div className="md:w-1/2 mt-10 md:mt-0 h-full w-full"></div>

      </div>
    </header>
  );
}

export default Header;

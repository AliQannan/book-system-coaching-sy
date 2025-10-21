import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 md:mx-10 mt-40 rounded-3xl overflow-hidden shadow-sm">
      {/* --- Main Content --- */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 p-10 text-sm">

        {/* ---- Left Section ---- */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img
              className="w-20 h-20 object-contain" // increased logo size
              src={assets.logo}
              alt="NextStep Logo"
            />
          </div>

          <p className="w-full md:w-3/4 text-gray-600 leading-6">
            <span className="font-semibold text-gray-800">NextStep</span> is a platform dedicated 
            to helping individuals achieve their career goals through personalized coaching, 
            professional CV building, and expert guidance — empowering you to take your next step 
            toward success.
          </p>

          <div className="mt-6 text-gray-700">
            <p className="text-sm">
              Developed by{" "}
              <a
                href="https://github.com/AliQannan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Ali Qannan
              </a>
            </p>
          </div>
        </div>

        {/* ---- Center Section ---- */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-900">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact Us</a></li>
            <li><a href="/privacy" className="hover:text-blue-600">Privacy Policy</a></li>
          </ul>
        </div>

        {/* ---- Right Section ---- */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-900">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a href="tel:+970597126705" className="hover:text-blue-600">
                +970 597 126 705
              </a>
            </li>
            <li>
              <a
                href="mailto:aliibrhemqannan@gmail.com"
                className="hover:text-blue-600"
              >
                aliibrhemqannan@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Footer Bottom --- */}
      <div className="bg-gray-100 py-5 border-t border-gray-200 text-center text-gray-700 text-sm">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-semibold">NextStep</span> — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

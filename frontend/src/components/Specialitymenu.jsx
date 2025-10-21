import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

function SpecialityMenu() {
  return (
    <section
      className="py-20 bg-gray-50"
      id="speciality"
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Explore Our Services
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
          Browse our range of professional career coaching services. Whether you want to build a standout CV, optimize your LinkedIn profile, or get personalized coaching, we have the right solutions to guide you toward your dream career.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {specialityData.map((item, index) => (
          <p
           
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center cursor-pointer"
          >
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 mb-4"
              src={item.image}
              alt={item.speciality}
            />
            <h3 className="text-lg font-semibold text-gray-900">{item.speciality}</h3>
            <p className="text-gray-500 text-sm mt-2">
              {item.description || "Professional coaching to help you grow."}
            </p>
          </p>
        ))}
      </div>
    </section>
  );
}

export default SpecialityMenu;

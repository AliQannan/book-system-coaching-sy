import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "../context/Context.jsx";

function Coaches() {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext); // you can rename "doctors" to "coaches" in context later

  return (
    <section id="related-coaches" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Top Career Coaches
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
          Browse through our curated list of professional career coaches. 
          Get guidance on CV building, LinkedIn optimization, personal branding, and interview preparation.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {doctors.slice(0, 10).map((coach, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${coach._id}`)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <img
              className="w-full h-48 object-cover"
              src={coach.image}
              alt={coach.name}
            />
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    coach.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <p className="text-gray-500">
                  {coach.available ? "Available" : "Unavailable"}
                </p>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{coach.name}</h3>
              <p className="text-gray-600 text-sm">{coach.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="inline-block bg-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-teal-600 hover:scale-105 transition-all duration-300"
        >
          See All Coaches
        </button>
      </div>
    </section>
  );
}

export default Coaches;

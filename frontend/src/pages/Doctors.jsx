import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Context.jsx";

function Doctors() {
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const applyFilter = () => {
    if (speciality) {
      const filterdoctors = doctors.filter(
        (doc) => doc.speciality === speciality
      );
      setFilterDoc(filterdoctors);
    } else {
      setFilterDoc(doctors);
    }
  };
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          } `}
          onClick={() => {
            setShowFilter((prev) => !prev);
          }}
        >
          Filters
        </button>
        {
          //  right side
        }
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() => {
              speciality === "Career Development Consultant"
                ? navigate("/coaches")
                : navigate("/coaches/Career Development Consultant");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality == "Career Development Consultant"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Career Development Consultant
          </p>
          <p
            onClick={() => {
              speciality === "Recruiter"
                ? navigate("/coaches")
                : navigate("/coaches/Recruiter");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality == "Recruiter" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Recruiter
          </p>
          <p
            onClick={() => {
              speciality === "Career Success Specialist"
                ? navigate("/coaches")
                : navigate("/coaches/Career Success Specialist");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality == "Career Success Specialist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Career Success Specialist
          </p>
          
        </div>
        {
          // left side
        }
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
              }}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center">
                  {item.available ? (
                    <>
                      {" "}
                      <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                      <p>Available</p>
                    </>
                  ) : (
                    <>
                      <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                      <p>unAvailable</p>
                    </>
                  )}
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;

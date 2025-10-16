import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Context.jsx";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";

function Appointment() {
  const navigate = useNavigate();
  const { docId } = useParams();

  const {
    doctors,
    currencySymbol,
    token,
    backendUrl,
    userData,
    setSlotDate,
    setSlotTime,
    setUserId,
    setAmount,
  } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTimeLocal] = useState("");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Get doctor info
  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  // Generate available slots
  const getAvailableSlots = () => {
    if (!docInfo) return;
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const isBooked =
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime);

        if (!isBooked) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // Navigate to PayPal payment page
  const goToPayment = () => {
    // Check login
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    if (!userData || !userData._id) {
      toast.error("User information not found. Please login again.");
      return navigate("/login");
    }

    // Check slot selection
    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
      toast.warn("Please select a valid day");
      return;
    }

    const selectedDay = docSlots[slotIndex][0]?.datetime;
    if (!selectedDay) {
      toast.warn("Please select a valid slot");
      return;
    }

    const day = selectedDay.getDate();
    const month = selectedDay.getMonth() + 1;
    const year = selectedDay.getFullYear();
    const slotDate = `${day}_${month}_${year}`;

    // ✅ Save booking info in global AppContext
    setSlotDate(slotDate);
    setSlotTime(slotTime);
    setAmount(docInfo.fees);
    setUserId(userData._id);

    // Navigate to payment page
    navigate(`/payment/${docId}`);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="verified" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
          <p>Booking slots</p>

          {/* Days */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.map((daySlots, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTimeLocal("");
                }}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
              >
                <p>{daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}</p>
                <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTimeLocal(item.time)}
                className={`text-sm font-light flex-shrink-0 px-6 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button
            onClick={goToPayment}
            className="bg-primary py-3 text-white text-sm font-light rounded-full my-6 px-14"
          >
            Book an appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointment;

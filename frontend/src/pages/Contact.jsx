import React from "react";
import { assets } from "../assets/assets";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

function Contact() {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 via-cyan-50 to-white text-gray-800 py-16 px-6 sm:px-12 lg:px-20 overflow-hidden">

      {/* Background image for mobile */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={assets.contact_image}
          alt="Contact NextStep"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
      </div>

    

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Desktop Image */}
        <img
          src={assets.contact_image}
          alt="Contact NextStep"
          className="hidden md:block w-full md:max-w-[400px] rounded-2xl shadow-lg"
        />

        {/* Text Info */}
        <div className="flex flex-col justify-center items-start gap-8 max-w-md">
          <div className="flex items-start gap-4">
            <MapPinIcon className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-blue-800 mb-1">Our Office</h3>
              <p className="text-gray-600 leading-relaxed">
                NextStep Coaching & Development  
                <br />
                Gaza City, Palestine  
                <br />
                (Remote & Global Services)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PhoneIcon className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-blue-800 mb-1">Phone</h3>
              <p className="text-gray-600 leading-relaxed">+970 599 123 456</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <EnvelopeIcon className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-blue-800 mb-1">Email</h3>
              <p className="text-gray-600 leading-relaxed">
                <a href="mailto:contact@nextstepcoaching.com" className="text-blue-600 hover:underline">
                  contact@nextstepcoaching.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

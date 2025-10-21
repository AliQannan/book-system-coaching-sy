import React from "react";
import { assets } from "../assets/assets";
import { BriefcaseIcon, UsersIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

function About() {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 via-cyan-50 to-white text-gray-800 py-16 px-6 sm:px-12 lg:px-20 overflow-hidden">

      {/* Large background shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

      {/* Title */}
      <div className="relative text-center mb-16 z-10">
        <h2 className="text-4xl font-bold text-blue-900 mb-3">About Us</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Empowering individuals and organizations to take the next step in personal and professional growth.
        </p>
      </div>

      {/* Content */}
      <div className="relative flex flex-col md:flex-row items-center gap-12 z-10">

        {/* Desktop image */}
        <img
          src={assets.about_image}
          alt="About NextStep"
          className="hidden md:block w-full md:max-w-[400px] rounded-2xl shadow-lg"
        />

        {/* Mobile background image */}
        <div
          className="absolute inset-0 md:hidden opacity-10 -z-10"
          style={{
            backgroundImage: `url(${assets.about_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Text content */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 text-base leading-relaxed">
          <p>
            Welcome to <span className="font-semibold text-blue-700">NextStep Coaching & Development</span> — your trusted partner for personal and professional transformation. We guide individuals and teams toward achieving their highest potential through coaching, training, and career development.
          </p>

          <p>
            We combine human understanding with technology to provide meaningful growth experiences. Whether you’re a student seeking direction, a professional aiming for leadership, or an organization looking to empower your people — we’re here to help you move forward with clarity and confidence.
          </p>

          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Vision</h3>
            <p>
              To build a global community of empowered individuals who take confident steps toward success, purpose, and positive impact.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Mission</h3>
            <p>
              To provide accessible, high-quality coaching and development programs that inspire progress, foster resilience, and transform potential into achievement.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="relative mt-24 text-center z-10">
        <h3 className="text-2xl font-bold text-blue-900 mb-10">
          Why Choose <span className="text-cyan-700">NextStep</span>?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="border-2 border-blue-100 rounded-2xl px-8 py-10 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm cursor-pointer flex flex-col items-center gap-4">
            <ArrowUpIcon className="w-10 h-10 text-blue-600 hover:text-white" />
            <h4 className="text-lg font-semibold mb-2">Purpose-Driven</h4>
            <p className="text-center">Every program aligns actions with goals.</p>
          </div>

          <div className="border-2 border-blue-100 rounded-2xl px-8 py-10 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm cursor-pointer flex flex-col items-center gap-4">
            <UsersIcon className="w-10 h-10 text-blue-600 hover:text-white" />
            <h4 className="text-lg font-semibold mb-2">Human-Centered</h4>
            <p className="text-center">People first: empathy + coaching frameworks.</p>
          </div>

          <div className="border-2 border-blue-100 rounded-2xl px-8 py-10 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm cursor-pointer flex flex-col items-center gap-4">
            <BriefcaseIcon className="w-10 h-10 text-blue-600 hover:text-white" />
            <h4 className="text-lg font-semibold mb-2">Continuous Growth</h4>
            <p className="text-center">Support through every milestone.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

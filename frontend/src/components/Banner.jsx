import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 rounded-2xl px-6 sm:px-12 md:px-16 lg:px-20 my-16 md:mx-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                           radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="flex-1 py-12 sm:py-16 md:py-20 lg:py-24 text-center lg:text-left">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-white text-sm font-medium">Trusted by 10,000+ Professionals</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-6 mb-8 leading-relaxed">
              Get matched with expert career coaches and unlock your full potential with personalized guidance.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-10 mb-8 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-300">Expert Coaches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">4.9/5</div>
                <div className="text-sm text-gray-300">Client Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => {
                  navigate("/login");
                  scrollTo(0, 0);
                }}
                className="bg-white text-blue-900 text-lg font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => {
                  navigate("/coaches");
                  scrollTo(0, 0);
                }}
                className="border-2 border-white text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Browse Coaches
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full border-2 border-blue-900"></div>
                  ))}
                </div>
                <span className="text-sm text-gray-300">Join 10K+ professionals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 relative w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg">
           
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl rotate-12 opacity-90 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-cyan-400 rounded-full opacity-80 animate-float" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
    </div>
  );
}

export default Banner;
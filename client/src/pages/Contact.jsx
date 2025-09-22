import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Warranty from "../components/Warranty";

const Contact = () => {
  return (
    <>
      <div className="relative w-full h-80 mt-[80px] overflow-hidden">
        <img
          src="/shop/shop.jpg"
          alt="Shop Banner"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Contact</h1>
          <div className="flex items-center text-gray-800">
            <Link to={"/"} className="text-xl">
              Home
            </Link>
            <ChevronRight className="w-5 h-5 mx-2" />
            <span className="text-xl font-semibold">Contact</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white p-4 sm:p-8 flex items-center justify-center font-sans">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Get In Touch With Us
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
              For More Information About Our Product & Services. Please Feel
              Free To Drop Us An Email. Our Staff Always Be There To Help You
              Out. Do Not Hesitate!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Left Section: Contact Info */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.899A2.001 2.001 0 0110.586 20.899L6.343 16.657A8 8 0 1117.657 16.657z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Address
                    </h3>
                    <p className="text-gray-600 text-sm">
                      236 5th SE Avenue, New York NY10000, United States
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Phone
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Mobile: +(84) 546-6789
                    </p>
                    <p className="text-gray-600 text-sm">
                      Hotline: +(84) 456-6789
                    </p>
                  </div>
                </div>

                {/* Working Time */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Working Time
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Monday-Friday: 9:00 - 22:00
                    </p>
                    <p className="text-gray-600 text-sm">
                      Saturday-Sunday: 9:00 - 21:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section: Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <form className="space-y-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-gray-800 font-medium mb-2"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Abc"
                    className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-gray-800 font-medium mb-2"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Abc@def.com"
                    className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="subject"
                    className="text-gray-800 font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="This is an optional"
                    className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className="text-gray-800 font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Hi! I’d like to ask about"
                    rows="4"
                    className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 text-lg text-white bg-[#B88E2F] rounded-lg hover:bg-[#a17e29] transition-colors duration-300 font-medium"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Warranty/>
    </>
  );
};

export default Contact;

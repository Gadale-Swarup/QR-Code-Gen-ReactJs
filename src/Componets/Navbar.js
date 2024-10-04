import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-200 shadow shadow-gray-300 w-full px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* Logo and Title */}
          <div className="text-black-500 md:order-1 flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5371/5371682.png"
              width="60"
              height="56"
              alt="QR code free icon"
              title="QR code free icon"
            />
            <span className="font-bold text-xl">QR Code Generator</span>
          </div>

          {/* Navigation Links */}
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              <li className="md:px-4 md:py-2 text-indigo-500">
                <a href="/">Dashboard</a>
              </li>
              <li className="md:px-4 md:py-2 text-indigo-500">
                <a href="/upload">Upload Excel file</a>
              </li>
              <li className="md:px-4 md:py-2 text-indigo-500">
                <a href="/pdf">Upload Excel file Save in Pdf</a>
              </li>
            </ul>
          </div>

          {/* Login Button */}
          {/* <div className="order-2 md:order-3">
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Login</span>
            </button>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

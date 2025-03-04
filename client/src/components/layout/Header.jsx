import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex justify-between items-center py-4 px-8 shadow-md bg-gray-100">
      <div className="text-2xl font-bold text-red-700">MallSpot</div>
      <ul className="flex space-x-6 text-gray-700">
        <li className="hover:text-red-600 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-red-600 cursor-pointer">
          <Link to="/service">Service</Link>
        </li>
        <li className="hover:text-red-600 cursor-pointer">
          <Link to="/about">About Us</Link>
        </li>
        <li className="hover:text-red-600 cursor-pointer">
          <Link to="/mall">Mall</Link>
        </li>
        <li className="hover:text-red-600 cursor-pointer">
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
      <div className="flex space-x-4">
        <Link to="/login" className="text-red-700 hover:underline pt-2">
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default Header;

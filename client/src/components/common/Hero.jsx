import React from "react";
import img from "../../assets/images/mall.png";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };
  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left py-20 px-8 font-serif">
        <div className="lg:w-1/2  ml-8 space-y-4">
          <h1 className="text-4xl font-semibold text-gray-800">
            Your Gateway to Efficient
          </h1>
          <h1 className="text-4xl font-semibold">
            <span className="text-red-700">Mall Rental promotion</span> and
          </h1>
          <h1 className="text-4xl font-semibold">
            <span className="text-red-700"> Management</span>
          </h1>
          <button
            onClick={handleClick}
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
          >
            get started
          </button>
        </div>
        <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0 ">
          <img
            src={img} // Replace with actual image URL
            alt="Mall Illustration"
            className="max-w-sm"
          />
        </div>
      </section>
    </>
  );
}

export default Hero;

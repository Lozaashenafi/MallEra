import React from "react";
import img from "../../assets/images/mall2.png";

function AboutUs() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center py-12 bg-white max-w-5xl mx-auto">
        <div className="md:w-1/2 flex justify-center">
          <img src={img} alt="Building" className="w-80 h-auto" />
        </div>
        <div className="md:w-1/2 text-center md:text-left px-6">
          <h2 className="text-2xl font-semibold text-red-600 ">
            Who We Are and What We Do
          </h2>
          <p className="text-text mt-4">
            At MallSpot, we are dedicated to revolutionizing the way malls are
            managed and experienced. Our platform bridges the gap between mall
            owners, tenants, and users, offering tools for seamless management,
            engagement, and opportunities.
          </p>
        </div>
      </section>
    </>
  );
}

export default AboutUs;

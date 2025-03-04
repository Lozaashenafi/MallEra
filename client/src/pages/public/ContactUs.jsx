import React from "react";

function ContactUs() {
  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-2xl justify-between mx-auto bg-white shadow-lg rounded-lg  lg:flex-row">
          <div className="p-8 ">
            <h2 className="text-3xl text-red-600 font-bold text-center text-primaryBlue">
              Contact Us
            </h2>
            <p className=" text-center mt-2 text-lg ">
              Any question or remarks? Just write us a message!
            </p>
            <form className="mt-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="w-full border-b border-gray-300 focus:border-primaryBlue focus:outline-none p-2"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="w-full border-b border-gray-300 focus:border-primaryBlue focus:outline-none p-2"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full border-b border-gray-300 focus:border-primaryBlue focus:outline-none p-2"
                  placeholder="you@example.com"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="w-full border-b border-gray-300 focus:border-primaryBlue focus:outline-none p-2"
                  placeholder="+1 012 3456 789"
                />
              </div>

              <div className="mt-6">
                <label className="block text-gray-700">Message</label>
                <textarea
                  className="w-full border-b border-gray-300 focus:border-primaryBlue focus:outline-none p-2 h-24"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="bg-primaryBlue text-white bg-red-600 px-6 py-3 rounded-lg hover:bg-red-900 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;

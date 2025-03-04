import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-red-600">
            Create an Account
          </h2>
          <p className="text-sm text-center text-gray-500 mt-2">
            Sign up to get started!
          </p>

          <form className="mt-6">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-primaryBlue focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-primaryBlue focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-primaryBlue focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-primaryBlue focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primaryBlue text-white py-3 bg-red-600 rounded-lg mt-6 hover:bg-red-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?
            <Link to="/login" className="text-red-600 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default SignUp;

import React from "react";
import { Link } from "react-router-dom";

function LogIn() {
  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-red-600">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-500 mt-2">
            Log in to continue
          </p>

          <form className="mt-6">
            <div>
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

            <div className="mt-4 text-right">
              <Link to="#" className="text-red-600 text-sm">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 transition"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?
            <Link to="/signup" className="text-red-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default LogIn;

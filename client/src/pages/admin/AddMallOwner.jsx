import React from "react";

function AddMallOwner() {
  return (
    <section className="mt-6">
      <h1 className="text-2xl font-bold text-gray-800">Add Mall Owner</h1>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="+1 234 567 890"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Empty Space for Alignment */}
          <div className="hidden md:block"></div>

          {/* Submit Button - Spanning Two Columns */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Add Mall Owner
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddMallOwner;

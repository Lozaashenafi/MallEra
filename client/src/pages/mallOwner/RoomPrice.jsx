import React from "react";

function RoomPrice() {
  return (
    <div className="flex gap-6 mt-4 justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-md w-1/2 border border-gray-300">
        <h2 className="text-lg text-black mb-4">Current Price Per Care</h2>
        <div className="text-3xl font-bold text-black">600 etb</div>
        <p className="text-gray-600">Current Price</p>

        <label className="block text-cyan-600 mt-4">Floor Number</label>
        <input
          type="text"
          placeholder="floor"
          className="w-full bg-gray-200 text-black p-2 mt-1 rounded focus:outline-none border border-gray-300"
        />

        <label className="block text-cyan-600 mt-4">New Price</label>
        <input
          type="text"
          defaultValue="600"
          className="w-full bg-gray-200 text-black p-2 mt-1 rounded focus:outline-none border border-gray-300"
        />

        <button className="w-full bg-cyan-600 text-white py-2 rounded mt-4 hover:bg-cyan-700">
          Save Change
        </button>
      </div>

      {/* Add Room Price */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-1/2 border border-gray-300">
        <h2 className="text-lg text-black mb-4">Add Room Price</h2>

        <label className="block text-cyan-600">Room Number</label>
        <input
          type="number"
          className="w-full bg-gray-200 text-black p-2 mt-1 rounded focus:outline-none border border-gray-300"
        />

        <label className="block text-cyan-600 mt-4">Price</label>
        <input
          type="text"
          placeholder="Price"
          className="w-full bg-gray-200 text-black p-2 mt-1 rounded focus:outline-none border border-gray-300"
        />
        <button className="w-full bg-cyan-600 text-white py-2 rounded mt-4 hover:bg-cyan-700">
          Submit
        </button>
      </div>
    </div>
  );
}

export default RoomPrice;

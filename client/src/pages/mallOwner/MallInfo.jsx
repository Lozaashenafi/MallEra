import React, { useState } from "react";

function MallInfo() {
  const [basementCount, setBasementCount] = useState(0);
  const [floorCount, setFloorCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [agreementFile, setAgreementFile] = useState(null);

  const handleFileChange = (event) => {
    setAgreementFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ basementCount, floorCount, roomCount, agreementFile });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Mall Information</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Number of Basements:</label>
          <input
            type="number"
            value={basementCount}
            onChange={(e) => setBasementCount(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-900"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Number of Floors:</label>
          <input
            type="number"
            value={floorCount}
            onChange={(e) => setFloorCount(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            min="1"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Number of Rooms:</label>
          <input
            type="number"
            value={roomCount}
            onChange={(e) => setRoomCount(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            min="1"
            required
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label className="font-semibold mb-1">Upload Agreement:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            accept=".pdf,.doc,.docx"
            required
          />
        </div>

        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-cyan-700 text-white px-6 py-3 rounded-lg hover:bg-cyan-900 font-semibold transition"
          >
            Save Information
          </button>
        </div>
      </form>
    </div>
  );
}

export default MallInfo;

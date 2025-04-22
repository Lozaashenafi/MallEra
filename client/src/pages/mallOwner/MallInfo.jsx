import React, { useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_API_URL;
import { useAuth } from "../../context/AuthContext";
import { getMallDetail, mallInfo } from "../../api/mall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MallInfo() {
  const [basementCount, setBasementCount] = useState(0);
  const [floorCount, setFloorCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [pricePerCare, setPricePerCare] = useState(0);

  const [agreementFile, setAgreementFile] = useState(null);
  const { userData } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [mall, setMall] = useState(null);

  useEffect(() => {
    const fetchMallDetails = async () => {
      try {
        const data = await getMallDetail(userData.mallId);
        if (data.success && data.mall) {
          setMall(data.mall);
          console.log("Mall details:", data.mall.rentalAgreements?.[0]);
          if (data.mall.rentalAgreements?.length > 0 && !submitted) {
            setSubmitted(true);
          }
        } else {
          console.error("Mall data is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching mall details:", error.message);
      }
    };
    fetchMallDetails();
  }, [userData.mallId]);

  console.log("Mall data:", submitted, mall);

  const handleFileChange = (event) => {
    setAgreementFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("mallId", userData.mallId);
    formData.append("basementCount", basementCount);
    formData.append("floorCount", floorCount);
    formData.append("roomCount", roomCount);
    formData.append("pricePerCare", pricePerCare);
    formData.append("agreementFile", agreementFile);

    try {
      const data = await mallInfo(formData);
      toast.success(data.message || "Mall Information saved successfully!");

      // Reset input fields after successful submission
      setBasementCount(0);
      setFloorCount(0);
      setRoomCount(0);
      setAgreementFile(null);
      document.getElementById("agreementFileInput").value = ""; // Reset file input manually
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Failed to save mall information."
      );
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-8">
      {submitted ? (
        <div>
          <h1 className="text-4xl font-extrabold text-cyan-900 mb-4">
            {mall.mallName}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {mall.description}
          </p>
          <div className="mt-4 text-gray-600 space-y-2">
            <p>
              <strong>📍 Location:</strong> {mall.address}
            </p>
            <p>
              <strong>🏢 Floors:</strong> {mall.totalFloors} |{" "}
              <strong>🚪 Rooms:</strong> {mall.totalRooms}
            </p>
            <p>
              <strong>💰 Price Per Care:</strong> $
              {mall.pricePerCare.toFixed(2)}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Mall Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mall.mallImage.map((image) => (
                <img
                  key={image.id}
                  src={`${backendURL}${image.imageURL}`}
                  alt="Mall Image"
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Rental Agreements</h2>
            <ul className="space-y-2">
              {mall.agreements.map((agreement) => (
                <li key={agreement.id}>
                  <a
                    href={`${backendURL}${agreement.agreementFile}`}
                    className="text-blue-600 underline hover:text-blue-800 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      toast.info(`Downloading Agreement ${agreement.id}...`)
                    }
                  >
                    📄 Download Agreement {agreement.id}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <ToastContainer position="top-right" autoClose={3000} />
          <h2 className="text-3xl font-bold text-center mb-6 text-cyan-900">
            Mall Information
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Number of Basements:</label>
              <input
                type="number"
                value={basementCount}
                onChange={(e) => setBasementCount(Number(e.target.value))}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-cyan-700"
                min="0"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2">Number of Floors:</label>
              <input
                type="number"
                value={floorCount}
                onChange={(e) => setFloorCount(Number(e.target.value))}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-cyan-700"
                min="1"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2">Number of Rooms:</label>
              <input
                type="number"
                value={roomCount}
                onChange={(e) => setRoomCount(Number(e.target.value))}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-cyan-700"
                min="1"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2">Price Per Care:</label>
              <input
                type="number"
                value={pricePerCare}
                onChange={(e) => setPricePerCare(Number(e.target.value))}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-cyan-700"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-2">Upload Agreement:</label>
              <input
                id="agreementFileInput"
                type="file"
                onChange={handleFileChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-cyan-700"
                accept=".pdf,.doc,.docx,.txt"
                required
              />
            </div>

            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-cyan-700 text-white px-8 py-3 rounded-lg hover:bg-cyan-900 font-semibold transition-all shadow-md hover:shadow-lg"
              >
                💾 Save Information
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default MallInfo;

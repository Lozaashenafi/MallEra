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
      toast.error(error.message || "Failed to save mall information.");
    }
  };
  return (
    <div>
      {submitted ? (
        // Display mall details when submitted is true
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
          <h1 className="text-3xl font-bold mb-4 text-cyan-900">
            {mall.mallName}
          </h1>
          <p className="text-gray-700">{mall.description}</p>
          <p className="mt-2 text-gray-600">
            <strong>Location:</strong> {mall.address}
          </p>
          <p className="mt-1 text-gray-600">
            <strong>Floors:</strong> {mall.totalFloors} |{" "}
            <strong>Rooms:</strong> {mall.totalRooms}
          </p>
          <p className="mt-1 text-gray-600">
            <strong>Price Per Care:</strong> ${mall.pricePerCare.toFixed(2)}
          </p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Images</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {mall.mallImage.map((image) => (
                <img
                  key={image.id}
                  src={`${backendURL}${image.imageURL}`}
                  alt="Mall Image"
                  className="w-full h-40 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Rental Agreements</h2>
            <ul className="mt-2">
              {mall.agreements.map((agreement) => (
                <li key={agreement.id} className="mt-1">
                  <a
                    href={`${backendURL}${agreement.agreementFile}`}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      toast.info(`Downloading Agreement ${agreement.id}...`)
                    }
                  >
                    Download Agreement {agreement.id}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-3xl font-bold mb-6 text-center">
              Mall Information
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  Number of Basements:
                </label>
                <input
                  type="number"
                  value={basementCount}
                  onChange={(e) => setBasementCount(Number(e.target.value))}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-900"
                  min="0"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Number of Floors:</label>
                <input
                  type="number"
                  value={floorCount}
                  onChange={(e) => setFloorCount(Number(e.target.value))}
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
                  onChange={(e) => setRoomCount(Number(e.target.value))}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                  min="1"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Price Per Care:</label>
                <input
                  type="number"
                  value={pricePerCare}
                  onChange={(e) => setPricePerCare(Number(e.target.value))}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label className="font-semibold mb-1">Upload Agreement:</label>
                <input
                  id="agreementFileInput"
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
        </>
      )}
    </div>
  );
}
export default MallInfo;

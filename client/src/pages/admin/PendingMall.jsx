import React, { useEffect, useState } from "react";
import { approveMall, pendingMall, deleteMall } from "../../api/mall"; // Make sure declineMall exists in your API
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendURL = import.meta.env.VITE_API_URL;

function PendingMall() {
  const [malls, setMalls] = useState([]);

  const handleApprove = async (mallId) => {
    try {
      const response = await approveMall(mallId);
      if (response.success) {
        setMalls((prevMalls) => prevMalls.filter((mall) => mall.id !== mallId));
        toast.success("Mall approved and confirmation email sent!");
      } else {
        toast.error("Failed to approve mall: " + response.message);
      }
    } catch (error) {
      toast.error("Error approving mall: " + error.message);
    }
  };

  const handleDecline = async (mallId) => {
    const confirmed = window.confirm(
      "Are you sure you want to decline this mall?"
    );
    if (!confirmed) return;
    try {
      const response = await deleteMall(mallId);
      console.log("Response from declineMall:", response);
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.success === true
      ) {
        setMalls((prevMalls) => prevMalls.filter((mall) => mall.id !== mallId));
        toast.success("Mall declined successfully.");
      } else {
        toast.error("Failed to decline mall: " + response.message);
      }
    } catch (error) {
      toast.error("Error declining mall: " + error.message);
    }
  };

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const data = await pendingMall();
        if (data.success) {
          setMalls(data.data); // Ensure API returns `data` array
        }
      } catch (error) {
        console.error("Error fetching malls:", error.message);
      }
    };
    fetchMalls();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Pending Mall Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {malls.map((mall) => (
          <div
            key={mall.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src={
                  mall.mallImage[0]?.imageURL
                    ? `${backendURL}${mall.mallImage[0]?.imageURL}`
                    : "https://via.placeholder.com/400"
                }
                alt={mall.mallName}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{mall.mallName}</h2>
              <p className="text-sm text-gray-600">{mall.address}</p>
              <p className="text-sm">Floors: {mall.totalFloors}</p>
              <p className="text-sm">Rooms: {mall.totalRooms}</p>
              <div className="flex space-x-2 overflow-x-auto">
                {mall.mallImage.slice(1).map((img) => (
                  <img
                    key={img.id}
                    src={`${backendURL}${img.imageURL}`}
                    alt="Mall"
                    className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                  />
                ))}
              </div>

              {/* Mall Owner Info */}
              <div className="mt-4 p-2 bg-gray-50 rounded-md text-sm border">
                <p>
                  <span className="font-semibold">Owner:</span>{" "}
                  {mall.owner?.fullName?.trim() || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {mall.owner?.email || "N/A"}
                </p>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleApprove(mall.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm shadow"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(mall.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm shadow"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingMall;

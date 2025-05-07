const backendURL = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { disableMall, getMallById } from "../../api/mall";
import { toast, ToastContainer } from "react-toastify";

export default function MallDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mall, setMall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchMallDetails = async () => {
      try {
        const data = await getMallById(id);
        if (data.success) {
          setMall(data.mall);
        }
      } catch (error) {
        console.error("Error fetching mall details:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMallDetails();
  }, [id]);

  const handleDisable = async () => {
    try {
      const result = await disableMall(id);
      if (!result.status === 200) {
        toast("Mall disabled successfully.");
      } else {
        toast.error("Failed to disable the mall.");
      }
    } catch (error) {
      toast("An error occurred while disabling the mall.");
    } finally {
      setShowConfirm(false);
    }
  };
  if (loading) {
    return <p className="text-center text-gray-500">Loading mall details...</p>;
  }

  if (!mall) {
    return <p className="text-center text-gray-500">Mall not found.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <ToastContainer />
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <img
            src={`${backendURL}${mall.images?.[0]}`}
            alt="Mall Profile"
            className="w-16 h-16 rounded-full object-cover shadow-md"
          />

          <h1 className="text-3xl font-bold text-gray-800">{mall.mallName}</h1>
        </div>
        <p className="text-gray-600 mt-2">📍 {mall.address}</p>
        <p className="text-gray-700 mt-4 leading-relaxed">{mall.description}</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {mall.images?.length > 0 ? (
            mall.images.map((img, index) => (
              <img
                key={index}
                src={`${backendURL}${img}`}
                alt={`Mall Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-md shadow-md"
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No images available.</p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Total Floors:</span>{" "}
            {mall.totalFloors}
          </p>
          <p>
            <span className="font-semibold">Total Rooms:</span>{" "}
            {mall.totalRooms}
          </p>
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate(`/admin/malls/update/${id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Mall
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Disable Mall
          </button>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-neutral-300 p-6 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">
                Are you sure you want to disable this mall?
              </p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDisable}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

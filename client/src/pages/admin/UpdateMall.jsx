import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMallDetails } from "../../api/mall";

export default function UpdateMall() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mall, setMall] = useState({
    mallName: "",
    description: "",
    totalFloors: "",
    totalRooms: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMall = async () => {
      try {
        const data = await getMallDetails(id);
        if (data.success) {
          setMall({
            mallName: data.mall.mallName,
            description: data.mall.description,
            totalFloors: data.mall.totalFloors,
            totalRooms: data.mall.totalRooms,
            images: data.mall.images,
          });
        }
      } catch (error) {
        console.error("Error fetching mall details:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMall();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMall((prevMall) => ({ ...prevMall, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Mall Data:", mall);
    // Implement API call to update mall
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading mall details...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold">Update Mall</h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block font-semibold">Mall Name</label>
            <input
              type="text"
              name="mallName"
              value={mall.mallName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={mall.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Total Floors</label>
              <input
                type="number"
                name="totalFloors"
                value={mall.totalFloors}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold">Total Rooms</label>
              <input
                type="number"
                name="totalRooms"
                value={mall.totalRooms}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold">Images</label>
            <input type="file" multiple className="w-full p-2 border rounded" />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update Mall
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

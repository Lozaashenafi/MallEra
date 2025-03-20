import React, { useEffect, useState } from "react";
import { getMallFloors, getRooms, updateRoomPrice } from "../../api/room";
import { updatePricePerCare } from "../../api/mall";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import PricePerCareList from "../../components/mallOwner/PricePerCareList";
function RoomPrice() {
  const [floors, setFloors] = useState([]);
  const { userData } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [currentPrice, setCurrentPrice] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        if (!userData?.mallId) return;
        const data1 = await getMallFloors(userData.mallId);
        setFloors(data1);
        const response = await getRooms(userData.mallId);
        // console.log("Fetched rooms:", response);
        setRooms(response || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchData();
  }, [userData.mallId]);

  const handleUpdatePricePerCare = async () => {
    if (!selectedFloor || !newPrice) {
      toast.error("Please select a floor and enter a price.");
      return;
    }
    try {
      const response = await updatePricePerCare({
        floorId: selectedFloor,
        price: parseFloat(newPrice),
        mallId: userData.mallId,
      });
      toast.success(response.message || "Price updated successfully!");
      setCurrentPrice(newPrice); // Update UI after successful update
    } catch (error) {
      console.error("Error updating price:", error);
      toast.error("Failed to update price.");
    }
  };
  const handleUpdatePrice = async () => {
    if (!selectedRoom || !newPrice) {
      toast.error("Please select a room and enter a price.");
      return;
    }
    try {
      const response = await updateRoomPrice({
        roomId: selectedRoom,
        price: newPrice,
      });
      toast.success(response.message || "Price updated successfully!");
    } catch (error) {
      console.error("Error updating price:", error);
      toast.error("Failed to update price.");
    }
  };
  return (
    <>
      <div className="flex gap-6 mt-4 justify-center items-center">
        <div className="bg-white p-6 rounded-2xl shadow-md w-1/2 border border-gray-300">
          <h2 className="text-lg text-black mb-4">
            add or update Price Per Care
          </h2>

          <label className="block text-cyan-600 mt-4">Floor Number</label>
          <div>
            <select
              name="floorId"
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            >
              <option value="">Select Floor</option>
              {floors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.description}
                </option>
              ))}
            </select>
          </div>

          <label className="block text-cyan-600 mt-4">New Price</label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="w-full bg-gray-200 text-black p-2 mt-1 rounded focus:outline-none border border-gray-300"
          />

          <button
            onClick={handleUpdatePricePerCare}
            className="w-full bg-cyan-600 text-white py-2 rounded mt-4 hover:bg-cyan-700 "
            disabled={loading}
          >
            Save Change
          </button>
        </div>
        {/* Add Room Price */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-1/2 border border-gray-300">
          <h2 className="text-lg text-black mb-4">Update Room Price</h2>

          <label className="block text-cyan-600">Room Number</label>
          <div>
            <select
              name="roomId"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.roomNumber} - {room.floor?.description}
                </option>
              ))}
            </select>
          </div>

          <label className="block text-cyan-600 mt-4">New Price</label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="w-full bg-gray-200 text-black p-2 mt-1 rounded focus:outline-none border border-gray-300"
            placeholder="Enter new price"
          />

          <button
            onClick={handleUpdatePrice}
            className="w-full bg-cyan-600 text-white py-2 rounded mt-4 hover:bg-cyan-700 disabled:bg-gray-400"
          >
            Submit
          </button>
        </div>
      </div>
      <PricePerCareList />
    </>
  );
}

export default RoomPrice;

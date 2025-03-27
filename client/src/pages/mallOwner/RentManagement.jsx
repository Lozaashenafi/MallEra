import { useEffect, useState } from "react";
import { getTenants } from "../../api/tenant";
import { getAvailableRooms } from "../../api/room";
import { useAuth } from "../../context/AuthContext";
import { assignRent, getRents } from "../../api/rent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RentList from "../../components/mallOwner/RentList";

const RentManagement = () => {
  const { userData } = useAuth();
  const mallId = userData.mallId;
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [rents, setRents] = useState([]);
  const [formData, setFormData] = useState({
    tenantId: "",
    roomId: "",
    amount: "",
    paymentDuration: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenantsData = await getTenants(mallId);
        console.log("Tenants Data:", tenantsData); // Debugging
        setTenants(
          Array.isArray(tenantsData.tenants) ? tenantsData.tenants : []
        );

        const roomsResponse = await getAvailableRooms(mallId);
        console.log("Rooms Data:", roomsResponse);
        setRooms(Array.isArray(roomsResponse) ? roomsResponse : []);

        const rentsData = await getRents(mallId); // Fetch rents data
        console.log("Rents Data:", rentsData); // Debugging
        setRents(Array.isArray(rentsData) ? rentsData : []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mallId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Rent Data:", formData);
      const response = await assignRent(formData);
      console.log("Rent assigned response:", response);

      toast.success("Rent successfully assigned!");

      setFormData({
        tenantId: "",
        roomId: "",
        amount: "",
        paymentDuration: "",
      });

      // Optionally re-fetch rents after successful assignment
      const rentsData = await getRents(mallId);
      setRents(Array.isArray(rentsData.rents) ? rentsData.rents : []);
    } catch (err) {
      console.error("Error in rent assignment:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to assign rent.");
    }
  };

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <div
        className="p-6   max-w-5xl gap-10 mt-4 mx-auto  shadow-md rounded-lg
      justify-center items-center bg-white "
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Rent Management
        </h2>
        <ToastContainer />
        <div className="bg-white  p-6 w-full ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Assign Rent
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Tenant Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Tenant
              </label>
              <select
                name="tenantId"
                value={formData.tenantId}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                required
              >
                <option value="">-- Select Tenant --</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.fullName} ({tenant.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Room Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Room
              </label>
              <select
                name="roomId"
                value={formData.roomId}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                required
              >
                <option value="">-- Select Room --</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    Room {room.roomNumber}
                  </option>
                ))}
              </select>
            </div>

            {/* Rent Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rent Amount ($)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            {/* Payment Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Duration (Months)
              </label>
              <input
                type="number"
                name="paymentDuration"
                value={formData.paymentDuration}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-1xl bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition"
              >
                Assign Rent
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Rents List */}
      <RentList />
    </>
  );
};

export default RentManagement;

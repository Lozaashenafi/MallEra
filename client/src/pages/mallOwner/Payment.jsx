import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { createPayment, getPayments } from "../../api/payment";
import { getRents } from "../../api/rent";

export default function Payment() {
  const [rents, setRents] = useState([]);
  const [rentId, setRentId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const { userData } = useAuth();

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = async () => {
    try {
      const response = await getRents(userData.mallId);
      setRents(response);
    } catch (error) {
      console.error("Error fetching rents:", error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!rentId || !amount || !paymentDate) {
      toast.error("All fields are required");
      return;
    }
    try {
      await createPayment({ rentId, amount, paymentDate });
      toast.success("Payment successful");
      setRentId("");
      setAmount("");
      setPaymentDate("");
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-6 shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Make a Payment
        </h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Rent</label>
            <select
              className="w-full p-2 border rounded bg-gray-100"
              value={rentId}
              onChange={(e) => setRentId(e.target.value)}
              required
            >
              <option value="">Select Rent</option>
              {rents.map((rent) => (
                <option key={rent.id} value={rent.id}>
                  {`Tenant: ${rent.user.fullName} - Room ${rent.room.roomNumber}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Amount</label>
            <input
              type="number"
              className="w-full p-2 border rounded bg-gray-100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Payment Date
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded bg-gray-100"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
}

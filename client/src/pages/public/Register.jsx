import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Camera } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { registerMallByItself } from "../../api/mall"; // Adjusted API call
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const backendURL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [mall, setMall] = useState({
    mallName: "",
    latitude: 9.145,
    longitude: 40.4897,
    address: "",
    description: "",
    totalFloors: "",
    totalRooms: "",
    mainImage: null,
    secondaryImage: null,
    tertiaryImage: null,
    invoice: null,
    userFullName: "",
    userEmail: "",
    userUsername: "",
    userPassword: "",
    userRole: "MALL_OWNER", // Default role
  });

  const handleChange = (e) => {
    setMall({ ...mall, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setMall({ ...mall, [name]: files[0] });
    }
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
        );
        const results = await res.json();
        if (results.length > 0) {
          const { lat, lon, display_name } = results[0];
          setMall((prev) => ({
            ...prev,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            address: display_name,
          }));
        }
      } catch (err) {
        console.error("Location search error:", err);
      }
    }
  };

  const handleLocationSelect = async ({ lat, lng }) => {
    setMall((prev) => ({ ...prev, latitude: lat, longitude: lng }));
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    setMall((prev) => ({ ...prev, address: data.display_name }));
  };

  const LocationPicker = ({ onLocationSelect }) => {
    useMapEvents({
      click(e) {
        onLocationSelect(e.latlng);
      },
    });
    return mall.latitude && mall.longitude ? (
      <Marker position={[mall.latitude, mall.longitude]} />
    ) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mall.userPassword !== mall.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const formData = new FormData();
    Object.entries(mall).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const result = await registerMallByItself(formData);
      console.log(result);

      if (result?.success) {
        toast.success(result.message || "Mall registered successfully!");
        setStep(6); // Move to the final step
        setMall({
          mallName: "",
          latitude: 9.145,
          longitude: 40.4897,
          address: "",
          description: "",
          totalFloors: "",
          totalRooms: "",
          mainImage: null,
          secondaryImage: null,
          tertiaryImage: null,
          invoice: null,
          userFullName: "",
          userEmail: "",
          userUsername: "",
          userPassword: "",
        });
      } else {
        toast.error(result?.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(error.message || "Registration error.");
    }
  };

  return (
    <div className=" w-full bg-gray-100 flex items-center justify-center p-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 overflow-y-auto"
      >
        <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
          Register Mall
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["mallName", "totalFloors", "totalRooms"].map((name) => (
              <div key={name}>
                <label className="font-medium text-gray-700">
                  {name.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={name.includes("total") ? "number" : "text"}
                  name={name}
                  className="w-full mt-1 p-2 border rounded"
                  value={mall[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={3}
                className="w-full mt-1 p-2 border rounded"
                value={mall.description}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="grid grid-cols-1 gap-4">
            <label className="font-medium text-gray-700">Upload Images</label>
            <div className="flex gap-4">
              {["mainImage", "secondaryImage", "tertiaryImage"].map((name) => (
                <div
                  key={name}
                  className="w-24 h-24 border-2 border-dashed relative rounded overflow-hidden"
                >
                  <input
                    type="file"
                    name={name}
                    accept="image/*"
                    className="hidden"
                    id={name}
                    onChange={handleImageChange}
                  />
                  {mall[name] && (
                    <img
                      src={URL.createObjectURL(mall[name])}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                  )}
                  <label
                    htmlFor={name}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full cursor-pointer shadow"
                  >
                    <Camera className="text-gray-500 w-5 h-5" />
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="flex flex-col space-y-4">
              {/* Search Location */}
              <div>
                <label className="font-semibold text-gray-700 mb-2">
                  Search Location
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search and press Enter"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                />
              </div>

              {/* Selected Address */}
              <div>
                <label className="font-semibold text-gray-700 mb-2">
                  Selected Address
                </label>
                <input
                  type="text"
                  value={mall.address}
                  readOnly
                  className="w-full p-3 border rounded-md bg-gray-100 text-gray-700"
                />
              </div>
              <div className="md:col-span-2 flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="flex flex-col space-y-4">
              <label className="font-semibold text-gray-700">
                Select on Map
              </label>
              <MapContainer
                center={[mall.latitude, mall.longitude]}
                zoom={6}
                style={{ height: "300px", width: "100%" }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker onLocationSelect={handleLocationSelect} />
              </MapContainer>
            </div>
          </div>
        )}

        {/* STEP 4 - Invoice Upload */}
        {step === 4 && (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="font-medium text-gray-700">Amount to Pay</label>
              <div className=" mt-1 p-2   bg-gray-100 font-semibold">
                1000 per year
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700 mb-2 block">
                Upload Invoice
              </label>
              <div className="w-32 h-32 border-2 border-dashed relative rounded overflow-hidden">
                <input
                  type="file"
                  name="invoice"
                  accept="image/*"
                  id="invoice"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {mall.invoice && (
                  <img
                    src={URL.createObjectURL(mall.invoice)}
                    alt="Invoice Preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <label
                  htmlFor="invoice"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full cursor-pointer shadow"
                >
                  <Camera className="text-gray-500 w-5 h-5" />
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 - Mall Owner Info */}
        {step === 5 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">
                Mall Owner Full Name
              </label>
              <input
                type="text"
                name="userFullName"
                value={mall.userFullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">
                Mall Owner Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={mall.userEmail}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">
                Mall Owner Password
              </label>
              <input
                type="password"
                name="userPassword"
                value={mall.userPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                required
              />
            </div>
            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={mall.confirmPassword || ""}
                onChange={(e) =>
                  setMall({ ...mall, confirmPassword: e.target.value })
                }
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                required
              />
            </div>
            {/* Buttons */}
            <div className="md:col-span-2 flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 - Completion */}
        {step === 6 && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Your mall registration was successful!
            </h2>
            <p className="mt-4">
              You will be notified by email once your account is activated.
            </p>
            <div className="mt-6">
              <Link
                type="button"
                to={"/"}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

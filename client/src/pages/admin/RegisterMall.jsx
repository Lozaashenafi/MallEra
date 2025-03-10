import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Camera } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { registerMall } from "../../api/mall";
import { toast } from "react-toastify"; // Import toast

export default function RegisterMall() {
  const [mall, setMall] = useState({
    mallName: "",
    latitude: "",
    longitude: "",
    address: "",
    description: "",
    totalFloors: "",
    totalRooms: "",
    mainImage: null,
    secondaryImage: null,
    tertiaryImage: null,
  });

  const handleChange = (e) => {
    setMall({ ...mall, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setMall({ ...mall, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form data including images
    Object.keys(mall).forEach((key) => {
      if (
        key === "mainImage" ||
        key === "secondaryImage" ||
        key === "tertiaryImage"
      ) {
        if (mall[key]) formData.append(key, mall[key]);
      } else {
        formData.append(key, mall[key]);
      }
    });

    try {
      const result = await registerMall(formData);
      if (result.success) {
        toast.success("Mall registered successfully!"); // Toast on success
      }
    } catch (error) {
      console.error("Error during mall registration:", error);
      toast.error(error.message || "Mall registration failed!"); // Toast on error
    }
  };

  const handleLocationSelect = async ({ lat, lng }) => {
    setMall((prev) => ({ ...prev, latitude: lat, longitude: lng }));

    // Reverse Geocoding to get address
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    setMall((prev) => ({ ...prev, address: data.display_name }));
  };

  const LocationPicker = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);

    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng);
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
          Register New Mall
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
          {[
            { label: "Mall Name", name: "mallName" },
            { label: "Total Floors", name: "totalFloors", type: "number" },
            { label: "Total Rooms", name: "totalRooms", type: "number" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                placeholder={label}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              rows="3"
              placeholder="Description"
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mt-5">
              Upload Image
            </label>
            {/* Image Upload */}
            <div className="flex justify-center gap-4 mb-4">
              <div className="w-24 h-24 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                <label htmlFor="mainImage" className="cursor-pointer">
                  {!mall.mainImage && (
                    <Camera className="text-gray-400 w-10 h-10" />
                  )}
                  <input
                    type="file"
                    name="mainImage"
                    id="mainImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {mall.mainImage && (
                  <img
                    src={URL.createObjectURL(mall.mainImage)}
                    alt="Main Image Preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="w-24 h-24 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                <label htmlFor="secondaryImage" className="cursor-pointer">
                  {!mall.secondaryImage && (
                    <Camera className="text-gray-400 w-10 h-10" />
                  )}
                  <input
                    type="file"
                    name="secondaryImage"
                    id="secondaryImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {mall.secondaryImage && (
                  <img
                    src={URL.createObjectURL(mall.secondaryImage)}
                    alt="Secondary Image Preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="w-24 h-24 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                <label htmlFor="tertiaryImage" className="cursor-pointer">
                  {!mall.tertiaryImage && (
                    <Camera className="text-gray-400 w-10 h-10" />
                  )}
                  <input
                    type="file"
                    name="tertiaryImage"
                    id="tertiaryImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {mall.tertiaryImage && (
                  <img
                    src={URL.createObjectURL(mall.tertiaryImage)}
                    alt="Tertiary Image Preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">
              Select Mall Location
            </label>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationPicker onLocationSelect={handleLocationSelect} />
              {mall.latitude && mall.longitude && (
                <Marker position={[mall.latitude, mall.longitude]} />
              )}
            </MapContainer>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">
              Selected Location
            </label>
            <input
              type="text"
              name="address"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              value={mall.address}
              readOnly
            />
          </div>

          <div className="col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Register Mall
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

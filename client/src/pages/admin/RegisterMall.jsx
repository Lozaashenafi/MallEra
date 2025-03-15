import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Camera } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { registerMall } from "../../api/mall";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterMall() {
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
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
        );
        const results = await response.json();
        if (results.length > 0) {
          const { lat, lon, display_name } = results[0];

          // Update mall state with the new location and address
          setMall((prev) => ({
            ...prev,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            address: display_name,
          }));
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(mall).forEach((key) => {
      if (["mainImage", "secondaryImage", "tertiaryImage"].includes(key)) {
        if (mall[key]) formData.append(key, mall[key]);
      } else {
        formData.append(key, mall[key]);
      }
    });

    try {
      const result = await registerMall(formData);
      if (result?.success) {
        toast.success(result.message || "Mall registered successfully!");
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
        });
      } else {
        console.error("Mall registration failed!");
        toast.error("Mall registration failed!");
      }
    } catch (error) {
      console.error(error.message || "Mall registration failed!");
    }
  };

  const handleLocationSelect = async ({ lat, lng }) => {
    setMall((prev) => ({ ...prev, latitude: lat, longitude: lng }));

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
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

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
        <div className="w-full bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
            Register New Mall
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
            {["mallName", "totalFloors", "totalRooms"].map((name) => (
              <div key={name}>
                <label className="block text-gray-700 font-medium">
                  {name.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={name.includes("total") ? "number" : "text"}
                  name={name}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  onChange={handleChange}
                  value={mall[name]}
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
                onChange={handleChange}
                value={mall.description}
              ></textarea>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium">
                Upload Image
              </label>
              <div className="flex gap-4">
                {["mainImage", "secondaryImage", "tertiaryImage"].map(
                  (name) => (
                    <div
                      key={name}
                      className="w-24 h-24 border-2 border-dashed relative overflow-hidden rounded-lg"
                    >
                      <input
                        type="file"
                        name={name}
                        id={name}
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      {mall[name] && (
                        <img
                          src={URL.createObjectURL(mall[name])}
                          alt={`${name} Preview`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <label
                        htmlFor={name}
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white p-1 rounded-full shadow-md cursor-pointer"
                      >
                        <Camera className="text-gray-500 w-6 h-6" />
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium">
                Search Location
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Type a place and press Enter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-medium">
                Select Mall Location
              </label>
              <MapContainer
                center={[mall.latitude, mall.longitude]}
                zoom={6}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker onLocationSelect={handleLocationSelect} />
              </MapContainer>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-medium">
                Selected Location
              </label>
              <input
                type="text"
                name="address"
                className="w-full border border-gray-300 rounded-md p-2"
                value={mall.address}
                readOnly
              />
            </div>
            <div className="col-span-2">
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
    </>
  );
}

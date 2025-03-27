import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Camera } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { getMallById, updateMall } from "../../api/mall";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateMall() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMall = async () => {
      try {
        const data = await getMallById(id);
        if (data.success) {
          setMall({
            mallName: data.mall.mallName,
            latitude: data.mall.latitude,
            longitude: data.mall.longitude,
            address: data.mall.address,
            description: data.mall.description,
            totalFloors: data.mall.totalFloors,
            totalRooms: data.mall.totalRooms,
            mainImage: data.mall.mainImage,
            secondaryImage: data.mall.secondaryImage,
            tertiaryImage: data.mall.tertiaryImage,
          });
        }
      } catch (error) {
        console.error("Error fetching mall details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMall();
  }, [id]);

  const handleChange = (e) => {
    setMall({ ...mall, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setMall({ ...mall, [name]: files[0] });
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

    // Log what is actually being sent to the backend
    console.log("FormData being sent:", [...formData]);

    try {
      const result = await updateMall(id, formData);

      console.log("Backend response:", result); // Log backend response

      if (result?.success) {
        toast.success(result.message || "Mall updated successfully!");
        setTimeout(() => {
          navigate("/admin/malls");
        }, 1000);
      } else {
        console.error("Update failed:", result);
        toast.error(
          error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Mall update failed! Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating mall:", error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Mall update failed! Please try again."
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
        <div className="w-full bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
            Update Mall
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
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
                    Update Images
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
                              src={
                                typeof mall[name] === "string"
                                  ? mall[name]
                                  : URL.createObjectURL(mall[name])
                              }
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
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Update Mall
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

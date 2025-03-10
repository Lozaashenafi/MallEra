import img1 from "../../assets/images/mallDetail1.jpg";
import img2 from "../../assets/images/mallDetail2.jpg";
export default function MallDetail() {
  const mall = {
    mallName: "Sunset Mall",
    location: "123 Main Street, Los Angeles, CA",
    description:
      "A premium shopping destination featuring high-end fashion brands, restaurants, and entertainment options.",
    totalFloors: 5,
    totalRooms: 120,
    mallOwner: "John Doe",
    ownerPhone: "+1 (555) 123-4567",
    mallImage: img1,
    ownerImage: img2,
    rooms: new Array(120).fill(null),
    floors: new Array(5).fill(null),
    images: [img1, img2, img1],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        {/* Mall Profile Image */}
        <div className="flex items-center space-x-4">
          <img
            src={mall.mallImage}
            alt="Mall Profile"
            className="w-16 h-16 rounded-full object-cover shadow-md"
          />
          <h1 className="text-3xl font-bold text-gray-800">{mall.mallName}</h1>
        </div>
        <p className="text-gray-600 mt-2">📍 {mall.location}</p>
        <p className="text-gray-700 mt-4 leading-relaxed">{mall.description}</p>

        {/* Mall Images */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {mall.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Mall Image ${index + 1}`}
              className="w-full h-32 object-cover rounded-md shadow-md"
            />
          ))}
        </div>

        {/* Mall Details */}
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

        {/* Mall Owner Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm flex items-center space-x-4">
          <img
            src={mall.ownerImage}
            alt="Mall Owner"
            className="w-14 h-14 rounded-full object-cover shadow-md"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {mall.mallOwner}
            </p>
            <p className="text-gray-600">📞 {mall.ownerPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

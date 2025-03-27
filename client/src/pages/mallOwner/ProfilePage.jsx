import React, { useState } from "react";
import { FiEdit, FiSave, FiCamera } from "react-icons/fi";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [bio, setBio] = useState("Web Developer | React Enthusiast");
  const [image, setImage] = useState("https://via.placeholder.com/150");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10 text-center">
      <div className="relative w-32 h-32 mx-auto">
        <img
          src={image}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-4 border-gray-300"
        />
        {isEditing && (
          <label className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer">
            <FiCamera />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        ) : (
          name
        )}
      </h2>

      <p className="text-gray-600">
        {isEditing ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        ) : (
          email
        )}
      </p>

      <p className="text-gray-500 mt-3">
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border p-2 rounded-lg w-full"
          ></textarea>
        ) : (
          bio
        )}
      </p>

      <button
        className="mt-4 bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? (
          <FiSave className="inline mr-2" />
        ) : (
          <FiEdit className="inline mr-2" />
        )}
        {isEditing ? "Save" : "Edit Profile"}
      </button>
    </div>
  );
}

export default ProfilePage;

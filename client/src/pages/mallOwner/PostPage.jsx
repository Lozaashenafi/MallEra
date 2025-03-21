import React, { useState } from "react";
import { FiUpload, FiImage, FiX } from "react-icons/fi";

function PostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ title, description, image });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Create a Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        {/* Description Textarea */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          rows="4"
          required
        ></textarea>

        {/* Image Upload */}
        <div className="border p-3 rounded-lg flex flex-col items-center justify-center relative">
          {image ? (
            <div className="relative w-full">
              <img
                src={image}
                alt="Preview"
                className="w-full h-60 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
              >
                <FiX />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center cursor-pointer">
              <FiImage className="text-gray-400 text-5xl" />
              <span className="text-gray-500">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition duration-300"
        >
          <FiUpload className="inline mr-2" /> Post
        </button>
      </form>
    </div>
  );
}

export default PostPage;

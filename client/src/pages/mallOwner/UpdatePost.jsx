import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail, updatePost } from "../../api/post";
import { FiImage, FiX } from "react-icons/fi";
const backendURL = import.meta.env.VITE_API_URL;

function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBid, setIsBid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    bidDeposit: "",
    bidEndDate: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostDetail(id);

      setFormData({
        title: data.title,
        description: data.description,
        price: data.price,
        bidDeposit: data.bidDeposit || "",
        bidEndDate: data.bidEndDate?.split("T")[0] || "",
        images: [],
      });

      setIsBid(!!data.bidDeposit); // Check if it's a bid post
      setPreviewImages(data.images || []);
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const currentCount = previewImages.length + formData.images.length;

    if (files.length + currentCount > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    let newImages = [...formData.images, ...files];
    if (newImages.length > 3) {
      newImages = newImages.slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleImageDelete = (index, isPreview) => {
    if (isPreview) {
      const newPreviewImages = previewImages.filter((_, i) => i !== index);
      setPreviewImages(newPreviewImages);
    } else {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, images: newImages }));
    }

    // Optionally track the deleted images (for the API or for custom logic)
    if (isPreview) {
      setDeletedImages((prev) => [...prev, previewImages[index]]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("postId", id);
    body.append("title", formData.title);
    body.append("description", formData.description);
    body.append("price", formData.price);

    if (isBid) {
      body.append("bidDeposit", formData.bidDeposit);
      body.append("bidEndDate", formData.bidEndDate);
    }

    // Combine the preview and new images together
    let finalImages = [...previewImages, ...formData.images];

    // If there are more than 3 images, slice the array to make sure we only have 3
    if (finalImages.length > 3) {
      finalImages = finalImages.slice(0, 3);
    }

    // If the total images (new + existing) are not exactly 3, return an error
    if (finalImages.length !== 3) {
      alert("Exactly 3 images are required.");
      return;
    }

    // Append images to form data (max 3 images)
    for (let i = 0; i < finalImages.length; i++) {
      body.append("images", finalImages[i]);
    }

    try {
      setIsSubmitting(true);
      await updatePost(body);
      navigate(`/owner/posts/${id}`);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2"
        />

        {isBid && (
          <>
            <input
              type="number"
              name="bidDeposit"
              value={formData.bidDeposit}
              onChange={handleChange}
              placeholder="Bid Deposit"
              className="w-full border p-2"
            />
            <input
              type="date"
              name="bidEndDate"
              value={formData.bidEndDate}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </>
        )}

        {/* Image Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upload Images (Max 3)</h3>

          <div className="grid grid-cols-3 gap-2">
            {/* Previously uploaded images */}
            {previewImages.map((img, index) => (
              <div key={`preview-${index}`} className="relative">
                <img
                  src={`${backendURL}${img.imageURL}`}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index, true)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <FiX />
                </button>
              </div>
            ))}

            {/* Newly selected images */}
            {formData.images.map((file, index) => (
              <div key={`new-${index}`} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index, false)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>

        <input
          type="file"
          name="images"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePost;

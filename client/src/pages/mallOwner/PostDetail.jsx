import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostDetail, HidePost } from "../../api/post"; // Assume this fetches post data by ID
const backendURL = import.meta.env.VITE_API_URL;
import { ToastContainer, toast } from "react-toastify";

function PostDetail() {
  const { id } = useParams(); // Get the post ID from URL parameters
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleHidePost = async () => {
    try {
      const res = await HidePost(id); // Call the hide post function
      toast.success(res.message || "Post hidden successfully!");
      setTimeout(() => {
        navigate("/owner/posts");
      }, 1000); // wait 1 second before redirecting
    } catch (err) {
      console.error("Hide post error:", err);
      toast.error(err.response?.data?.error || "Failed to hide post.");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostDetail(id);
        setPost(response); // Set post data
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to fetch post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Check if post data is available
  if (!post) {
    return <p className="text-center text-gray-500">Post not found.</p>;
  }

  // Destructure relevant data from post
  const {
    title,
    description,
    price,
    bidDeposit,
    bidEndDate,
    status,
    mall,
    room,
    images,
    user,
  } = post;

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {/* Image Gallery */}
      <div className="mb-4">
        <div className="flex space-x-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={`${backendURL}${image.imageURL}`}
              alt={`Post Image ${index + 1}`}
              className="w-1/3 h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      <p className="text-lg">{description}</p>

      {/* Pricing and Bid Information */}
      <div className="mt-6">
        <p className="font-semibold">Price: ${price}</p>
        <p>Bid Deposit: ${bidDeposit}</p>
        <p>Bid End Date: {new Date(bidEndDate).toDateString()}</p>
        <p>
          Status:{" "}
          <span
            className={`font-semibold ${
              status === "PENDING" ? "text-yellow-500" : "text-gray-500"
            }`}
          >
            {status}
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        {bidDeposit ? (
          <Link
            to={`/owner/bid/${id}`}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Bid
          </Link>
        ) : (
          <Link
            to={`/owner/requests/${id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Request
          </Link>
        )}
        {/* Update Button */}
        <Link
          to={`/owner/posts/update/${id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Update
        </Link>
        <Link
          onClick={handleHidePost}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Hide Post
        </Link>
      </div>
    </div>
  );
}

export default PostDetail;

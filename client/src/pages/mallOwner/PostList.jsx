import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyPost } from "../../api/post";
import { useAuth } from "../../context/AuthContext";
const backendURL = import.meta.env.VITE_API_URL;
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getMyPost(userData.userId);
        console.log("Fetched posts:", response); // Debugging log
        setPosts(response || []); // Ensure posts is always an array
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    if (userData?.userId) {
      fetchPosts();
    }
  }, [userData]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={`${backendURL}${post.images[0]?.imageURL}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {new Date(post.createdAt).toDateString()}
                </p>
                <Link
                  to={`${post.id}`}
                  className="mt-7 bg-cyan-600 text-white px-4 py-2 rounded-lg w-full hover:bg-cyan-800"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;

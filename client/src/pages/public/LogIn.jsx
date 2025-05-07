import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth"; // Assuming you have this API function for login
import { toast, ToastContainer } from "react-toastify"; // Import both 'toast' and 'ToastContainer'
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import { useAuth } from "../../context/AuthContext";

function LogIn() {
  const {
    isAdmin,
    isOwner,
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
    fetchData,
  } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Simple frontend validation
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    console.log("login: " + JSON.stringify(formData));

    try {
      const res = await login({ email, password });

      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userData", JSON.stringify(res.userData));
        await fetchData();
        setIsLoggedIn(true);
        toast.success("Logged in successfully!");
      } else {
        toast.error(res.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (isAdmin) {
        navigate("/admin");
      } else if (isOwner) {
        navigate("/owner");
      } else {
        navigate("/home");
      }
    }
  }, [isLoggedIn, isAdmin, isOwner, navigate]);

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-red-600">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-500 mt-2">
            Log in to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-primaryBlue focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-primaryBlue focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="mt-4 text-right">
              <Link to="#" className="text-red-600 text-sm">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </section>

      {/* Toast Container to show toast notifications */}
      <ToastContainer />
    </>
  );
}

export default LogIn;

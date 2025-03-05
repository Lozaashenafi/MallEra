import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth"; // Assuming you have this API function
import { toast, ToastContainer } from "react-toastify"; // Import both 'toast' and 'ToastContainer'
import "react-toastify/dist/ReactToastify.css"; // Import the styles

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      // Show a toast notification for mismatched passwords
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const user = await register({ fullName, email, password });
      // console.log("Registration successful:", user);
      toast.success("Registration successful! ");

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Adding delay before redirect for a better UX
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-red-600">
            Create an Account
          </h2>
          <p className="text-sm text-center text-gray-500 mt-2">
            Sign up to get started!
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-primaryBlue focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mt-4">
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

            {/* Confirm Password Field */}
            <div className="mt-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-primaryBlue focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </section>

      {/* Toast Container to show toast notifications */}
      <ToastContainer />
    </>
  );
}

export default SignUp;

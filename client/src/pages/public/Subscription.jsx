import { Link } from "lucide-react";
import React from "react";

function Subscription() {
  return (
    <div className="text-center h-96 flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-xl font-semibold text-green-600">
        Your mall registration was successful!
      </h2>
      <p className="mt-4">
        You will be notified by email once your account is activated.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => (window.location.href = "/")} // Redirect to the dashboard or home page
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Subscription;

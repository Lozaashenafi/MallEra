import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { declineRequest, getPostRequests } from "../../api/request";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export default function Requests() {
  const { postId } = useParams();
  console.log("id", postId);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await getPostRequests(postId); // Log the response data
        setRequests(response);
      } catch (err) {
        // console.error("Error fetching requests:", err); // Log the actual error
        setError("Failed to fetch requests.");
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, [postId]);

  const handleDetail = (request) => {
    setSelectedRequest(request);
    setOpenDetail(true);
  };

  const handleDecline = async (id) => {
    const response = await declineRequest(id);
    toast.success(response.message); // Show the toast notification
    // console.log("decline", response);
    setOpenDetail(false);

    // Reload the page after showing the toast
    window.location.reload();
  };
  if (!requests.length) {
    return <p className="text-center text-gray-500">No requests available.</p>;
  }
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md  rounded-lg mt-5">
      <div className="space-y-4">
        {requests.map((request) => (
          <Paper
            key={request.id}
            className="p-4 flex justify-between items-center"
            elevation={2}
          >
            <div>
              <h3 className="font-semibold">{request.userName}</h3>
              <p>{request.userPhone}</p>
              <p>Status: {request.status}</p>
            </div>
            <Button variant="contained" onClick={() => handleDetail(request)}>
              View Details
            </Button>
          </Paper>
        ))}
      </div>

      {/* Request Detail Popup */}
      {selectedRequest && (
        <Dialog open={openDetail} onClose={() => setOpenDetail(false)}>
          <DialogTitle>Request Details</DialogTitle>
          <DialogContent>
            <div className="flex items-center gap-6">
              <div className="w-1/2">
                <img
                  src={`${backendURL}${selectedRequest.userIdUrl}`}
                  alt="User ID"
                  className="object-cover"
                />
              </div>
              <div>
                <p>
                  <strong>User:</strong> {selectedRequest.userName}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedRequest.userPhone}
                </p>
                <p>
                  <strong>Status:</strong> {selectedRequest.status}
                </p>
                <p>
                  <strong>Created At:</strong>
                  {new Date(selectedRequest.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Note:</strong> {selectedRequest.note}
                </p>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            {/* Conditionally render buttons based on status */}
            {selectedRequest.status !== "DECLINED" && (
              <>
                <Link
                  onClick={() => handleDecline(selectedRequest.id)}
                  color="error"
                >
                  Decline
                </Link>
                <Link
                  to={`/owner/requests/accept/${selectedRequest.id}`}
                  color="green"
                >
                  Accept
                </Link>
              </>
            )}
            <Button onClick={() => setOpenDetail(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
const backendURL = import.meta.env.VITE_API_URL;

// You need to implement these API methods based on your backend
import { declineBid, getPostBids } from "../../api/bid";

export default function Bids() {
  const { postId } = useParams();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);

  useEffect(() => {
    async function fetchBids() {
      try {
        const response = await getPostBids(postId);
        setBids(response);
      } catch (err) {
        setError("Failed to fetch bids.");
      } finally {
        setLoading(false);
      }
    }
    fetchBids();
  }, [postId]);

  const handleDetail = (bid) => {
    setSelectedBid(bid);
    setOpenDetail(true);
  };

  const handleDecline = async (id) => {
    const response = await declineBid(id);
    toast.success(response.message);
    setOpenDetail(false);
    window.location.reload(); // Refresh to reflect updated status
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!bids.length)
    return <p className="text-center text-gray-500">No bids available.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
      <div className="space-y-4">
        {bids.map((bid) => (
          <Paper
            key={bid.id}
            className="p-4 flex justify-between items-center"
            elevation={2}
          >
            <div>
              <h3 className="font-semibold">{bid.userName}</h3>
              <p>{bid.userPhone}</p>
              <div className="text-lg text-green-600 font-bold">
                <p>Bid Amount: {bid.bidAmount}</p>
              </div>
            </div>
            <Button
              className="bg-cyan-700"
              variant="contained"
              onClick={() => handleDetail(bid)}
            >
              View Details
            </Button>
          </Paper>
        ))}
      </div>

      {selectedBid && (
        <Dialog open={openDetail} onClose={() => setOpenDetail(false)}>
          <DialogTitle>Bid Details</DialogTitle>
          <DialogContent>
            <div className="flex items-center gap-6">
              <div className="w-1/2">
                <img
                  src={`${backendURL}${selectedBid.userIdUrl}`}
                  alt="User ID"
                  className="object-cover rounded"
                />
              </div>
              <div>
                <p>
                  <strong>User:</strong> {selectedBid.userName}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedBid.userPhone}
                </p>
                <p>
                  <strong>Status:</strong> {selectedBid.status}
                </p>
                <p>
                  <strong>Bid Amount:</strong> ${selectedBid.bidAmount}
                </p>
                <p>
                  <strong>Note:</strong> {selectedBid.note}
                </p>

                <p className="mt-2">
                  <strong>Deposits:</strong>
                </p>
                {selectedBid.deposits?.map((dep) => (
                  <div key={dep.id} className="ml-4 text-sm">
                    <p>
                      - ${dep.amount} on
                      {new Date(dep.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            {selectedBid.status == "PENDING" && (
              <>
                <Button
                  color="error"
                  onClick={() => handleDecline(selectedBid.id)}
                >
                  Decline
                </Button>
                <Link
                  to={`/owner/bid/accept/${selectedBid.id}`}
                  className="text-green-600 hover:underline"
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

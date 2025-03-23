import { useEffect, useState } from "react";
import { getTenants } from "../../api/tenant";
import { getAvailableRooms } from "../../api/room";
import { useAuth } from "../../context/AuthContext";
import { getRents } from "../../api/rent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableSortLabel,
  TextField,
} from "@mui/material";

const RentList = () => {
  const { userData } = useAuth();
  const mallId = userData.mallId;
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [rents, setRents] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [formData, setFormData] = useState({
    tenantId: "",
    roomId: "",
    amount: "",
    paymentDuration: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenantsData = await getTenants(mallId);
        setTenants(
          Array.isArray(tenantsData.tenants) ? tenantsData.tenants : []
        );

        const roomsResponse = await getAvailableRooms(mallId);
        setRooms(Array.isArray(roomsResponse) ? roomsResponse : []);

        const rentsData = await getRents(mallId);
        setRents(Array.isArray(rentsData) ? rentsData : []);
      } catch (err) {
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, [mallId]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedRents = [...rents].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let valueA = a[sortConfig.key];
    let valueB = b[sortConfig.key];
    return sortConfig.direction === "asc"
      ? valueA > valueB
        ? 1
        : -1
      : valueA < valueB
      ? 1
      : -1;
  });

  const filteredRents = sortedRents.filter((rent) =>
    rent.user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-4/5 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rent List</h2>

        <TextField
          fullWidth
          label="Search Tenant"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "user.fullName"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("user.fullName")}
                  >
                    Tenant
                  </TableSortLabel>
                </TableCell>
                <TableCell>Room</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "amount"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("amount")}
                  >
                    Amount ($)
                  </TableSortLabel>
                </TableCell>
                <TableCell>Duration (Months)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRents.map((rent) => (
                <TableRow key={rent.id}>
                  <TableCell>{rent.user.fullName}</TableCell>
                  <TableCell>Room {rent.room.roomNumber}</TableCell>
                  <TableCell>${rent.amount}</TableCell>
                  <TableCell>{rent.PaymentDuration} Month</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RentList;

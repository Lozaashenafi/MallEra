import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import AboutUs from "./pages/public/AboutUs";
import ContactUs from "./pages/public/ContactUs";
import SignUp from "./pages/public/SignUp";
import LogIn from "./pages/public/LogIn";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import MallOwner from "./pages/admin/MallOwner";
import Mall from "./pages/admin/Mall";
import AddMallOwner from "./pages/admin/AddMallOwner";
import MallDetail from "./pages/admin/MallDetail";
import RegisterMall from "./pages/admin/RegisterMall";
import UpdateMall from "./pages/admin/UpdateMall";
import { ToastContainer } from "react-toastify";
import OwnerLayout from "./layout/OwnerLayout";
import OwnerDashboard from "./pages/mallOwner/OwnerDashboard";
import MallInfo from "./pages/mallOwner/MallInfo";
import RoomList from "./pages/mallOwner/RoomList";
import AddRoom from "./pages/mallOwner/AddRoom";
import RoomPrice from "./pages/mallOwner/RoomPrice";
import Payment from "./pages/mallOwner/Payment";
import PostPage from "./pages/mallOwner/PostPage";
import TenantManagement from "./pages/mallOwner/TenantManagement ";
import RentManagement from "./pages/mallOwner/RentManagement";
import ProfilePage from "./pages/mallOwner/ProfilePage";
import NotificationPage from "./pages/mallOwner/NotificationPage";
import OwnerSettings from "./pages/mallOwner/OwnerSettings";
import Requests from "./pages/mallOwner/Requests";
import PostList from "./pages/mallOwner/PostList";
import PostDetail from "./pages/mallOwner/PostDetail";
import AcceptRequest from "./pages/mallOwner/AcceptRequest";
import Malls from "./pages/public/malls";
import Register from "./pages/public/Register";
import PendingMall from "./pages/admin/PendingMall";
import Bids from "./pages/mallOwner/Bids";
import AcceptBid from "./pages/mallOwner/AcceptBid";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import SubscriptionPage from "./pages/admin/SubscriptionPage.jsx";
import Tenants from "./pages/public/Tenants.jsx";
import Subscription from "./pages/public/subscription.jsx";
import UpdatePost from "./pages/mallOwner/UpdatePost.jsx";

function App() {
  const { isLoggedIn, isAdmin, isOwner, userData } = useAuth();

  console.log(isLoggedIn, isAdmin, isOwner, userData);

  return (
    <>
      <NotificationProvider userId={userData?.id}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="service" element={<Services />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="malls" element={<Malls />} />
            <Route path="register" element={<Register />} />
            <Route path="/tenants/:mallId" element={<Tenants />} />
            <Route path="/subscription" element={<Subscription />} />
          </Route>

          {isAdmin && (
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="mall-owners" element={<MallOwner />} />
              <Route path="malls" element={<Mall />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="mall-owners/add" element={<AddMallOwner />} />
              <Route path="mall/detail/:id" element={<MallDetail />} />
              <Route path="malls/update/:id" element={<UpdateMall />} />
              <Route path="malls/register" element={<RegisterMall />} />
              <Route path="pending/malls" element={<PendingMall />} />
            </Route>
          )}

          {isOwner && (
            <Route path="/owner" element={<OwnerLayout />}>
              <Route index element={<OwnerDashboard />} />
              <Route path="info" element={<MallInfo />} />
              <Route path="room/list" element={<RoomList />} />
              <Route path="room/add" element={<AddRoom />} />
              <Route path="room/price" element={<RoomPrice />} />
              <Route path="payment" element={<Payment />} />
              <Route path="post" element={<PostPage />} />
              <Route path="post/list" element={<PostList />} />
              <Route path="post/list/:id" element={<PostDetail />} />
              <Route path="tenant" element={<TenantManagement />} />
              <Route path="rent" element={<RentManagement />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="posts/update/:id" element={<UpdatePost />} />

              <Route
                path="notifications"
                element={<NotificationPage userId={userData.userId} />}
              />
              <Route path="settings" element={<OwnerSettings />} />
              <Route path="requests/:postId" element={<Requests />} />
              <Route path="requests/accept/:id" element={<AcceptRequest />} />
              <Route path="bid/accept/:id" element={<AcceptBid />} />
              <Route path="bid/:postId" element={<Bids />} />
            </Route>
          )}
        </Routes>
      </NotificationProvider>
    </>
  );
}

export default App;

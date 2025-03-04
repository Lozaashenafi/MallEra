import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function RootLayout() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;

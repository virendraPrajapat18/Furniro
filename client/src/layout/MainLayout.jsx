import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Always visible header */}
      <Navbar/>

      {/* Dynamic page content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Always visible footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;

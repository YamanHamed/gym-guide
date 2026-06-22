import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import ScrollToTop from "../components/ScrollToTop";

const UserLayout = ({ hideFooter = false, mainClassName = "" }) => {
  return (
    <>
      {" "}
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#131313]">
        <Navbar />

        {/* This pushes the footer down and handles side-padding */}
        <main className={`flex-grow py-20 px-8 md:px-12 ${mainClassName}`}>
          {/* This stops the content from getting too wide on Desktop */}
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        {!hideFooter && <Footer />}
      </div>
    </>
  );
};

export default UserLayout;

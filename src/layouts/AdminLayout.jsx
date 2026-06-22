import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { ModalProvider } from "../contexts/ModalContext";
import ScrollToTop from "../components/ScrollToTop";
const AdminLayout = () => {
  return (
    <>
      <ScrollToTop />
      <ModalProvider>
        <Navbar role="admin" />
        <Sidebar />
        <main className="md:ml-64 pt-32  pb-20">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </ModalProvider>
    </>
  );
};

export default AdminLayout;

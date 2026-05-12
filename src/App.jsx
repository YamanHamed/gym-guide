import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import AICoach from "./components/AiCoach";
import Library from "./pages/userPages/Library";
import Tips from "./pages/userPages/Tips";
import { Route, Routes } from "react-router";
import AboutSec from "./components/AboutSec";
import FeedBackSec from "./components/FeedBackSec";
import Footer from "./components/Footer";
import Split from "./pages/userPages/Split";
import Home from "./pages/userPages/Home";
import Splits from "./pages/userPages/Splits";
import MusclePage from "./pages/userPages/MusclePage";
import DashboardHome from "./pages/adminPages/DashboardHome";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import CreatePage from "./pages/adminPages/CreatePage";
import BrowsePage from "./pages/adminPages/BrowsePage";
import { Toaster } from "react-hot-toast";
import Login from "./pages/adminPages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
// import { useState, useEffect, useRef } from "react";
function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="library/:muscle" element={<MusclePage />} />
          <Route path="aicoach" element={<AICoach />} />
          <Route path="splits" element={<Splits />} />
          <Route path="tips" element={<Tips />} />
          <Route path="splits/:splitName" element={<Split />} />
        </Route>

        <Route path="/dashboard/login" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route index element={<DashboardHome />} />
            <Route path=":type" element={<BrowsePage />} />
            <Route path="create/:type" element={<CreatePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import AICoach from "./pages/userPages/AICoach";
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
import { RouterProvider } from "react-router-dom";
import router from "./router";
// import { useState, useEffect, useRef } from "react";
function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

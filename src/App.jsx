import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import AICoach from "./components/AiCoach";
import Library from "./pages/Library";
import Exercises from "./pages/Exercises";
import Tips from "./pages/Tips";
import { Route, Routes } from "react-router";
import AboutSec from "./components/AboutSec";
import FeedBackSec from "./components/FeedBackSec";
import Footer from "./components/Footer";
import Split from "./pages/Split";
import Home from "./pages/Home";
import Splits from "./pages/Splits";
// import { useState, useEffect, useRef } from "react";
function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#131313]">
        <Navbar />

        {/* This pushes the footer down and handles side-padding */}
        <main className="flex-grow py-20 px-8 md:px-12">
          {/* This stops the content from getting too wide on Desktop */}
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/aicoach" element={<AICoach />} />
              <Route path="/splits" element={<Splits />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/splits/:splitName" element={<Split />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;

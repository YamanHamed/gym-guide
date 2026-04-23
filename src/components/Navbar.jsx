import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

// Nav Items outside the component to avoid re-creation on every render
const NAV_LINKS = [
  { name: "Library", path: "/library" },
  { name: "Splits", path: "/splits" },
  { name: "Ai Coach", path: "/aicoach" },
  { name: "Tips", path: "/tips" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation(); // Get current path for dynamic active state
  const [isOpen, setIsOpen] = useState(false);

  // handle navigation and close mobile menu
  function handleNavigation(path) {
    navigate(path);
    setIsOpen(false);
  }

  return (
    <nav className="fixed top-0 w-full h-20 z-50 bg-[#080809]/40 backdrop-blur-3xl border-b border-white/5 transition-all duration-500">
      <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        {/* Logo Area */}
        <div
          onClick={() => handleNavigation("/")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-[#0070FF] rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="material-symbols-outlined text-white text-lg font-bold">
              bolt
            </span>
          </div>
          <div className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">
            GYM <span className="text-[#0070FF]">GUIDE</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <a
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer nav-item ${
                  isActive ? "active-link text-[#0070FF]" : ""
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Actions (Search & Hamburger) */}
        <div className="flex items-center gap-4">
          <SearchBar />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Links Overlay */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#080809]/95 backdrop-blur-3xl border-b border-white/10 flex flex-col p-8 gap-6 z-40 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto visible max-h-[100vh]"
              : "opacity-0 -translate-y-4 pointer-events-none invisible max-h-0"
          }`}
        >
          {NAV_LINKS.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <a
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                }}
                className="transition-all duration-300"
              >
                <span
                  className={`nav-item text-[12px] font-bold uppercase tracking-[0.2em] cursor-pointer ${isActive ? "text-[#0070FF]" : "text-white"}`}
                >
                  {item.name}
                </span>
              </a>
            );
          })}

          <div className="mt-4 pt-6 border-t border-white/5">
            <SearchBar mobile={true} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

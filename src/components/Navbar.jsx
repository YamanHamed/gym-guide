import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import logo from "../imgs/isolated-logo.png";
// Nav Items outside the component to avoid re-creation on every render
const USER_NAV_LINKS = [
  { name: "Exercises", path: "/library" },
  { name: "Splits", path: "/splits" },
  { name: "Tips", path: "/tips" },
  { name: "Ai Coach", path: "/aicoach" },
];
const ADMIN_NAV_LINKS = [
  { name: "Exercises", path: "exercises" },
  { name: "Splits", path: "splits" },
  { name: "Tips", path: "tips" },
];

const Navbar = ({ role = "user" }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation(); // Get current path for dynamic active state
  const [isOpen, setIsOpen] = useState(false);

  // handle navigation and close mobile menu
  function handleNavigation(path) {
    navigate(path);
    setIsOpen(false);
  }
  if (role === "user") {
    return (
      <>
        <nav className="[direction:ltr] fixed top-0 w-full h-20 z-50 bg-[#131313] border-b border-white/10 transition-all duration-500">
          <div className="flex justify-between items-center px-8 2xl:px-0 py-5 max-w-7xl mx-auto">
            {/* Logo Area */}
            <div
              onClick={() => handleNavigation("/")}
              className="flex items-center group cursor-pointer select-none"
            >
              <img
                src={logo}
                alt="SPOTTER Logo"
                className="h-8 md:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-[0_0_10px_rgba(0,123,255,0.5)]"
              />
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {USER_NAV_LINKS.map((item) => {
                const isActive = pathname.includes(item.path);

                return (
                  <a
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer nav-item ${
                      isActive ? "active-link text-[#0070FF]" : ""
                    }`}
                  >
                    {t(`nav.${item.name.toLowerCase().replace(" ", "")}`)}
                  </a>
                );
              })}
            </div>
            {/* Actions: Search, Language Switcher & Hamburger */}
            <div className="flex items-center gap-4">
              <SearchBar />
              <LanguageSwitcher className="hidden md:block" />
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
              className={`md:hidden absolute top-full left-0 w-full bg-[#131313] border-b border-white/10 flex flex-col p-8 gap-6 z-40 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto visible max-h-[100vh]"
                  : "opacity-0 -translate-y-4 pointer-events-none invisible max-h-0"
              }`}
            >
              {USER_NAV_LINKS.map((item, index) => {
                const isActive = pathname.includes(item.path);
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
                      {t(`nav.${item.name.toLowerCase().replace(" ", "")}`)}
                    </span>
                  </a>
                );
              })}

              <div className="mt-4 pt-6 border-t border-white/5">
                <LanguageSwitcher className="mb-4" />

                <SearchBar
                  mobile={true}
                  onSearchEffect={() => setIsOpen(false)}
                />
              </div>
            </div>
          </div>
        </nav>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </>
    );
  } else if (role === "admin") {
    return (
      <nav className="hidden md:block fixed top-0 w-full h-20 z-50 bg-[#131313] border-b border-white/5 transition-all duration-500">
        <div className="hidden md:flex justify-between items-center px-8 py-5 mx-auto">
          {/* Logo Area */}
          <div
            onClick={() => handleNavigation("/dashboard")}
            className="flex items-center group cursor-pointer select-none"
          >
            <img
              src={logo}
              alt="SPOTTER Logo"
              className="h-8 md:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-[0_0_10px_rgba(0,123,255,0.5)]"
            />
          </div>

          <SearchBar role="admin" />
        </div>
      </nav>
    );
  }
};

export default Navbar;

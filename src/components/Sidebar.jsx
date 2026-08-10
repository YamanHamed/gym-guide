import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "./Button";
import { useModal } from "../contexts/ModalContext";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";

const ADMIN_NAV_LINKS = [
  {
    key: "home",
    label: "Dashboard",
    icon: "home",
    path: "",
  },
  {
    key: "exercises",
    label: "Exercises",
    icon: "fitness_center",
    items: [
      { name: "Create Exercise", path: "create/exercises", icon: "add" },
      { name: "Browse Library", path: "exercises", icon: "search" },
    ],
  },
  {
    key: "splits",
    label: "Training Splits",
    icon: "schema",
    items: [
      { name: "Create Split", path: "create/splits", icon: "add" },
      { name: "Browse Splits", path: "splits", icon: "search" },
    ],
  },
  {
    key: "tips",
    label: "Pro Tips",
    icon: "lightbulb",
    items: [
      { name: "Create Tip", path: "create/tips", icon: "add" },
      { name: "Browse Tips", path: "tips", icon: "search" },
    ],
  },
];
const BrandLogo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-3 group cursor-pointer"
    >
      <div className="w-8 h-8 bg-[#0070FF] rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-[0_0_15px_rgba(0,112,255,0.4)]">
        <span className="material-symbols-outlined text-white text-[20px] font-bold">
          bolt
        </span>
      </div>
      <div className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">
        GYM <span className="text-[#0070FF]">GUIDE</span>
      </div>
    </div>
  );
};
const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openGroups, setOpenGroups] = useState({
    exercises: false,
    splits: false,
    tips: false,
    home: false,
  });
  const { openModal } = useModal();

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const handleNavigation = (path) => {
    navigate(`/dashboard/${path}`);
    closeMobileMenu();
  };

  const handleLogOut = () => {
    openModal({
      title: "Log out",
      message: "Are you sure you want to log out?",
      confirmText: "log out",
      confirmVariant: "primary",
      onConfirm: async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("logged out successfully");
        navigate("/login");
      },
    });
  };

  const isActive = (path) => {
    return (
      pathname === `/dashboard/${path}` || pathname === `/dashboard${path}`
    );
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Reusable brand logo component for both mobile and desktop

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Top Nav */}
      <nav className="fixed md:hidden top-0 w-full h-20 z-50 bg-[#131313]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex justify-between items-center px-6 h-full mx-auto">
          <BrandLogo />
          <Button
            onClick={toggleMobileMenu}
            className="bg-transparent hover:bg-white/10 border border-white/10 rounded-lg p-2 text-white transition-colors"
            icon="menu"
            type="custom"
          />
        </div>
      </nav>

      {/* Main Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-full md:w-72 z-50 bg-[#0A0A0A] md:bg-[#131313] border-r border-white/5
          transition-transform duration-500 ease-custom-spring flex flex-col
          md:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex h-24 items-center px-8 border-b border-white/5 shrink-0">
          <BrandLogo />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-24 md:pt-6 px-4 custom-scrollbar flex flex-col gap-6">
          <div className="px-2">
            <SearchBar
              mobile={true}
              role="admin"
              className="w-full mb-4"
              onSearchEffect={closeMobileMenu}
            />
          </div>

          <nav className="flex flex-col gap-1 px-2">
            {ADMIN_NAV_LINKS.map((group) => {
              if (group.key === "home") {
                const active = isActive(group.path);
                return (
                  <div
                    key={group.key}
                    onClick={() => {
                      toggleGroup(group.key);
                      handleNavigation(group.path);
                    }}
                    className={`flex items-center gap-3 cursor-pointer py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200    
                      ${
                        active
                          ? "text-white bg-[#0070FF]/15 shadow-sm"
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                      }
                    `}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {group.icon}
                    </span>
                    <span>{group.label}</span>
                  </div>
                );
              }

              return (
                <div key={group.key} className="flex flex-col mt-2">
                  {/* Group header (accordion trigger) */}
                  <div
                    onClick={() => toggleGroup(group.key)}
                    className="flex items-center justify-between cursor-pointer py-2 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  >
                    <span className="tracking-widest">{group.label}</span>
                    <span
                      className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                        openGroups[group.key] ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </div>

                  {/* Nested items without Framer Motion */}
                  {openGroups[group.key] && (
                    <div className="flex flex-col gap-1 pt-1 pb-2">
                      {group.items.map((item) => {
                        const active = isActive(item.path);
                        return (
                          <div
                            key={item.name}
                            onClick={() => handleNavigation(item.path)}
                            className={`
                              cursor-pointer flex items-center gap-3 py-2 px-4 ml-2 rounded-xl text-sm font-medium
                              transition-all duration-200
                              ${
                                active
                                  ? "text-[#0070FF] bg-[#0070FF]/10"
                                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                              }
                            `}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {item.icon}
                            </span>
                            <span>{item.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-6 mt-auto border-t border-white/5 shrink-0">
          <Button
            type="outlined"
            text="Log out"
            rounded="rounded-xl"
            className="w-full justify-center border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5"
            onClick={handleLogOut}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

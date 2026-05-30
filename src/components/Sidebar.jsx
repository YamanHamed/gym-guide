// src/components/SideNavBar.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "./Button";
import { useModal } from "../contexts/ModalContext";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";

const ADMIN_NAV_LINKS = [
  {
    key: "home",
    label: "Home",
    icon: "home",
    path: "",
  },
  {
    key: "exercises",
    label: "Exercises",
    icon: "fitness_center",
    items: [
      { name: "Create Exercise", path: "create/exercises", icon: "add_box" },
      { name: "Browse Exercises", path: "exercises", icon: "list_alt" },
    ],
  },
  {
    key: "splits",
    label: "Splits",
    icon: "schema",
    items: [
      { name: "Create Split", path: "create/splits", icon: "add_box" },
      { name: "Browse Splits", path: "splits", icon: "list_alt" },
    ],
  },
  {
    key: "tips",
    label: "Tips",
    icon: "lightbulb",
    items: [
      { name: "Create Tip", path: "create/tips", icon: "add_box" },
      { name: "Browse Tips", path: "tips", icon: "list_alt" },
    ],
  },
];
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

  //== HANDLERS ==
  const handleNavigation = (path) => {
    navigate(`/dashboard/${path}`);
    toggleMobileMenu();
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
  //== UI FLAGS ==
  const isActive = (path) => {
    return (
      pathname === `/dashboard/${path}` || pathname === `/dashboard${path}`
    );
  };
  //== MOBILE ==
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      {/* Mobile overlay backdrop (only visible when menu open) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <nav className="fixed md:hidden top-0 w-full h-20 z-50 bg-[#131313] border-b border-white/5 transition-all duration-500">
        <div className="flex md:hidden justify-between items-center px-10 py-5 mx-auto">
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
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className=" md:hidden bg-[#131313] hover:bg-white/10 border border-white/10 rounded-lg p-2 text-white"
            icon="menu"
            type="custom"
          />
        </div>
      </nav>

      <aside
        className={`
          fixed left-0 top-0 h-full w-full md:w-64 z-40 bg-[#131313] pt-20 border-e border-white/10
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:block
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <nav className="mt-12  overflow-y-auto">
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
                      className={`flex items-center justify-between cursor-pointer py-3 px-6 text-sm font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300    
                    ${
                      active
                        ? "text-[#0070FF] bg-gradient-to-r from-[#0070FF]/10 to-transparent border-l-4 border-[#0070FF]"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined">
                          {group.icon}
                        </span>
                        <span>{group.label}</span>
                      </div>
                    </div>
                  );
                } else
                  return (
                    <div key={group.key} className="mb-2">
                      {/* Group header (accordion trigger) */}
                      <div
                        onClick={() => toggleGroup(group.key)}
                        className="flex items-center justify-between cursor-pointer py-3 px-6 text-sm font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined">
                            {group.icon}
                          </span>
                          <span>{group.label}</span>
                        </div>
                        <span className="material-symbols-outlined text-base">
                          {openGroups[group.key]
                            ? "expand_less"
                            : "expand_more"}
                        </span>
                      </div>

                      {/* Nested items */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          openGroups[group.key] ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="ml-4">
                          {group.items.map((item) => {
                            const active = isActive(item.path);
                            return (
                              <div
                                key={item.name}
                                onClick={() => handleNavigation(item.path)}
                                className={`
                          cursor-pointer flex items-center gap-3 py-3 px-6 text-sm font-medium
                          transition-all duration-300 rounded-r-full
                          ${
                            active
                              ? "text-[#0070FF] bg-gradient-to-r from-[#0070FF]/10 to-transparent border-l-4 border-[#0070FF]"
                              : "text-zinc-400 hover:text-white hover:bg-white/5"
                          }
                        `}
                              >
                                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-200">
                                  {item.icon}
                                </span>
                                <span>{item.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
              })}
            </nav>{" "}
            <SearchBar
              mobile={true}
              role="admin"
              className="mx-4"
              onSearchEffect={closeMobileMenu}
            />
          </div>

          <Button
            type="outlined"
            text="logout"
            rounded="rounded-sm"
            className="my-4 mx-6"
            onClick={() => {
              handleLogOut();
            }}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

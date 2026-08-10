// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../../layouts/AdminLayout";
import Card from "../../components/Card";
import Header from "../../components/Header";

// Mock data for the new chart
const performanceData = [
  { name: "Mon", routines: 4, engagement: 24 },
  { name: "Tue", routines: 7, engagement: 35 },
  { name: "Wed", routines: 5, engagement: 45 },
  { name: "Thu", routines: 12, engagement: 50 },
  { name: "Fri", routines: 15, engagement: 70 },
  { name: "Sat", routines: 11, engagement: 85 },
  { name: "Sun", routines: 18, engagement: 100 },
];

const DashboardHome = () => {
  // Keeping your existing card data structure
  const cards = [
    {
      to: "/admin/exercises",
      icon: "fitness_center",
      title: "Manage Exercises",
      description:
        "Edit or remove existing exercises in the library. Audit the technical dossiers for form accuracy.",
    },
    {
      to: "/admin/exercises/new",
      icon: "add_box",
      title: "Create New Exercise",
      description:
        "Add a new technical dossier to the vault. Include high-definition media and bio-mechanical cues.",
    },
    {
      to: "/admin/splits",
      icon: "schema",
      title: "Manage Splits",
      description:
        "Oversee and update training protocols. Adjust rest intervals and volume intensity across all programs.",
    },
    {
      to: "/admin/splits/new",
      icon: "analytics",
      title: "Create New Split",
      description:
        "Design a new asymmetrical training split. Architect advanced progression models for elite athletes.",
    },
  ];

  return (
    <div className="px-6 md:px-10 pb-12">
      {/* Welcome Header */}
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">
          Welcome back, <span className="text-[#007BFF]">Admin</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl text-base md:text-lg">
          Manage your platform's content, monitor user activity, and update
          training programs from your central dashboard.
        </p>
      </div>

      {/* Top Stats & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Left Column: Stat Cards */}
        <div className="flex flex-col gap-6">
          {/* Total Exercises */}
          <div className="bg-surface-container-low border border-white/5 p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden group shadow-lg">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 blur-3xl rounded-full transition-transform group-hover:scale-110 duration-700"></div>
            <span className="text-on-surface-variant uppercase tracking-widest text-xs font-bold z-10">
              Total Exercises
            </span>
            <span className="text-5xl font-black text-on-surface z-10 tracking-tight">
              30
            </span>
            <div className="mt-2 flex items-center gap-2 text-primary font-bold text-sm z-10 bg-primary/10 w-fit px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>
              +12 this week
            </div>
          </div>

          {/* Active Splits */}
          <div className="bg-surface-container-low border border-white/5 p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden group shadow-lg">
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary/10 blur-3xl rounded-full transition-transform group-hover:scale-110 duration-700"></div>
            <span className="text-on-surface-variant uppercase tracking-widest text-xs font-bold z-10">
              Active Splits
            </span>
            <span className="text-5xl font-black text-on-surface z-10 tracking-tight">
              6
            </span>
            <div className="mt-2 flex items-center gap-2 text-emerald-400 font-bold text-sm z-10">
              <span className="material-symbols-outlined text-sm">
                check_circle
              </span>
              All systems optimal
            </div>
          </div>
        </div>

        {/* Right Column: Chart (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-surface-container-low border border-white/5 p-8 rounded-2xl shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-on-surface font-bold text-lg">
                Vault Engagement
              </h3>
              <p className="text-on-surface-variant text-sm">
                Weekly user activity vs routines created
              </p>
            </div>
          </div>

          <div className="h-full min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorEngagement"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#007BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#007BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E1E1E",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#E0E0E0" }}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#007BFF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorEngagement)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* The Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {cards.map((card, idx) => {
          // Logic to create the bento asymmetry
          // Makes the first card a large square, and the fourth card a wide rectangle
          const isLarge = idx === 0;
          const isWide = idx === 3;

          return (
            <Link
              to={card.to}
              key={idx}
              className={`block group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 transition-all duration-300 hover:border-[#007BFF] hover:bg-zinc-800/50 hover:shadow-[0_0_30px_-5px_rgba(0,123,255,0.15)]
          ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
          ${isWide ? "md:col-span-2 row-span-1" : ""}
          ${!isLarge && !isWide ? "col-span-1 row-span-1" : ""}
        `}
            >
              {/* Subtle background gradient on hover matching #007BFF */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/0 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none" />

              <div className="flex flex-col h-full relative z-10">
                {/* Icon Container */}
                <div className="p-3 bg-zinc-800 rounded-xl w-fit text-[#007BFF] mb-4 transition-transform duration-300 group-hover:scale-110">
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>

                {/* Text Content aligned to the bottom */}
                <div className="mt-auto">
                  <h3
                    className={`font-semibold text-zinc-100 mb-2 ${isLarge ? "text-2xl" : "text-lg"}`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHome;

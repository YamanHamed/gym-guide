// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Card from "../../components/Card";
import Header from "../../components/Header";
const DashboardHome = () => {
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
    <div className="px-10">
      {/* Welcome Header */}
      <section className="mb-16">
        <Header
          titleSize="text-5xl"
          plainTitle=" Welcome back"
          highlightTitle=", Admin"
          body="The Gym Guide engine is operational. Monitor technical dossiers,
          refine asymmetrical training protocols, and maintain the vault of
          performance-driven content."
        />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Total Exercises */}
        <div className="bg-surface-container-low p-8 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
          <span className="text-on-surface-variant uppercase tracking-widest text-xs font-bold">
            Total Exercises
          </span>
          <span className="text-4xl font-black text-on-surface">1,248</span>
          <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm">
            <span className="material-symbols-outlined text-sm">
              trending_up
            </span>
            +12 this week
          </div>
        </div>

        {/* Active Splits (takes two columns) */}
        <div className="md:col-span-2 bg-surface-container-low p-8 rounded-xl flex items-end justify-between relative overflow-hidden group">
          <div>
            <span className="text-on-surface-variant uppercase tracking-widest text-xs font-bold">
              Active Splits
            </span>
            <div className="text-4xl font-black text-on-surface mt-2">42</div>
          </div>
          <div className="flex gap-1 h-12 items-end">
            <div className="w-2 bg-primary/20 h-4 rounded-full"></div>
            <div className="w-2 bg-primary/40 h-8 rounded-full"></div>
            <div className="w-2 bg-primary/60 h-12 rounded-full"></div>
            <div className="w-2 bg-primary/40 h-6 rounded-full"></div>
            <div className="w-2 bg-primary/80 h-10 rounded-full"></div>
            <div className="w-2 bg-primary h-5 rounded-full"></div>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            icon={card.icon}
            title={card.title}
            body={card.description}
          />
        ))}
      </section>
    </div>
  );
};

export default DashboardHome;

// src/components/DashboardNavGrid.jsx

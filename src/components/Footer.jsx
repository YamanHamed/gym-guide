import { Link } from "react-router-dom";

const Footer = () => {
  // Centralized Nav Configuration
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Library", path: "/library" },
    { label: "Splits", path: "/splits" },
    { label: "Coach", path: "/aicoach" },
    { label: "Tips", path: "/tips" },
  ];
  const YamanSocialLinks = [
    {
      label: "LinkedIn",
      path: "https://linkedin.com/in/your-profile",
      icon: "link",
      isExternal: true,
    },
    {
      label: "Email",
      path: "mailto:your-email@example.com",
      icon: "alternate_email",
      isExternal: true,
    },
  ];
  const MajdSocialLinks = [
    {
      label: "LinkedIn",
      path: "https://linkedin.com/in/your-profile",
      icon: "link",
      isExternal: true,
    },
    {
      label: "Email",
      path: "mailto:your-email@example.com",
      icon: "alternate_email",
      isExternal: true,
    },
  ];

  return (
    <footer className="w-full bg-black/40 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-10">
          {/* 1. Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0070FF]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                Gym <span className="text-[#0070FF]">Guide</span>
              </span>
            </div>
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-medium max-w-[200px] leading-relaxed italic">
              Built for the next generation of lifters. All protocols encrypted.
            </p>
          </div>

          {/* 2. Responsive Nav Links */}
          <nav className="flex flex-col md:flex-row gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-primary-container transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 3. The Credits Terminal (Yaman & Majd) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-8 md:gap-6 pt-4 md:pt-0">
            {/* Creator Block: Yaman */}
            <div className="flex flex-col gap-2">
              <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-700 font-black mb-1">
                Core Architecture //{" "}
                <span className="text-zinc-400">Yaman</span>
              </span>
              <div className="flex items-center gap-4">
                {YamanSocialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.path}
                    className="group flex items-center gap-1.5"
                  >
                    <span
                      className={`material-symbols-outlined text-[12px] text-zinc-700 group-hover:text-[#0070FF] transition-all ${
                        social.label === "Email"
                          ? "group-hover:-translate-y-0.5"
                          : "group-hover:rotate-12"
                      }`}
                    >
                      {social.icon}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Creator Block: Majd */}
            <div className="flex flex-col gap-2 border-l md:border-l-0 border-white/5 ">
              {/* pl-6 md:pl-0 */}
              <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-700 font-black mb-1">
                Content Curation // <span className="text-zinc-400">Majd</span>
              </span>
              <div className="flex items-center gap-4">
                {/* Using Majd's specific links here */}
                {MajdSocialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.path}
                    className="group flex items-center gap-1.5"
                  >
                    <span
                      className={`material-symbols-outlined text-[12px] text-zinc-700 group-hover:text-[#0070FF] transition-all ${
                        social.label === "Email"
                          ? "group-hover:-translate-y-0.5"
                          : "group-hover:rotate-12"
                      }`}
                    >
                      {social.icon}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

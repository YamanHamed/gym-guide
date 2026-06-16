import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const LanguageSwitcher = ({ className }) => {
  const { i18n } = useTranslation();

  const applyStyles = (lng) => {
    const isArabic = lng?.startsWith("ar");
    if (isArabic) {
      document.documentElement.dir = "rtl";
      document.documentElement.classList.add("arabic");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.classList.remove("arabic");
    }
  };

  // Listen for language changes (including initial detection)
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      applyStyles(lng);
    };

    // Subscribe to language change events
    i18n.on("languageChanged", handleLanguageChanged);

    // Apply styles immediately in case the language is already set
    if (i18n.language) {
      applyStyles(i18n.language);
    }

    // Cleanup
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    // applyStyles will be called automatically by the event listener
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-1 text-xs ${i18n.language?.startsWith("en") ? "text-[#0070FF]" : "text-white"}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`px-2 py-1 text-xs ${i18n.language?.startsWith("ar") ? "text-[#0070FF]" : "text-white"}`}
      >
        AR
      </button>
    </div>
  );
};

export default LanguageSwitcher;

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const LanguageSwitcher = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    if (lng === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.classList.add("arabic");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.classList.remove("arabic");
    }
  };

  // On component mount, sync with current language
  useEffect(() => {
    const current = i18n.language;
    if (current === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.classList.add("arabic");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.classList.remove("arabic");
    }
  }, [i18n.language]);

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-1 text-xs ${i18n.language === "en" ? "text-[#0070FF]" : "text-white"}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`px-2 py-1 text-xs ${i18n.language === "ar" ? "text-[#0070FF]" : "text-white"}`}
      >
        AR
      </button>
    </div>
  );
};

export default LanguageSwitcher;

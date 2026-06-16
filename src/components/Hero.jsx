import { useNavigate } from "react-router";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[500px] flex flex-col items-start justify-center overflow-hidden ">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white max-w-5xl">
          {t("hero.sweat")}
          <br />
          <span className="text-[#0070FF] italic  ">{t("hero.shine")}</span>
        </h1>

        <div className="mt-10 md:mt-16 flex flex-col md:flex-row md:items-center justify-between gap-10 w-full">
          <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            {t("hero.description")}
          </p>

          <Button
            onClick={() => navigate("/Library")}
            className="w-full md:w-auto whitespace-nowrap bg-[#0070FF] text-white md:px-10  py-5  font-bold text-sm md:text-lg uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(0,112,255,0.4)] shrink-0"
            rounded="rounded-full"
            text={t("hero.browseButton")}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

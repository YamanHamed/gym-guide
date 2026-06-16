import libraryExercise from "../imgs/muscular-man-deadlift.jpg";
import { Link } from "react-router-dom";
import Header from "./Header";
import Hr from "./Hr";
import { useTranslation } from "react-i18next";

const BentoGrid = () => {
  const { t } = useTranslation();
  return (
    <>
      {" "}
      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle={t("tools.plainTitle")}
          highlightTitle={t("tools.highlightTitle")}
          body={t("tools.body")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Item 1: Exercise Library */}
          <Link
            className="md:col-span-2 relative overflow-hidden rounded-xl bg-surface-container group cursor-pointer border border-white/5"
            to="/library"
          >
            <img
              alt="Exercise Library"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              data-alt="Athletic person performing a heavy bench press in a moody high-end gym with cinematic lighting and deep shadows"
              src={libraryExercise}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10"></div>
            <div className="absolute bottom-0 start-0 p-8 flex flex-col items-start gap-2 z-20">
              <div className="flex items-center gap-3">
                <span className="notranslate material-symbols-outlined text-primary-container">
                  fitness_center
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-primary-container font-bold">
                  {t("tools.exerciseLibrary.tag")}
                </span>
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight text-white">
                {t("tools.exerciseLibrary.title")}
              </h3>
            </div>
          </Link>

          {/* Item 2: Training Splits */}
          <Link
            to="/splits"
            className="rounded-xl p-8 flex flex-col justify-between group cursor-pointer 
            hover:border-primary-container/40 hover:shadow-[0_0_30px_-10px_rgba(0,112,255,0.2)] 
            transition-all duration-700 border border-white/5"
          >
            <div>
              <div
                className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center 
             group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 "
              >
                <span className="notranslate material-symbols-outlined text-white p-4">
                  calendar_view_week
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mt-4">
                {t("tools.trainingSplits.title")}
              </h3>
            </div>

            <div className="p-3 rounded-lg border border-white/5">
              <span className="text-primary-container font-bold  text-sm tracking-wider">
                Tip :
              </span>
              <p className="text-sm  italic text-zinc-400 ">
                {t("tools.trainingSplits.tip")}
              </p>
            </div>
          </Link>

          {/* Item 3: AI Gym Partner */}
          <Link
            to="/aicoach"
            className="rounded-xl bg-surface-container-high p-8 flex flex-col justify-between 
            border border-primary-container/10 relative overflow-hidden cursor-pointer group 
            hover:border-primary-container/40 transition-all duration-700"
          >
            <div className="absolute top-0 end-0 p-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700">
              <span className="notranslate material-symbols-outlined text-primary-container/10 text-8xl">
                forum
              </span>
            </div>

            <div className="z-10">
              <div className="inline-flex items-center gap-2 bg-primary-container/10 px-3 py-1 rounded-full mb-4">
                <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-widest text-primary-container font-black">
                  {t("tools.aiGymPartner.status")}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white leading-tight">
                {t("tools.aiGymPartner.title")}
              </h3>
            </div>

            <div className="z-10 bg-background/60 backdrop-blur-md p-4 rounded-2xl flex items-start gap-3 border border-white/5">
              <span className="notranslate material-symbols-outlined text-primary-container text-xl">
                chat_bubble
              </span>

              <p className="text-sm x italic text-zinc-400 ">
                {t("tools.aiGymPartner.chat")}
              </p>
            </div>
          </Link>

          {/* Item 4: Daily Tip */}
          <Link
            to="/tips"
            className=" md:col-span-2 rounded-xl bg-gradient-to-br from-surface-container to-background 
              p-8 flex flex-col md:flex-row items-center gap-8 border border-white/5 
              cursor-pointer group hover:from-surface-container-high transition-all duration-500"
          >
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-4">
                {t("tools.dailyTip.label")}
              </div>
              <h4 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white leading-none group-hover:tracking-tight transition-all duration-500">
                {t("tools.dailyTip.consistency")} {">"}{" "}
                <span className="text-primary-container group-hover:brightness-125">
                  {t("tools.dailyTip.intensity")}
                </span>
              </h4>
            </div>
            <p className="flex-1 text-on-surface-variant text-sm leading-relaxed font-light line-clamp-3">
              {t("tools.dailyTip.desc")}
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default BentoGrid;

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Hr from "../../components/Hr";
import Note from "../../components/Note";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchSplitByName } from "../../store/slices/splitsSlice";
import ErrorTag from "../../components/ErrorTag";
import SkeletonCard from "../../components/SkeletonCard";
import { useTranslation } from "react-i18next";

const Split = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const location = useLocation();
  const dispatch = useDispatch();
  const { name } = useParams();
  const { currentSplit, status, error } = useSelector((state) => state.splits);
  const splitFromState = location.state?.split;
  const split = splitFromState ? splitFromState : currentSplit;

  useEffect(() => {
    if (!name) return;
    if (splitFromState && splitFromState.name === name) return;
    if (!currentSplit || currentSplit.name !== name) {
      dispatch(fetchSplitByName(name));
    }
  }, [name, splitFromState, currentSplit, dispatch]);

  // == Helper for translation ==
  const getLocalized = (obj, field) => {
    if (!obj) return "";
    return isArabic ? obj[`${field}_ar`] : obj[field];
  };

  // == DEFINING PAGE CONTENT ==
  const navigate = useNavigate();
  useEffect(() => {
    if (!split) {
      navigate("/404", { replace: true });
    }
  }, [split, navigate]);
  if (!split) {
    return null;
  }

  // == Destructure with localized values ==
  const TrainingSessions = (split.trainingDaysSection?.cards || []).map(
    (card) => ({
      ...card,
      title: getLocalized(card, "title"),
      body: getLocalized(card, "body"),
      image: card.image,
    }),
  );
  const schedulesSection = {
    plainTitle: getLocalized(split.schedulesSection, "plainTitle"),
    highlightedTitle: getLocalized(split.schedulesSection, "highlightedTitle"),
    body: getLocalized(split?.schedulesSection?.sectionHeader, "body"),
    schedules: (split.schedulesSection?.schedules || []).map((schedule) => ({
      ...schedule,
      title: getLocalized(schedule, "title"),
      trainingDays: (schedule.trainingDays || []).map((day) => ({
        ...day,
        title: getLocalized(day, "title"),
        subTitle: getLocalized(day, "subTitle"),
        exercises: (day.exercises || []).map((ex) => ({
          ...ex,
          name: getLocalized(ex, "name"),
          muscle: getLocalized(ex, "muscle"),
          url: `/library/${ex.muscle.toLowerCase().replace(/\s+/g, "-")}#exercise-${ex?.webName.toLowerCase().replace(/\s+/g, "-")}`,
        })),
      })),
    })),
    tip: {
      body: getLocalized(split.schedulesSection?.tip, "body"),
      externalUrl: split.schedulesSection?.tip?.externalUrl,
    },
  };

  if (status === "loading") {
    return (
      <>
        <SkeletonCard />
        <div className="flex flex-col gap-12">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </>
    );
  }
  if (status === "failed") return <ErrorTag error={error} />;
  if (!split || !split.name) return <ErrorTag error={t("splitNotFound")} />;

  return (
    <div>
      <Header
        pageHeader={true}
        plainTitle={getLocalized(split.pageHeader, "plainTitle")}
        highlightTitle={getLocalized(split.pageHeader, "highlightedTitle")}
        body={getLocalized(split.pageHeader, "body")}
        className="mb-20"
        image={split?.pageHeader?.image}
        titleSize="text-5xl md:text-6xl"
        bodyClassName="max-w-[280px]"
        isSubPage={true}
      />

      <Hr />

      {/* Training Days Section (cards) */}
      <section>
        <Header
          plainTitle={t("split.sec1PlainTitle")}
          highlightTitle={t("split.sec1highlightedTitle")}
          body={getLocalized(split?.trainingDaysSection?.sectionHeader, "body")}
          className="mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TrainingSessions.map((card, idx) => (
            <Card
              key={card._id || idx}
              rounded="rounded-2xl"
              type="top-image"
              title={card.title}
              image={card.image}
              body={card.body}
            />
          ))}
        </div>
      </section>

      <Hr />

      {/* Schedules Section */}
      <section>
        <Header
          plainTitle={t("split.sec2PlainTitle")}
          highlightTitle={t("split.sec2highlightedTitle")}
          body={schedulesSection.body}
          className="mb-16"
        />

        {schedulesSection.schedules.map((schedule, idx) => {
          const scheduleData = schedule.trainingDays.map((day) => {
            return {
              focus: day.title,
              sub: day.subTitle || "",
              exercises: day.exercises.map((ex) => ({
                name: ex.name,
                url: ex.url,
              })),
              rest: day.isRest || false,
            };
          });

          return (
            <SplitSchedule
              key={schedule._id || idx}
              className="mb-6"
              title={schedule.title}
              schedule={scheduleData}
            />
          );
        })}

        {schedulesSection.tip.body && (
          <Note
            className="max-w-xl"
            body={schedulesSection.tip.body}
            linkText={t("split.learnMore")}
            linkUrl={schedulesSection.tip.externalUrl || "#"}
          />
        )}
      </section>
    </div>
  );
};

export default Split;

const SplitSchedule = ({ title, schedule, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01] ${className}`}
    >
      {/* === HEADER ROW === */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 transition-colors duration-300 ${
          isOpen ? "bg-white/5 border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`material-symbols-outlined !hidden md:!inline-block  transition-colors ${isOpen ? "text-primary-container" : "text-zinc-500"}`}
          >
            fitness_center
          </span>
          <h3 className="text-white text-xl font-black italic uppercase ">
            {title}
          </h3>
        </div>

        <span
          className={`material-symbols-outlined text-zinc-500 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>

      {/* === SCHEDULE CONTENT === */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="divide-y divide-white/5">
            {schedule.map((row, i) => (
              <div
                key={i}
                className={`flex flex-col md:grid md:grid-cols-12 p-6 gap-4 md:gap-0 transition-colors ${row.rest ? "bg-black/40" : ""} `}
              >
                {/* == DAY NAME  == */}
                <div className="md:col-span-4 self-start ">
                  <div className="text-white text-lg font-black italic uppercase leading-relaxed ">
                    {row.focus}
                  </div>
                  <div className=" text-zinc-500 text-[10px] font-bold uppercase tracking-[0.1rem] mt-2">
                    {row.sub}
                  </div>
                </div>

                {/* == DAY MOVEMENTS == */}
                <div className="md:col-span-8 md:pl-6 md:border-l border-white/10 flex items-center pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                  <div className="flex flex-wrap gap-2 w-full">
                    {row.rest ? (
                      <span className="text-zinc-400 text-sm font-bold  tracking-wider uppercase font-medium py-1">
                        RESTING
                      </span>
                    ) : (
                      row.exercises?.map((ex, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            console.log("Navigating to:", ex.url);
                            navigate(ex.url);
                            //
                          }}
                          className="px-3 py-2 md:py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] text-zinc-400 font-bold uppercase tracking-wider hover:text-white hover:border-[#0070FF]/50 transition-colors"
                        >
                          {ex.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

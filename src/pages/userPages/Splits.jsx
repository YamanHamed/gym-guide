import React, { useEffect, useMemo, useRef, useState } from "react";
import cover from "../../imgs/covers/cover-05.png";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Hr from "../../components/Hr";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchSplits } from "../../store/slices/splitsSlice";
import SkeletonCard from "../../components/SkeletonCard";
import ErrorTag from "../../components/ErrorTag";
import QuickLink from "../../components/QuickLink";
import FilterBar from "../../components/FilterBar";
import { useTranslation } from "react-i18next";

const Splits = () => {
  // == GENERAL ==
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.splits);
  const splitsRef = useRef(null);

  // == FECTH SPLITS ==
  useEffect(() => {
    if (status === "idle") dispatch(fetchSplits());
  }, [status, dispatch]);

  // == HANDLERS ==
  const handleCardClick = (split) => {
    navigate(`/splits/${split.name}`, { state: { split } });
  };

  // == HELPER ==
  const getLocalized = (item, field) => {
    return isArabic && item[`${field}_ar`] ? item[`${field}_ar`] : item[field];
  };

  // == SPLITS FILTERING ==
  const dayOptions = [
    { value: "All", label: t("splitsPage.daysFilter.all") },
    { value: "1", label: t("splitsPage.daysFilter.1") },
    { value: "2", label: t("splitsPage.daysFilter.2") },
    { value: "3", label: t("splitsPage.daysFilter.3") },
    { value: "4", label: t("splitsPage.daysFilter.4") },
    { value: "5", label: t("splitsPage.daysFilter.5") },
    { value: "6", label: t("splitsPage.daysFilter.6") },
    { value: "7", label: t("splitsPage.daysFilter.7") },
  ];
  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const filteredSplits = useMemo(() => {
    // If "All" is selected (and it's the only one or explicitly included), show all
    if (selectedFilters.includes("All")) return list;

    // Otherwise, filter splits where the normalized daysAWeek matches any selected filter
    return list.filter((split) => {
      console.log("Selected filters:", selectedFilters);
      return selectedFilters.some((filter) =>
        split.daysAWeek?.includes(
          Number(filter.replace("days/week", "").trim()),
        ),
      );
    });
  }, [list, selectedFilters]);

  return (
    <div>
      <Header
        pageHeader={true}
        plainTitle={t("splitsPage.header.plainTitle")}
        highlightTitle={t("splitsPage.header.highlightTitle")}
        body={t("splitsPage.header.body")}
        image={cover}
        titleSize="text-5xl md:text-6xl"
        bodyClassName="max-w-[280px]"
      />
      <QuickLink
        className="mb-0 sm:mb-16 mt-8 sm:mt-10 "
        label={t("splitsPage.quickLink")}
        targetRef={splitsRef}
      />
      <Hr className="lg:hidden" />

      <section>
        <Header
          className="mb-16"
          plainTitle={t("splitsPage.whatIsSplit.plainTitle")}
          highlightTitle={t("splitsPage.whatIsSplit.highlightTitle")}
          subTitle={t("splitsPage.whatIsSplit.subTitle")}
          body={
            <>
              <p className="mb-1">{t("splitsPage.whatIsSplit.paragraph1")}</p>
              <p>{t("splitsPage.whatIsSplit.paragraph2")}</p>
            </>
          }
        />
        <SplitCreationSection />
      </section>

      <Hr />
      <section>
        <div className=" m-0" ref={splitsRef} />
        <Header
          className="mb-16"
          plainTitle={t("splitsPage.selectSplit.plainTitle")}
          highlightTitle={t("splitsPage.selectSplit.highlightTitle")}
          subTitle={t("splitsPage.selectSplit.subTitle")}
          body={t("splitsPage.selectSplit.body")}
        />
        <FilterBar
          filters={dayOptions}
          value={selectedFilters}
          onChange={setSelectedFilters}
        />
        {status === "failed" && <ErrorTag error={error} />}
        {status === "loading" && (
          <div className="flex flex-col gap-12">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        )}
        {status === "succeeded" && (
          <div className="flex flex-col gap-12">
            {filteredSplits.map((split) => (
              <Card
                tag={t("splitsPage.cardTag", {
                  days: split?.daysAWeek?.join(", "),
                })}
                type="side-image"
                reverse={true}
                key={split._id}
                title={getLocalized(split, "name")}
                links={split.links}
                body={getLocalized(split, "description")}
                image={split.image}
                onClick={() => handleCardClick(split)}
                rounded="rounded-2xl"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Splits;

const SplitCreationSection = () => {
  const { t } = useTranslation();
  const steps = t("splitsPage.splitCreation.steps", { returnObjects: true });
  const icons = [
    "analytics",
    "select_window_2",
    "account_tree",
    "fitness_center",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((item, idx) => (
        <Card
          key={idx}
          type="steps"
          step={`0${idx + 1}`}
          icon={icons[idx]}
          title={item.title}
          body={item.desc}
          className="border border-white/5 hover:border-primary-container/30"
          rounded="rounded-2xl"
        />
      ))}
    </div>
  );
};

import { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { fetchTips } from "../../store/slices/tipsSlice";
import { useDispatch, useSelector } from "react-redux";
import ErrorTag from "../../components/ErrorTag";
import SkeletonCard from "../../components/SkeletonCard";
import FilterBar from "../../components/FilterBar";
import Hr from "../../components/Hr";
import cover from "../../imgs/covers/cover-08.png";
import { useTranslation } from "react-i18next";

const layoutMap = [
  "md:col-span-2", // 0: The Anchor (Wide Left)
  "md:col-span-1", // 1: Technical Detail
  "md:col-span-1", // 2: Technical Detail
  "md:col-span-1", // 3: Technical Detail
  "md:col-span-1", // 4: Technical Detail
  "md:col-span-2", // 5: The Mid-Point Feature (Wide Right)
  "md:col-span-1", // 6: Final Technical Spec
];

const Tips = () => {
  // == GENERAL
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.tips);

  // == FETCH TIPS
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTips());
    }
  }, [status, dispatch]);

  // == HELPER ==
  const getLocalized = (item, field) => {
    return isArabic && item[`${field}_ar`] ? item[`${field}_ar`] : item[field];
  };

  // == TIPS FILTERING ==
  const [selectedFilters, setSelectedFilters] = useState(["general"]);
  const filteredTips = useMemo(() => {
    // If "general" is selected (and it's the only one or explicitly included), show all
    if (selectedFilters.includes("general")) return list;

    // Otherwise, filter tips where the normalized tag matches any selected filter
    return list.filter((tip) =>
      selectedFilters.some((filter) => tip.tags?.includes(filter)),
    );
  }, [list, selectedFilters]);

  return (
    <>
      <Header
        pageHeader={true}
        plainTitle={t("tipsPage.header.plainTitle")}
        highlightTitle={t("tipsPage.header.highlightTitle")}
        subTitle={t("tipsPage.header.subTitle")}
        body={t("tipsPage.header.body")}
        image={cover}
        titleSize="text-5xl md:text-6xl"
        bodyClassName="max-w-[280px]"
      />
      <Hr className="!mt-0" />
      <Header
        className="mb-16 hidden lg:block"
        plainTitle={t("tipsPage.secondHeader.plainTitle")}
        highlightTitle={t("tipsPage.secondHeader.highlightTitle")}
        body={t("tipsPage.secondHeader.body")}
      />
      <FilterBar
        className="mb-12"
        filters={[
          { value: "general", label: isArabic ? "عام" : "general" },
          { value: "exercises", label: isArabic ? "تمارين" : "exercises" },

          { value: "splits", label: isArabic ? "جداول تدريبية" : "splits" },
          { value: "nutrition", label: isArabic ? "تغذية" : "nutrition" },
        ]}
        value={selectedFilters}
        onChange={setSelectedFilters}
      />

      {status === "loading" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonCard
              key={idx}
              className={`${layoutMap[idx % layoutMap.length]} flex flex-col h-full`}
            />
          ))}
        </div>
      )}
      {status === "failed" && <ErrorTag error={error} />}
      {status === "succeeded" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
          {filteredTips.map((tip, i) => {
            return (
              <Card
                key={tip._id || i}
                tag={
                  tip.tags?.length
                    ? `[ ${tip.tags.map((tip) => t(`tipsPage.filters.${tip}`)).join(", ")} ]`
                    : null
                }
                title={getLocalized(tip, "title")}
                body={getLocalized(tip, "content")}
                icon={tip.icon || "fitness_center"}
                className={`${layoutMap[i % layoutMap.length]} flex flex-col h-full`}
                links={tip.links}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Tips;

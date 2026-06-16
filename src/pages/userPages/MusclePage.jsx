import Header from "../../components/Header";
import Hr from "../../components/Hr";
import Card from "../../components/Card";
import SkeletonCard from "../../components/SkeletonCard";
import ErrorTag from "../../components/ErrorTag";
import { useNavigate, useParams } from "react-router-dom";
import { MUSCLE_DETAILS } from "../../constants/muscleData";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExercisesByMuscle } from "../../store/slices/exercisesSlice";
import FilterBar from "../../components/FilterBar";
import Note from "../../components/Note";
import QuickLink from "../../components/QuickLink";
import { useTranslation } from "react-i18next";

const MusclePage = () => {
  // == GENERAL ==
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { muscle } = useParams(); // 'chest', 'back', etc.
  const dispatch = useDispatch();
  const { muscleCache } = useSelector((state) => state.exercises);
  const exercisesData = muscleCache[muscle] || {
    status: "idle",
    data: [],
    error: null,
  };
  // == HELPER TO GET LOCALIZED STRING FROM AN OBJECT ==
  const localize = (item, field) => {
    return isArabic && item[`${field}_ar`] ? item[`${field}_ar`] : item[field];
  };

  // == DEFINING PAGE CONTENT ==
  const navigate = useNavigate();
  useEffect(() => {
    if (!muscle || !MUSCLE_DETAILS[muscle]) {
      navigate("/404", { replace: true });
    }
  }, [muscle, navigate]);

  // == THE MUSCLE DATA ==
  const muscleData = MUSCLE_DETAILS[muscle];

  // == THE EXERCISES DATA ==
  const exercisesRef = useRef(null);
  useEffect(() => {
    console.log(exercisesData);
    if (exercisesData.status === "idle") {
      dispatch(fetchExercisesByMuscle(muscle));
    }
  }, [muscle, exercisesData.status, dispatch]);

  // == SCROLLING TO EXERCISES WHEN SEARCHED ==
  useEffect(() => {
    if (exercisesData.status === "succeeded") {
      const hash = location.hash;
      if (hash && hash.startsWith("#exercise-")) {
        const exerciseName = hash.replace("#exercise-", "");
        // Small delay ensures DOM is ready
        setTimeout(() => {
          const element = document.getElementById(`exercise-${exerciseName}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercisesData.status, location.hash]);

  // == EXERCISES FILTERING ==
  const filterOptions = [
    { value: "All", label: isArabic ? "الكل" : "All" },
    ...(muscleData?.headNames || []).map((head, idx) => ({
      value: head,
      label: isArabic ? muscleData.headNames_ar[idx] : head,
    })),
  ];
  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const normalize = (str) => str?.toLowerCase().replace(/[\s-]/g, "") || ""; // Helper to normalize strings for flexible comparison
  const filteredExercises = useMemo(() => {
    // If "All" is selected (and it's the only one or explicitly included), show all
    if (selectedFilters.includes("All")) return exercisesData.data;

    // Otherwise, filter exercises where the normalized muscleHead matches any selected filter
    if (exercisesData.data) {
      return exercisesData.data.filter((ex) =>
        selectedFilters.some(
          (filter) => normalize(ex.muscleHead) === normalize(filter),
        ),
      );
    } else {
      return [];
    }
  }, [exercisesData.data, selectedFilters]);

  return (
    <div>
      <Header
        pageHeader={true}
        plainTitle={localize(muscleData?.pageHeader, "plainTitle")}
        highlightTitle={localize(muscleData?.pageHeader, "highlightedTitle")}
        body={localize(muscleData?.pageHeader, "body")}
        image={muscleData?.pageHeader?.image}
        imageClassName="opacity-30"
        titleSize="text-5xl md:text-6xl"
        bodyClassName="max-w-[280px]"
      />

      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle={localize(muscleData?.sectionHeader, "plainTitle")}
          highlightTitle={localize(
            muscleData?.sectionHeader,
            "highlightedTitle",
          )}
          body={localize(muscleData?.sectionHeader, "body")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {muscleData?.heads.map((head) => {
            return (
              <Card
                key={head.id}
                rounded="rounded-2xl"
                type="top-image"
                image={head.image}
                title={localize(head, "name")}
                body={localize(head, "description")}
                links={head.links}
                imageClassName="brightness-90  object-contain"
              />
            );
          })}
        </div>
        {muscleData?.sectionHeader?.note && (
          <Note
            className="mt-10 px-6 md:px-2 max-w-xl "
            body={localize(muscleData?.sectionHeader, "note")}
          />
        )}
      </section>

      {/* ==  EXERCISES SECTION ==  */}
      <Hr />
      <div className=" m-0" ref={exercisesRef} />
      <section>
        <Header
          className="mb-16"
          plainTitle={isArabic ? "تمارين" : muscleData.pageHeader.plainTitle}
          highlightTitle={
            isArabic ? muscleData.pageHeader.highlightedTitle_ar : "exercises"
          }
          body={
            isArabic
              ? `تعرف على أفضل التمارين لبناء عضلات ${muscleData.pageHeader.highlightedTitle_ar} و كيفية ادائهم`
              : `check the best exercises to build your ${muscle}, and how to perform them`
          }
        />

        <FilterBar
          filters={filterOptions}
          value={selectedFilters}
          onChange={setSelectedFilters}
        />

        {exercisesData.status === "loading" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {exercisesData.status === "failed" && (
          <div className="mt-12">
            <ErrorTag error={exercisesData.error} />
          </div>
        )}

        {exercisesData.status === "succeeded" && (
          <>
            {exercisesData.data.length === 0 ? (
              <div className="text-zinc-400 text-center py-12 mt-12">
                No exercises found for {muscle}.
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-12">
                {filteredExercises.map((ex) => (
                  <Card
                    key={ex._id}
                    id={`exercise-${ex.name.toLowerCase().replace(/\s+/g, "-")}`}
                    type="side-image"
                    title={localize(ex, "name")}
                    tag={localize(ex, "muscleHead")}
                    body={localize(ex, "description")}
                    image={ex.image}
                    links={ex.links || []}
                    rounded="rounded-2xl"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default MusclePage;

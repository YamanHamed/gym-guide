import Header from "../../components/Header";
import Hr from "../../components/Hr";
import Card from "../../components/Card";
import SkeletonCard from "../../components/SkeletonCard";
import ErrorTag from "../../components/ErrorTag";
import { useNavigate, useParams } from "react-router-dom";
import { MUSCLE_DETAILS } from "../../constants/muscleData";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExercisesByMuscle } from "../../store/slices/exercisesSlice";
import FilterBar from "../../components/FilterBar";
import Note from "../../components/Note";

const MusclePage = () => {
  // == GENERAL ==
  const { muscle } = useParams(); // 'chest', 'back', etc.
  const dispatch = useDispatch();
  const { muscleCache } = useSelector((state) => state.exercises);
  const exercisesData = muscleCache[muscle] || {
    status: "idle",
    data: [],
    error: null,
  };

  // == DEFINING PAGE CONTENT ==
  const navigate = useNavigate();
  useEffect(() => {
    if (!muscle || !MUSCLE_DETAILS[muscle]) {
      navigate("/404", { replace: true });
    }
  }, [muscle, navigate]);

  // == THE MUSCLE DATA ==
  const MuscleData = MUSCLE_DETAILS[muscle];

  // == THE EXERCISES DATA ==
  useEffect(() => {
    if (exercisesData.status === "idle") {
      dispatch(fetchExercisesByMuscle(muscle));
    }
  }, [muscle, exercisesData.status, dispatch]);

  // == SCROLLING TO EXERCISES WHEN SEARCHED ==
  useEffect(() => {
    if (exercisesData.status === "succeeded") {
      const hash = location.hash;
      if (hash && hash.startsWith("#exercise-")) {
        const exerciseId = hash.replace("#exercise-", "");
        // Small delay ensures DOM is ready
        setTimeout(() => {
          const element = document.getElementById(`exercise-${exerciseId}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercisesData.status, location.hash]);

  // == EXERCISES FILTERING ==
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
        className="mb-16"
        pageHeader={true}
        plainTitle={MuscleData?.pageHeader?.plainTitle}
        highlightTitle={MuscleData?.pageHeader?.highlightedTitle}
        body={MuscleData?.pageHeader?.body}
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
        imageClassName="opacity-30"
        titleSize="text-5xl md:text-7xl"
        bodyClassName="max-w-[280px]"
      />

      {/* == MUSCLE ANATOMY SECTION ==  */}
      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle={MuscleData?.sectionHeader?.plainTitle}
          highlightTitle={MuscleData?.sectionHeader?.highlightedTitle}
          body={MuscleData?.sectionHeader?.body}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {MuscleData?.heads.map((head) => {
            return (
              <Card
                key={head.id}
                rounded="rounded-2xl"
                type="top-image"
                image={head.image}
                title={head.name}
                body={head.description}
                links={head.links}
                imageClassName="brightness-90  object-contain"
              />
            );
          })}
        </div>
        {MuscleData?.sectionHeader?.note && (
          <Note
            className="mt-10 px-6 md:px-2 max-w-xl "
            body={MuscleData.sectionHeader.note}
          />
        )}
      </section>

      {/* ==  EXERCISES SECTION ==  */}
      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle={muscle}
          highlightTitle="exercises"
          subTitle="One Goal, Multiple Paths"
          body={`check the best exercises to build your ${muscle}, and how to perform them`}
        />

        <FilterBar
          filters={["All", ...(MuscleData?.headNames || [])]}
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
                    id={`exercise-${ex._id}`}
                    type="side-image"
                    title={ex.name}
                    tag={ex.muscleHead || ex.muscle}
                    body={ex.description}
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

      <Hr className="mt-32" />
    </div>
  );
};

export default MusclePage;

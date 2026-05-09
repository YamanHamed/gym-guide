import Header from "../../components/Header";
import Hr from "../../components/Hr";
import Card from "../../components/Card";
import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { MUSCLE_DETAILS } from "../../constants/muscleData";
// import { fetchExercisesByMuscle } from "../store/slices/exercisesSlice";

const MusclePage = () => {
  const { muscle } = useParams(); // 'chest', 'back', etc.
  // const dispatch = useDispatch();

  // == THE MUSCLE DATA ==
  const MuscleData = MUSCLE_DETAILS[muscle];

  // == THE EXERCISES DATA ==
  // const { data: exercises, loading } = useSelector((state) => state.exercises);

  // useEffect(() => {
  //   if (muscle) {
  //     dispatch(fetchExercisesByMuscle(muscle));
  //   }
  // }, [muscle, dispatch]);

  // if (!MuscleData) return <div>Muscle not found.</div>; // todo: 404 handling

  return (
    <div>
      <Header
        className="mb-16"
        pageHeader={true}
        plainTitle={MuscleData.pageHeader.plainTitle}
        highlightTitle={MuscleData.pageHeader.highlightedTitle}
        body={MuscleData.pageHeader.body}
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
          plainTitle={MuscleData.sectionHeader.plainTitle}
          highlightTitle={MuscleData.sectionHeader.highlightedTitle}
          body={MuscleData.sectionHeader.body}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {MuscleData.heads.map((head) => {
            return (
              <Card
                key={head.id}
                rounded="rounded-2xl"
                type="top-image"
                image={head.image}
                title={head.name}
                body={head.description}
                links={head.links}
              />
            );
          })}
        </div>
      </section>

      {/* ==  EXERCISES SECTION ==  */}
      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle="THEORY &"
          highlightTitle="SYNERGY"
          subTitle="One Goal, Multiple Paths"
          body="Hypertrophy is a result of total weekly volume. Whether you hit a muscle once, twice, or three times a week, the physiological destination is the same."
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-12">
          <Card
            links={[
              { label: "Long Head Mechanics", url: "#" },
              { label: "Shoulder  Study", url: "#" },
              { label: " Position Study", url: "#" },
            ]}
            type="side-image"
            title="Lat Pull Down"
            tag="Hypertrophy"
            body="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sdigne pwogwjrog oirwoowdoluul ghyaut bulat sr "
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGYlMjB1cHBlciUyMGxvd2VyJTIwc2VjdGlvbnnwZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            rounded="rounded-2xl"
          />

          <Card
            links={[
              { label: "Long Head Mechanics", url: "#" },
              { label: "Shoulder  Study", url: "#" },
              { label: " Position Study", url: "#" },
            ]}
            type="side-image"
            title="Lat Pull Down"
            tag="Hypertrophy"
            body="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGYlMjB1cHBlciUyMGxvd2VyJTIwc2VjdGlvbnnwZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            rounded="rounded-2xl"
          />
        </div>
      </section>

      <Hr className="mt-32" />
    </div>
  );
};

export default MusclePage;

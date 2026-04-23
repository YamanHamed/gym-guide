import chestCardImg from "../imgs/chest-card-img.png";
import backCardImg from "../imgs/back-card-img.png";
import legsCardImg from "../imgs/legs-card-img.png";
import shouldersCardImg from "../imgs/shoulders-card-img.png";
import tricepsCardImg from "../imgs/triceps-card-img.jpg";
import bicepsCardImg from "../imgs/biceps-card-img.png";
import absCardImg from "../imgs/abs-card-img.png";
import forearmsCardImg from "../imgs/forearms-card-img.png";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Card from "../components/Card";
import Hr from "../components/Hr";
import cover from "../imgs/gym-cover-02.jpg";
import Anatomy from "../components/Anatomy";
import { useEffect } from "react";
import QuickLink from "../components/QuickLink";
const muscleGroups = [
  {
    id: "01",
    title: "Chest",
    label: "CHEST",
    accent: "PUSH",
    count: "18 Exercises",
    img: chestCardImg,
    size: "md:col-span-2 md:row-span-2",
    large: true,
  },
  {
    id: "02",
    title: "Back",
    label: "BACK",
    accent: "PULL",
    count: "22 Exercises",
    img: backCardImg,
    size: "md:col-span-2",
  },
  {
    id: "04",
    title: "Shoulders",
    accent: "DELTOIDS",
    img: shouldersCardImg,
    size: "md:col-span-1",
  },
  {
    id: "03",
    title: "Legs",
    accent: "LOWER",
    img: legsCardImg,
    size: "md:col-span-1",
  },
  {
    id: "05",
    title: "Biceps",
    accent: "ARMS",
    img: bicepsCardImg,
    size: "md:col-span-1",
  },
  {
    id: "06",
    title: "Triceps",
    accent: "ARMS",
    img: tricepsCardImg,
    size: "md:col-span-1",
  },
  {
    id: "07",
    title: "Abs",
    accent: "CORE",
    img: absCardImg,
    size: "md:col-span-1",
  },
  {
    id: "08",
    title: "Forearms",
    accent: "GRIP",
    img: forearmsCardImg,
    size: "md:col-span-1",
  },
];
const Library = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <Header
        // className="mb-16"
        pageHeader={true}
        plainTitle="EXERCISES"
        highlightTitle="LIBRARY"
        subTitle="Optimize Every Rep"
        body="Scientific progression starts with technical mastery."
        image={cover}
        titleSize="text-5xl md:text-7xl"
        bodyClassName="max-w-[280px]"
      />

      <QuickLink />
      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle="TRAINING"
          highlightTitle="MECHANICS"
          subTitle="The Science of Hypertrophy"
          body="Muscle growth is governed by three primary pillars: Mechanical Tension, Metabolic Stress, and Progressive Overload. While frequency and exercise selection can vary, the total effective volume—the number of hard sets taken close to failure each week—is the master variable that dictates your physiological adaptation."
        />
        <Anatomy />
      </section>
      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle="EXERCISE"
          highlightTitle="DIRECTORY"
          subTitle="Targeted Training Protocols"
          body="Access our comprehensive library of movements categorized by physiological region. Select a muscle group to initialize specific training protocols, ensuring every set aligns with your structural objectives and maximizes fiber recruitment."
        />
        {/* ==  MUSCLES GRID == */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-8 ">
          {muscleGroups.map((group) => (
            <Card
              className={group.size}
              rounded="rounded-xl"
              type="full-image"
              title={group.title}
              tag={group.accent}
              image={group.img}
              key={group.id}
              onClick={() => {
                navigate("/exercises");
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Library;

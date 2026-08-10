import chestCardImg from "../../imgs/chest-card-img.png";
import backCardImg from "../../imgs/back-card-img.png";
import legsCardImg from "../../imgs/legs-card-img.png";
import shouldersCardImg from "../../imgs/shoulders-card-img.png";
import tricepsCardImg from "../../imgs/triceps-card-img.jpg";
import bicepsCardImg from "../../imgs/biceps-card-img.png";
import absCardImg from "../../imgs/abs-card-img.png";
import forearmsCardImg from "../../imgs/forearms-card-img.png";
import cover from "../../imgs/covers/cover-02.png";

import { useNavigate } from "react-router";
import { useRef } from "react";

import Header from "../../components/Header";
import Card from "../../components/Card";
import Hr from "../../components/Hr";
import Anatomy from "../../components/Anatomy";
import QuickLink from "../../components/QuickLink";
import { useTranslation } from "react-i18next";

const muscleGroups = [
  {
    id: "01",
    titleKey: "chest",
    accentKey: "push",
    count: 18,
    img: chestCardImg,
    size: "md:col-span-2 md:row-span-2",
    large: true,
  },
  {
    id: "02",
    titleKey: "back",
    accentKey: "pull",
    count: 22,
    img: backCardImg,
    size: "md:col-span-2",
  },
  {
    id: "04",
    titleKey: "shoulders",
    accentKey: "deltoids",
    count: null,
    img: shouldersCardImg,
    size: "md:col-span-1",
  },
  {
    id: "03",
    titleKey: "legs",
    accentKey: "lower",
    count: null,
    img: legsCardImg,
    size: "md:col-span-1",
  },
  {
    id: "05",
    titleKey: "biceps",
    accentKey: "arms",
    count: null,
    img: bicepsCardImg,
    size: "md:col-span-1",
  },
  {
    id: "06",
    titleKey: "triceps",
    accentKey: "arms",
    count: null,
    img: tricepsCardImg,
    size: "md:col-span-1",
  },
  {
    id: "07",
    titleKey: "abs",
    accentKey: "core",
    count: null,
    img: absCardImg,
    size: "md:col-span-1",
  },
  {
    id: "08",
    titleKey: "forearms",
    accentKey: "grip",
    count: null,
    img: forearmsCardImg,
    size: "md:col-span-1",
  },
];

const Library = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const libraryRef = useRef(null);

  return (
    <div>
      <Header
        // className="mb-16"
        pageHeader={true}
        plainTitle={t("libraryPage.header.plainTitle")}
        highlightTitle={t("libraryPage.header.highlightTitle")}
        body={t("libraryPage.header.body")}
        image={cover}
        titleSize="text-5xl md:text-6xl"
        bodyClassName="max-w-[280px]"
      />

      <QuickLink
        className="mb-0 sm:mb-16 mt-8 sm:mt-10 "
        label={t("libraryPage.quickLink")}
        targetRef={libraryRef}
      />
      <Hr className="lg:hidden" />
      <section>
        <Header
          className="mb-16"
          plainTitle={t("libraryPage.anatomySection.plainTitle")}
          highlightTitle={t("libraryPage.anatomySection.highlightTitle")}
          subTitle={t("libraryPage.anatomySection.subTitle")}
          bodyClassName="!max-w-3xl"
          body={
            <>
              <p className="mb-1">
                {t("libraryPage.anatomySection.paragraph1")}
              </p>
              <p>{t("libraryPage.anatomySection.paragraph2")}</p>
            </>
          }
        />
        <Anatomy />
      </section>
      <Hr />
      <section ref={libraryRef}>
        <Header
          className="mb-16"
          plainTitle={t("libraryPage.muscleGroupsSection.plainTitle")}
          highlightTitle={t("libraryPage.muscleGroupsSection.highlightTitle")}
          subTitle={t("libraryPage.muscleGroupsSection.subTitle")}
          body={t("libraryPage.muscleGroupsSection.body")}
        />
        {/* ==  MUSCLES GRID == */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-8 ">
          {muscleGroups.map((group) => {
            return (
              <Card
                id={group.id}
                className={group.size}
                rounded="rounded-xl"
                type="full-image"
                title={t(`libraryPage.muscleNames.${group.titleKey}`)}
                tag={t(`libraryPage.muscleAccents.${group.accentKey}`)}
                image={group.img}
                key={group.id}
                onClick={() => {
                  navigate("/library/" + group.titleKey.toLowerCase());
                }}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};
export default Library;

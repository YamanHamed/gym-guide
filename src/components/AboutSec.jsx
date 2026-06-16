import React from "react";
import Header from "./Header";
import Hr from "./Hr";
import Card from "./Card";
import { useTranslation } from "react-i18next";

const STEPS = [
  {
    step: "01",
    title: "EXPLORE",
    icon: "database",
    desc: "Check the exercises and splits sections to understand the basic anatomy of the body and the how exercising works. ",
  },
  {
    step: "02",
    title: "SELECT",
    icon: "architecture",
    desc: 'After understanding basic muscle anatomy and knowing "What is an exercise?" and "What is a split?", choose one of the splits that suits your routine, or try creating one yourself!',
  },
  {
    step: "03",
    title: "CONSULT",
    icon: "smart_toy",
    desc: "Ask the Ai coach for anything you find confusing. And of course we encourage you to search in other references to know exactly what you are donig in the gym ",
  },
];

const AboutSec = () => {
  const { t } = useTranslation();
  const steps = t("about.steps", { returnObjects: true }); // array of { title, desc }

  return (
    <>
      <Hr />
      <section className="max-w-7xl mx-auto">
        <Header
          className="mb-16"
          plainTitle={t("about.plainTitle")}
          highlightTitle={t("about.highlightTitle")}
          body={t("about.body")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <Card
              type="steps"
              key={idx}
              step={`0${idx + 1}`} // or keep static "01", "02", "03"
              icon={["database", "architecture", "smart_toy"][idx]}
              title={item.title}
              body={item.desc}
              className="border border-white/5 hover:border-primary-container/30"
              rounded="rounded-2xl"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutSec;

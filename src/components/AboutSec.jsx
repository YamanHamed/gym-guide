import React from "react";
import Header from "./Header";
import Hr from "./Hr";
import Card from "./Card";
import { useTranslation } from "react-i18next";

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
              icon={["search", "check_small", "smart_toy"][idx]}
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

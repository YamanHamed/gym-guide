// src/pages/CreatePage.jsx
import React from "react";
import { useParams } from "react-router-dom";

import CreateExerciseForm from "../../components/forms/CreateExerciseForm";
import CreateSplitForm from "../../components/forms/CreateSplitForm";
import CreateTipForm from "../../components/forms/CreateTipForm";
import Header from "../../components/Header";
import Hr from "../../components/Hr";

const CreatePage = () => {
  const { type } = useParams();

  const renderForm = () => {
    switch (type) {
      case "exercises":
        return <CreateExerciseForm />;
      case "splits":
        return <CreateSplitForm />;
      case "tips":
        return <CreateTipForm />;
      default:
        return <div className="text-white">Invalid creation type</div>;
    }
  };

  return (
    <div className=" mx-auto">
      <section className="px-10">
        <Header
          plainTitle="Create "
          highlightTitle={
            type === "exercises"
              ? "Exercise"
              : type === "splits"
                ? "Split"
                : "Tip"
          }
          body="Fill in the details below to add a new entry."
        />
        <Hr label="fill the form" />
      </section>
      <section className=" md:px-10"> {renderForm()}</section>
    </div>
  );
};

export default CreatePage;

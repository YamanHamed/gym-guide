import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExercises,
  deleteExercise,
} from "../../store/slices/exercisesSlice";
import { fetchSplits, deleteSplit } from "../../store/slices/splitsSlice";

import Hr from "../../components/Hr";
import Card from "../../components/Card";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import ErrorTag from "../../components/ErrorTag";
import { useModal } from "../../contexts/ModalContext";
import { deleteTip, fetchTips } from "../../store/slices/tipsSlice";

const BrowsePage = () => {
  // == PARAMS
  const { type } = useParams();
  const navigate = useNavigate();

  const validTypes = ["exercises", "splits", "tips"];

  useEffect(() => {
    if (!type || !validTypes.includes(type.toLowerCase())) {
      navigate("/404", { replace: true, state: { role: "admin" } });
    }
  }, [type, navigate]);

  // If invalid, return null while redirecting
  if (!type || !validTypes.includes(type.toLowerCase())) {
    return null;
  }

  return (
    <div className="px-10">
      <Header
        plainTitle="browse "
        highlightTitle={type}
        body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum quae reprehenderit architecto, ad, "
      />
      <Hr label={`latest ${type}`} />
      {type.toLowerCase() === "exercises" && <Exercises />}
      {type.toLowerCase() === "splits" && <Splits />}
      {type.toLowerCase() === "tips" && <Tips />}
    </div>
  );
};

export default BrowsePage;

const Exercises = () => {
  // == GENERAL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // == METHODS AND HOOKS
  const { openModal } = useModal();
  const { list, status, error } = useSelector((state) => state.exercises);

  // == FETCHING EXERCISES
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExercises());
    }
  }, [status, dispatch]);

  // == HANDLERS
  const handleEdit = (exercise) => {
    navigate("/dashboard/create/exercises", {
      state: { exercise, isEditing: true },
    });
  };
  const handleDelete = (id) => {
    openModal({
      title: "Delete Exercise",
      message: "This action cannot be undone. Are you sure?",
      confirmText: "Delete",
      confirmVariant: "danger",
      onConfirm: async () => {
        try {
          await dispatch(deleteExercise(id)).unwrap(); // ← .unwrap() throws on failure
          toast.success("Exercise deleted successfully");
        } catch (err) {
          console.error(err);
          toast.error(err || "Delete failed");
        }
      },
    });
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading exercises...</div>
      </div>
    );
  }
  if (status === "failed") {
    return <ErrorTag error={error} />;
  }
  return (
    <div>
      {list.length === 0 ? (
        <div className="text-zinc-400 text-center py-12">
          No exercises found. Create your first exercise!
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {list.map((exercise) => (
            <div key={exercise._id} className="relative">
              <Card
                links={exercise.links}
                type="side-image"
                title={exercise.name}
                body={exercise.description}
                image={exercise.image}
                imageAlt={exercise.name}
                rounded="rounded-2xl"
                className="h-full"
              />
              <div className=" overflow-hidden md:rounded-2xl absolute bg-[#131313] top-6 right-6">
                <div className="flex justify-end flex-col sm:flex-row md:gap-2">
                  <Button
                    type="custom"
                    icon="edit"
                    onClick={() => handleEdit(exercise)}
                    className="!p-2 hover:bg-white/10"
                  />
                  <Button
                    type="custom"
                    icon="delete"
                    onClick={() => handleDelete(exercise._id)}
                    className="!p-2  text-red-400 hover:text-red-300 hover:bg-white/10"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Splits = () => {
  // == GENERAL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // == METHODS AND HOOKS
  const { openModal } = useModal();
  const { list, status, error } = useSelector((state) => state.splits);

  // == FETCHING SPLITS
  useEffect(() => {
    if (status === "idle") dispatch(fetchSplits());
  }, [status, dispatch]);

  // == HANDLERS
  const handleEdit = (split) => {
    navigate("/dashboard/create/splits", { state: { split, isEditing: true } });
  };
  const handleDelete = (id) => {
    openModal({
      title: "Delete Split",
      message: "This action cannot be undone. Are you sure?",
      confirmText: "Delete",
      confirmVariant: "danger",
      onConfirm: async () => {
        try {
          await dispatch(deleteSplit(id)).unwrap(); // ← .unwrap() throws on failure
          toast.success("Split deleted successfully");
        } catch (err) {
          console.error(err);
          toast.error(err || "Delete failed");
        }
      },
    });
  };

  if (status === "loading") return <div>Loading splits...</div>;
  if (status === "failed") return <ErrorTag error={error} />;

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {list.map((split) => (
          <div key={split._id} className="relative">
            <Card
              links={split.links}
              type="side-image"
              reverse
              title={split.name}
              body={split.description}
              image={split.image}
              imageAlt={split.name}
              rounded="rounded-2xl"
              className="h-full"
            />
            <div className=" overflow-hidden md:rounded-2xl absolute bg-[#131313] top-6 right-6 md:right-auto md:left-6">
              <div className="flex justify-end flex-col sm:flex-row md:gap-2">
                <Button
                  type="custom"
                  icon="edit"
                  onClick={() => handleEdit(split)}
                  className="!p-2 hover:bg-white/10"
                />
                <Button
                  type="custom"
                  icon="delete"
                  onClick={() => handleDelete(split._id)}
                  className="!p-2  text-red-400 hover:text-red-300 hover:bg-white/10"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Tips = () => {
  // == GENERAL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { list, status, error } = useSelector((state) => state.tips);
  // == FETCH TIPS
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTips());
    }
  }, [status, dispatch]);
  // == HANDLERS
  const handleEdit = (tip) => {
    navigate("/dashboard/create/tips", { state: { tip, isEditing: true } });
  };
  const handleDelete = (id) => {
    openModal({
      title: "Delete Tip",
      message:
        "Are you sure you want to delete this tip? This action cannot be undone.",
      confirmText: "Delete",
      confirmVariant: "danger",
      onConfirm: async () => {
        try {
          await dispatch(deleteTip(id)).unwrap();
          toast.success("Tip deleted successfully");
        } catch (err) {
          toast.error(err || "Delete failed");
        }
      },
    });
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading tips...</div>
      </div>
    );
  }
  if (status === "failed") {
    return <ErrorTag error={error} />;
  }
  return (
    <div>
      {list.length === 0 ? (
        <div className="text-zinc-400 text-center py-12">
          No tips yet. Create your first tip!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((tip) => (
            <div key={tip._id} className="relative">
              <Card
                links={tip.links}
                title={tip.title}
                body={tip.content}
                rounded="rounded-2xl"
              />
              <div className=" overflow-hidden md:rounded-2xl absolute bg-[#131313] top-6 right-6">
                <div className="flex justify-end flex-col sm:flex-row md:gap-2">
                  <Button
                    type="custom"
                    icon="edit"
                    onClick={() => handleEdit(tip)}
                    className="!p-2 hover:bg-white/10"
                  />
                  <Button
                    type="custom"
                    icon="delete"
                    onClick={() => handleDelete(tip._id)}
                    className="!p-2  text-red-400 hover:text-red-300 hover:bg-white/10"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

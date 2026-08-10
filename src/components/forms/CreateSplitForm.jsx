import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, useBlocker } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import Input from "../Input";
import Card from "../Card";
import toast from "react-hot-toast";
import { useModal } from "../../contexts/ModalContext";
import { createSplit, updateSplit } from "../../store/slices/splitsSlice";
import { uploadImage } from "../../utils/uploadImage";
import ErrorTag from "../ErrorTag";

const CreateSplitForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { openModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { status, error } = useSelector((state) => state.splits);

  // ===  HANDELING QUITING WITOUT SAVING ===
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);
  // Block client‑side navigation
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
  );
  useEffect(() => {
    if (blocker.state === "blocked") {
      openModal({
        title: "Unsaved changes",
        message: "You have unsaved changes. Are you sure you want to leave?",
        confirmText: "Leave",
        cancelText: "Stay",
        onConfirm: () => {
          blocker.proceed();
          setHasUnsavedChanges(false);
        },
        onCancel: () => blocker.reset(),
      });
    }
  }, [blocker, openModal]);

  // === MAIN STATE  ===
  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    daysAWeek: [],
    description: "",
    description_ar: "",
    image: "",
    links: [],
    pageHeader: {
      plainTitle: "",
      plainTitle_ar: "",
      highlightedTitle: "",
      highlightedTitle_ar: "",
      body: "",
      body_ar: "",
      image: "",
    },
    trainingDaysSection: {
      sectionHeader: {
        plainTitle: "",
        plainTitle_ar: "",
        highlightedTitle: "",
        highlightedTitle_ar: "",
        body: "",
        body_ar: "",
      },
      cards: [],
    },
    schedulesSection: {
      sectionHeader: {
        plainTitle: "",
        plainTitle_ar: "",
        highlightedTitle: "",
        highlightedTitle_ar: "",
        body: "",
        body_ar: "",
      },
      schedules: [],
      tip: { body: "", body_ar: "", externalUrl: "" },
    },
    importance: 5,
  });

  // Populate form when editing
  useEffect(() => {
    if (location.state?.isEditing && location.state?.split) {
      const split = location.state.split;
      setIsEditing(true);
      setEditingId(split._id);
      setFormData({
        name: split.name || "",
        name_ar: split.name_ar || "",
        daysAWeek: split.daysAWeek || [],
        description: split.description || "",
        description_ar: split.description_ar || "",
        image: split.image || "",
        links: (split.links || []).map((link) => ({
          label: link.label,
          label_ar: link.label_ar || "",
          url: link.url,
        })),
        pageHeader: {
          plainTitle: split.pageHeader?.plainTitle || "",
          plainTitle_ar: split.pageHeader?.plainTitle_ar || "",
          highlightedTitle: split.pageHeader?.highlightedTitle || "",
          highlightedTitle_ar: split.pageHeader?.highlightedTitle_ar || "",
          body: split.pageHeader?.body || "",
          body_ar: split.pageHeader?.body_ar || "",
          image: split.pageHeader?.image || "",
        },
        trainingDaysSection: {
          sectionHeader: {
            plainTitle:
              split.trainingDaysSection?.sectionHeader?.plainTitle || "",
            plainTitle_ar:
              split.trainingDaysSection?.sectionHeader?.plainTitle_ar || "",
            highlightedTitle:
              split.trainingDaysSection?.sectionHeader?.highlightedTitle || "",
            highlightedTitle_ar:
              split.trainingDaysSection?.sectionHeader?.highlightedTitle_ar ||
              "",
            body: split.trainingDaysSection?.sectionHeader?.body || "",
            body_ar: split.trainingDaysSection?.sectionHeader?.body_ar || "",
          },
          cards: (split.trainingDaysSection?.cards || []).map((card) => ({
            title: card.title,
            title_ar: card.title_ar || "",
            body: card.body,
            body_ar: card.body_ar || "",
            image: card.image || "",
          })),
        },
        schedulesSection: {
          sectionHeader: {
            plainTitle: split.schedulesSection?.sectionHeader?.plainTitle || "",
            plainTitle_ar:
              split.schedulesSection?.sectionHeader?.plainTitle_ar || "",
            highlightedTitle:
              split.schedulesSection?.sectionHeader?.highlightedTitle || "",
            highlightedTitle_ar:
              split.schedulesSection?.sectionHeader?.highlightedTitle_ar || "",
            body: split.schedulesSection?.sectionHeader?.body || "",
            body_ar: split.schedulesSection?.sectionHeader?.body_ar || "",
          },
          schedules: (split.schedulesSection?.schedules || []).map(
            (schedule) => ({
              title: schedule.title,
              title_ar: schedule.title_ar || "",
              trainingDays: (schedule.trainingDays || []).map((day) => ({
                title: day.title,
                title_ar: day.title_ar || "",
                subTitle: day.subTitle || "",
                subTitle_ar: day.subTitle_ar || "",
                exercises: (day.exercises || []).map((ex) => ({
                  name: ex.name,
                  name_ar: ex.name_ar || "",
                  webName: ex.webName || "",
                  muscle: ex.muscle,
                  muscle_ar: ex.muscle_ar || "",
                })),
              })),
            }),
          ),
          tip: {
            body: split.schedulesSection?.tip?.body || "",
            body_ar: split.schedulesSection?.tip?.body_ar || "",
            externalUrl: split.schedulesSection?.tip?.externalUrl || "",
          },
        },
        importance: split.importance || 5,
      });
    } else {
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        name: "",
        name_ar: "",
        daysAWeek: [],
        description: "",
        description_ar: "",
        image: "",
        links: [],
        pageHeader: {
          plainTitle: "",
          plainTitle_ar: "",
          highlightedTitle: "",
          highlightedTitle_ar: "",
          body: "",
          body_ar: "",
          image: "",
        },
        trainingDaysSection: {
          sectionHeader: {
            plainTitle: "",
            plainTitle_ar: "",
            highlightedTitle: "",
            highlightedTitle_ar: "",
            body: "",
            body_ar: "",
          },
          cards: [],
        },
        schedulesSection: {
          sectionHeader: {
            plainTitle: "",
            plainTitle_ar: "",
            highlightedTitle: "",
            highlightedTitle_ar: "",
            body: "",
            body_ar: "",
          },
          schedules: [],
          tip: { body: "", body_ar: "", externalUrl: "" },
        },
        importance: 5,
      });
    }
  }, [location.state]);

  // === HANDLERS ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setHasUnsavedChanges(true);
  };
  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    setHasUnsavedChanges(true);
  };
  const [uploadingImage, setUploadingImage] = useState(false);
  const handleImageFile = async (file, setState) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setState(url);
      setHasUnsavedChanges(true);
      toast.success("Image uploaded");
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (!formData.name || !formData.description) {
      toast.error("Please fill all required fields: name, description");
      return;
    }
    // if (
    //   !formData.pageHeader.plainTitle &&
    //   !formData.pageHeader.highlightedTitle
    // ) {
    //   toast.error("Page header needs at least a plain or highlighted title");
    //   return;
    // }
    // if (!formData.trainingDaysSection.cards.length) {
    //   toast.error("Add at least one training day card (title + body)");
    //   return;
    // }
    // if (!formData.schedulesSection.schedules.length) {
    //   toast.error("Add at least one schedule (e.g., Week 1)");
    //   return;
    // }

    const title = isEditing ? "Update Split" : "Create Split";
    const message = isEditing
      ? "Are you sure you want to save these changes?"
      : "Are you sure you want to create this split?";
    openModal({
      title,
      message,
      confirmText: isEditing ? "Save" : "Create",
      confirmVariant: "primary",
      onConfirm: async () => {
        try {
          if (isEditing) {
            await dispatch(
              updateSplit({ id: editingId, updates: formData }),
            ).unwrap();
            toast.success("Split updated");
          } else {
            await dispatch(createSplit(formData)).unwrap();
            toast.success("Split created");
          }
          navigate("/dashboard/splits", { state: {} });
        } catch (err) {
          toast.error(err || `${isEditing ? "Update" : "Creation"} failed`);
        }
      },
    });
  };

  // === LINKS ===
  const [linkInput, setLinkInput] = useState({
    label: "",
    label_ar: "",
    url: "",
  });
  const addLink = () => {
    if (linkInput.label && linkInput.url) {
      setFormData({
        ...formData,
        links: [
          ...formData.links,
          {
            label: linkInput.label,
            label_ar: linkInput.label_ar || "",
            url: linkInput.url,
          },
        ],
      });
      setHasUnsavedChanges(true);
      setLinkInput({ label: "", label_ar: "", url: "" });
    }
  };
  const removeLink = (index) => {
    const newLinks = [...formData.links];
    newLinks.splice(index, 1);
    setFormData({ ...formData, links: newLinks });
    setHasUnsavedChanges(true);
  };

  // === TRAINING DAY CARDS ===
  const [newCard, setNewCard] = useState({
    title: "",
    title_ar: "",
    body: "",
    body_ar: "",
    image: null,
  });
  const [fileInputKey, setFileInputKey] = useState(0);
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [showTrainingDayBuilder, setShowTrainingDayBuilder] = useState(false);
  const trainingDayCardBuilderRef = useRef(null);

  const saveNewTrainingDayCard = async () => {
    if (!newCard.title.trim() || !newCard.body.trim()) {
      toast.error("Title and body are required");
      return;
    }

    let imageUrl = newCard.image;
    if (editingCardIndex !== null) {
      const updatedCards = [...formData.trainingDaysSection.cards];
      updatedCards[editingCardIndex] = {
        title: newCard.title,
        title_ar: newCard.title_ar,
        body: newCard.body,
        body_ar: newCard.body_ar,
        image: imageUrl,
      };
      setFormData((prev) => ({
        ...prev,
        trainingDaysSection: {
          ...prev.trainingDaysSection,
          cards: updatedCards,
        },
      }));
      toast.success("Card updated");
      setEditingCardIndex(null);
      setShowTrainingDayBuilder(false);
    } else {
      setFormData((prev) => ({
        ...prev,
        trainingDaysSection: {
          ...prev.trainingDaysSection,
          cards: [
            ...prev.trainingDaysSection.cards,
            {
              title: newCard.title,
              title_ar: newCard.title_ar,
              body: newCard.body,
              body_ar: newCard.body_ar,
              image: imageUrl,
            },
          ],
        },
      }));
      toast.success("Card added");
      setShowTrainingDayBuilder(false);
    }
    setHasUnsavedChanges(true);
    setNewCard({ title: "", title_ar: "", body: "", body_ar: "", image: null });
    setFileInputKey((prev) => prev + 1);
  };
  const cancelNewTrainingDayCard = () => {
    setEditingCardIndex(null);
    setNewCard({ title: "", title_ar: "", body: "", body_ar: "", image: null });
    setFileInputKey((prev) => prev + 1);
    setShowTrainingDayBuilder(false);
  };
  const removeTrainingDayCard = (index) => {
    setFormData((prev) => ({
      ...prev,
      trainingDaysSection: {
        ...prev.trainingDaysSection,
        cards: prev.trainingDaysSection.cards.filter((_, i) => i !== index),
      },
    }));
    setHasUnsavedChanges(true);
  };
  const startEditTrainingDayCard = (index) => {
    const card = formData.trainingDaysSection.cards[index];
    setNewCard({
      title: card.title,
      title_ar: card.title_ar || "",
      body: card.body,
      body_ar: card.body_ar || "",
      image: card.image,
    });
    setEditingCardIndex(index);
    setShowTrainingDayBuilder(true);
    trainingDayCardBuilderRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // === SCHEDULES (ACCORDIONS) ===
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    title_ar: "",
    trainingDays: [],
  });
  const [editingScheduleIndex, setEditingScheduleIndex] = useState(null);
  const [showScheduleBuilder, setShowScheduleBuilder] = useState(false);
  const trainingScheduleBuilderRef = useRef();

  const saveSchedule = () => {
    if (!newSchedule.title.trim()) {
      toast.error("Schedule title is required");
      return;
    }
    if (newSchedule.trainingDays.length === 0) {
      toast.error("Schedule must have at least one training day");
      return;
    }
    if (editingScheduleIndex !== null) {
      const updatedSchedules = [...formData.schedulesSection.schedules];
      updatedSchedules[editingScheduleIndex] = {
        title: newSchedule.title,
        title_ar: newSchedule.title_ar,
        trainingDays: newSchedule.trainingDays,
      };
      setFormData((prev) => ({
        ...prev,
        schedulesSection: {
          ...prev.schedulesSection,
          schedules: updatedSchedules,
        },
      }));
      toast.success("Schedule updated");
      setEditingScheduleIndex(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        schedulesSection: {
          ...prev.schedulesSection,
          schedules: [
            ...prev.schedulesSection.schedules,
            {
              title: newSchedule.title,
              title_ar: newSchedule.title_ar,
              trainingDays: newSchedule.trainingDays,
            },
          ],
        },
      }));
      toast.success("Schedule added");
    }
    setHasUnsavedChanges(true);
    cancelSchedule();
  };
  const cancelSchedule = () => {
    setNewSchedule({ title: "", title_ar: "", trainingDays: [] });
    setShowScheduleBuilder(false);
  };
  const removeSchedule = (idx) => {
    setFormData((prev) => ({
      ...prev,
      schedulesSection: {
        ...prev.schedulesSection,
        schedules: prev.schedulesSection.schedules.filter((_, i) => i !== idx),
      },
    }));
    setHasUnsavedChanges(true);
  };
  const startEditSchedule = (index) => {
    const schedule = formData.schedulesSection.schedules[index];
    setNewSchedule({
      title: schedule.title,
      title_ar: schedule.title_ar || "",
      trainingDays: JSON.parse(JSON.stringify(schedule.trainingDays)),
    });
    setEditingScheduleIndex(index);
    setShowScheduleBuilder(true);
    trainingScheduleBuilderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // === TRAINING DAYS INSIDE SCHEDULE ===
  const [newTrainingSession, setNewTrainingSession] = useState({
    title: "",
    title_ar: "",
    subTitle: "",
    subTitle_ar: "",
    isRest: false,
    exercises: [],
  });
  const [editingSessionIndex, setEditingSessionIndex] = useState(null);
  const [
    showScheduleTrainingSessionBuilder,
    setShowScheduleTrainingSessionBuilder,
  ] = useState(false);
  const trainingSessionBuilderRef = useRef();

  const saveNewTrainingSession = () => {
    if (!newTrainingSession.title.trim()) {
      toast.error("Training day title is required");
      return;
    }
    if (
      newTrainingSession.exercises.length === 0 &&
      !newTrainingSession.isRest
    ) {
      toast.error("Add at least one exercise (or mark as rest day)");
      return;
    }
    const session = {
      title: newTrainingSession.title,
      title_ar: newTrainingSession.title_ar,
      subTitle: newTrainingSession.subTitle,
      subTitle_ar: newTrainingSession.subTitle_ar,
      exercises: newTrainingSession.exercises,
      isRest: newTrainingSession.isRest,
    };
    if (editingSessionIndex !== null) {
      const updatedDays = [...newSchedule.trainingDays];
      updatedDays[editingSessionIndex] = session;
      setNewSchedule((prev) => ({ ...prev, trainingDays: updatedDays }));
      toast.success("Training day updated");
      setEditingSessionIndex(null);
    } else {
      setNewSchedule((prev) => ({
        ...prev,
        trainingDays: [...prev.trainingDays, session],
      }));
      toast.success("Training day added");
    }
    cancelNewTrainingSession();
  };
  const cancelNewTrainingSession = () => {
    setNewTrainingSession({
      title: "",
      title_ar: "",
      subTitle: "",
      subTitle_ar: "",
      isRest: false,
      exercises: [],
    });
    setShowScheduleTrainingSessionBuilder(false);
  };
  const removeTrainingSession = (idx) => {
    setNewSchedule((prev) => ({
      ...prev,
      trainingDays: prev.trainingDays.filter((_, i) => i !== idx),
    }));
  };
  const startEditTrainingSession = (index) => {
    const session = newSchedule.trainingDays[index];
    setNewTrainingSession({
      title: session.title,
      title_ar: session.title_ar || "",
      subTitle: session.subTitle || "",
      subTitle_ar: session.subTitle_ar || "",
      isRest: session.isRest || false,
      exercises: session.exercises || [],
    });
    setEditingSessionIndex(index);
    setShowScheduleTrainingSessionBuilder(true);
    trainingSessionBuilderRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleRestToggle = (checked) => {
    if (checked) {
      setNewTrainingSession({
        title: "Rest Day",
        title_ar: "يوم راحة",
        subTitle: "Recovery",
        subTitle_ar: "استشفاء",
        isRest: true,
        exercises: [],
      });
    } else {
      setNewTrainingSession({
        title: "",
        title_ar: "",
        subTitle: "",
        subTitle_ar: "",
        isRest: false,
        exercises: [],
      });
    }
  };

  // === EXERCISES INSIDE TRAINING DAY ===
  const [newExercise, setNewExercise] = useState({
    name: "",
    name_ar: "",
    webName: "",
    muscle: "",
    muscle_ar: "",
  });
  const [editingExerciseIndex, setEditingExerciseIndex] = useState(null);
  const [draggedExerciseIndex, setDraggedExerciseIndex] = useState(null);
  const removeExercise = (idx) => {
    setNewTrainingSession((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== idx),
    }));
  };
  const saveExercise = () => {
    if (!newExercise.name.trim() || !newExercise.muscle.trim()) {
      toast.error("Exercise name and muscle group are required");
      return;
    }

    const exerciseData = {
      name: newExercise.name,
      name_ar: newExercise.name_ar || "",
      webName:
        newExercise.webName ||
        newExercise.name.toLowerCase().replace(/\s/g, "-"),
      muscle: newExercise.muscle,
      muscle_ar: newExercise.muscle_ar || "",
    };

    if (editingExerciseIndex !== null) {
      // Update existing exercise
      setNewTrainingSession((prev) => {
        const updatedExercises = [...prev.exercises];
        updatedExercises[editingExerciseIndex] = exerciseData;
        return { ...prev, exercises: updatedExercises };
      });
      setEditingExerciseIndex(null);
    } else {
      // Add new exercise
      setNewTrainingSession((prev) => ({
        ...prev,
        exercises: [...prev.exercises, exerciseData],
      }));
    }

    // Reset inputs
    setNewExercise({
      name: "",
      name_ar: "",
      webName: "",
      muscle: "",
      muscle_ar: "",
    });
  };
  const startEditExercise = (idx) => {
    setNewExercise(newTrainingSession.exercises[idx]);
    setEditingExerciseIndex(idx);
  };
  const cancelEditExercise = () => {
    setNewExercise({
      name: "",
      name_ar: "",
      webName: "",
      muscle: "",
      muscle_ar: "",
    });
    setEditingExerciseIndex(null);
  };

  /* -- drag handlers for the session exercises -- */
  const handleDragStart = (e, index) => {
    setDraggedExerciseIndex(index);
    // Firefox requires dataTransfer to be set for dragging to work
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedExerciseIndex === null || draggedExerciseIndex === dropIndex)
      return;

    setNewTrainingSession((prev) => {
      const updatedExercises = [...prev.exercises];
      // Remove the item from its original position
      const [draggedItem] = updatedExercises.splice(draggedExerciseIndex, 1);
      // Insert it into the new position
      updatedExercises.splice(dropIndex, 0, draggedItem);
      return { ...prev, exercises: updatedExercises };
    });
    setDraggedExerciseIndex(null);
  };

  // === JSX ===
  return (
    <div className="border border-white/10 p-8">
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold italic tracking-tight uppercase">
          {isEditing ? "Edit Split" : "Create New Split"}
        </h3>
        <div className="h-0.5 w-12 bg-[#0070FF] mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* === CARD SECTION === */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Card</h2>
          <Input
            type="text"
            name="name"
            label="Split Name (English) *"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="split name"
          />
          <Input
            dir="rtl"
            type="text"
            name="name_ar"
            label="Split Name (Arabic)"
            value={formData.name_ar}
            onChange={handleChange}
            placeholder="الاسم بالعربية"
          />
          <Input
            type="textarea"
            name="description"
            label="Short Description (English) *"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="short description"
          />
          <Input
            dir="rtl"
            type="textarea"
            name="description_ar"
            label="Short Description (Arabic)"
            value={formData.description_ar}
            onChange={handleChange}
            rows={4}
            placeholder="الوصف بالعربية"
          />
          <Input
            type="checkbox-group"
            name="daysAWeek"
            label="Recommended days per week"
            value={formData.daysAWeek}
            onChange={(e) =>
              setFormData({ ...formData, daysAWeek: e.target.value })
            }
            options={[
              { value: 1, label: "1 day/week" },
              { value: 2, label: "2 days/week" },
              { value: 3, label: "3 days/week" },
              { value: 4, label: "4 days/week" },
              { value: 5, label: "5 days/week" },
              { value: 6, label: "6 days/week" },
            ]}
          />
          <Input
            type="range"
            name="importance"
            label="Priority"
            value={formData.importance}
            onChange={handleChange}
            min={1}
            max={10}
            step={1}
          />
          <Input
            type="file"
            label="Card Image"
            accept="image/*"
            placeholder="Upload card image"
            onChange={(file) =>
              handleImageFile(file, (url) => {
                setFormData({ ...formData, image: url });
              })
            }
          />

          {/* Extra links */}
          <div>
            <label className="block tracking-[0.05rem] font-medium text-zinc-400 mb-2">
              Extra Links
            </label>
            {formData.links.length > 0 && (
              <div className="space-y-4 mb-4">
                {formData.links.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg p-3 ps-6 transition-all duration-200 group"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-white/90">
                        {link.label} / {link.label_ar} :
                      </span>
                      <span className="text-xs text-zinc-400 ml-2 break-all">
                        {link.url}
                      </span>
                    </div>
                    <Button
                      type="custom"
                      onClick={() => removeLink(idx)}
                      className="text-zinc-500 hover:!text-red-400 !transition-colors !duration-200 !rounded-md !p-2"
                      text=" ⨉"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <Input
                type="text"
                placeholder="Label (English)"
                value={linkInput.label}
                onChange={(e) =>
                  setLinkInput({ ...linkInput, label: e.target.value })
                }
                className="flex-1"
              />
              <Input
                dir="rtl"
                type="text"
                placeholder="Label (Arabic)"
                value={linkInput.label_ar}
                onChange={(e) =>
                  setLinkInput({ ...linkInput, label_ar: e.target.value })
                }
                className="flex-1"
              />
              <Input
                type="url"
                placeholder="URL"
                value={linkInput.url}
                onChange={(e) =>
                  setLinkInput({ ...linkInput, url: e.target.value })
                }
                className="flex-1"
              />
              <Button
                type="filled"
                text="Add"
                onClick={addLink}
                rounded="rounded-lg"
              />
            </div>
          </div>
        </section>

        <hr className="border-white/10" />

        {/* === PAGE HEADER === */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Page Header</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Plain Title (English)"
              value={formData.pageHeader.plainTitle}
              onChange={(e) =>
                handleNestedChange("pageHeader", "plainTitle", e.target.value)
              }
              placeholder="non‑colored part"
            />
            <Input
              dir="rtl"
              type="text"
              label="Plain Title (Arabic)"
              value={formData.pageHeader.plainTitle_ar}
              onChange={(e) =>
                handleNestedChange(
                  "pageHeader",
                  "plainTitle_ar",
                  e.target.value,
                )
              }
              placeholder="الجزء غير الملون"
            />
            <Input
              type="text"
              label="Highlighted Title (English)"
              value={formData.pageHeader.highlightedTitle}
              onChange={(e) =>
                handleNestedChange(
                  "pageHeader",
                  "highlightedTitle",
                  e.target.value,
                )
              }
              placeholder="colored part"
            />
            <Input
              dir="rtl"
              type="text"
              label="Highlighted Title (Arabic)"
              value={formData.pageHeader.highlightedTitle_ar}
              onChange={(e) =>
                handleNestedChange(
                  "pageHeader",
                  "highlightedTitle_ar",
                  e.target.value,
                )
              }
              placeholder="الجزء الملون"
            />
            <div className="col-span-full">
              <Input
                type="textarea"
                label="Body Text (English)"
                rows={3}
                value={formData.pageHeader.body}
                onChange={(e) =>
                  handleNestedChange("pageHeader", "body", e.target.value)
                }
                placeholder="body text"
              />
              <Input
                dir="rtl"
                type="textarea"
                label="Body Text (Arabic)"
                rows={3}
                value={formData.pageHeader.body_ar}
                onChange={(e) =>
                  handleNestedChange("pageHeader", "body_ar", e.target.value)
                }
                placeholder="النص"
                className="mt-2"
              />
            </div>
            <Input
              type="file"
              label="Header Image (optional)"
              accept="image/*"
              placeholder="Upload header image"
              onChange={(file) =>
                handleImageFile(file, (url) => {
                  setFormData({
                    ...formData,
                    pageHeader: { ...formData.pageHeader, image: url },
                  });
                })
              }
            />
          </div>
        </section>

        <hr className="border-white/10" />

        {/* === TRAINING DAYS SECTION === */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Training Days</h2>

          {/* Section header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              type="text"
              label="Section Plain Title (English)"
              value={formData.trainingDaysSection.sectionHeader.plainTitle}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  trainingDaysSection: {
                    ...prev.trainingDaysSection,
                    sectionHeader: {
                      ...prev.trainingDaysSection.sectionHeader,
                      plainTitle: e.target.value,
                    },
                  },
                }))
              }
              placeholder="e.g., Weekly"
            />
            <Input
              dir="rtl"
              type="text"
              label="Section Plain Title (Arabic)"
              value={formData.trainingDaysSection.sectionHeader.plainTitle_ar}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  trainingDaysSection: {
                    ...prev.trainingDaysSection,
                    sectionHeader: {
                      ...prev.trainingDaysSection.sectionHeader,
                      plainTitle_ar: e.target.value,
                    },
                  },
                }))
              }
              placeholder="مثال: أسبوعي"
            />
            <Input
              type="text"
              label="Section Highlighted Title (English)"
              value={
                formData.trainingDaysSection.sectionHeader.highlightedTitle
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  trainingDaysSection: {
                    ...prev.trainingDaysSection,
                    sectionHeader: {
                      ...prev.trainingDaysSection.sectionHeader,
                      highlightedTitle: e.target.value,
                    },
                  },
                }))
              }
              placeholder="e.g., Schedule"
            />
            <Input
              dir="rtl"
              type="text"
              label="Section Highlighted Title (Arabic)"
              value={
                formData.trainingDaysSection.sectionHeader.highlightedTitle_ar
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  trainingDaysSection: {
                    ...prev.trainingDaysSection,
                    sectionHeader: {
                      ...prev.trainingDaysSection.sectionHeader,
                      highlightedTitle_ar: e.target.value,
                    },
                  },
                }))
              }
              placeholder="مثال: جدول"
            />
            <div className="col-span-full">
              <Input
                type="textarea"
                label="Section Body (English)"
                rows={2}
                value={formData.trainingDaysSection.sectionHeader.body}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    trainingDaysSection: {
                      ...prev.trainingDaysSection,
                      sectionHeader: {
                        ...prev.trainingDaysSection.sectionHeader,
                        body: e.target.value,
                      },
                    },
                  }))
                }
                placeholder="Optional description"
              />
              <Input
                dir="rtl"
                type="textarea"
                label="Section Body (Arabic)"
                rows={2}
                value={formData.trainingDaysSection.sectionHeader.body_ar}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    trainingDaysSection: {
                      ...prev.trainingDaysSection,
                      sectionHeader: {
                        ...prev.trainingDaysSection.sectionHeader,
                        body_ar: e.target.value,
                      },
                    },
                  }))
                }
                placeholder="وصف اختياري"
                className="mt-2"
              />
            </div>
          </div>

          {/* Existing cards */}
          {formData.trainingDaysSection.cards.length > 0 && (
            <div className="space-y-2">
              <h3 className="block tracking-[0.05rem] font-medium text-zinc-400 mb-4">
                Added Training days
              </h3>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {formData.trainingDaysSection.cards.map((card, idx) => (
                  <div key={idx} className="relative">
                    <Card
                      type="top-image"
                      title={card.title}
                      body={card.body}
                      image={card.image}
                    />
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <Button
                        type="custom"
                        icon="edit"
                        onClick={() => startEditTrainingDayCard(idx)}
                        className="!p-2"
                      />
                      <Button
                        type="custom"
                        icon="delete"
                        onClick={() =>
                          openModal({
                            title: "Delete Card?",
                            message: "Are you sure you want to delete this?",
                            confirmText: "delete",
                            cancelText: "cancel",
                            confirmVariant: "danger",
                            onConfirm: () => removeTrainingDayCard(idx),
                          })
                        }
                        className="!p-2 text-red-400 hover:text-red-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add new card builder */}
          <div ref={trainingDayCardBuilderRef}></div>
          {!showTrainingDayBuilder ? (
            <Button
              type="outlined"
              text="+ Add New Training Day"
              onClick={() => setShowTrainingDayBuilder(true)}
              className="mb-6"
            />
          ) : (
            <div className="border border-white/10 p-6 rounded-sm space-y-4">
              <h3 className="text-lg font-bold text-white">
                {editingCardIndex !== null
                  ? "Edit Training Day"
                  : "New Training Day"}
              </h3>
              <Input
                required
                type="text"
                placeholder="Title (English)"
                value={newCard.title}
                onChange={(e) =>
                  setNewCard({ ...newCard, title: e.target.value })
                }
              />

              <Input
                dir="rtl"
                type="text"
                placeholder="Title (Arabic)"
                value={newCard.title_ar}
                onChange={(e) =>
                  setNewCard({ ...newCard, title_ar: e.target.value })
                }
              />
              <Input
                required
                type="textarea"
                placeholder="Body (English)"
                value={newCard.body}
                onChange={(e) =>
                  setNewCard({ ...newCard, body: e.target.value })
                }
                rows={3}
              />
              <Input
                dir="rtl"
                type="textarea"
                placeholder="Body (Arabic)"
                value={newCard.body_ar}
                onChange={(e) =>
                  setNewCard({ ...newCard, body_ar: e.target.value })
                }
                rows={3}
              />
              <Input
                key={fileInputKey}
                required
                type="file"
                placeholder="Upload training day image *"
                accept="image/*"
                onChange={(file) =>
                  handleImageFile(file, (url) =>
                    setNewCard({ ...newCard, image: url }),
                  )
                }
              />
              <div className="flex gap-2 items-center">
                <Button
                  type="filled"
                  text={editingCardIndex !== null ? "Update Card" : "Save Card"}
                  onClick={saveNewTrainingDayCard}
                  className="flex-1"
                />
                <Button
                  type="outlined"
                  text="Cancel"
                  onClick={cancelNewTrainingDayCard}
                />
              </div>
            </div>
          )}
        </section>

        <hr className="border-white/10" />

        {/* === SCHEDULES SECTION === */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Schedules</h2>

          {/* Section header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              type="text"
              label="Section Plain Title (English)"
              value={formData.schedulesSection.sectionHeader.plainTitle}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  schedulesSection: {
                    ...prev.schedulesSection,
                    sectionHeader: {
                      ...prev.schedulesSection.sectionHeader,
                      plainTitle: e.target.value,
                    },
                  },
                }))
              }
              placeholder="e.g., Weekly"
            />
            <Input
              dir="rtl"
              type="text"
              label="Section Plain Title (Arabic)"
              value={formData.schedulesSection.sectionHeader.plainTitle_ar}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  schedulesSection: {
                    ...prev.schedulesSection,
                    sectionHeader: {
                      ...prev.schedulesSection.sectionHeader,
                      plainTitle_ar: e.target.value,
                    },
                  },
                }))
              }
              placeholder="مثال: أسبوعي"
            />
            <Input
              type="text"
              label="Section Highlighted Title (English)"
              value={formData.schedulesSection.sectionHeader.highlightedTitle}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  schedulesSection: {
                    ...prev.schedulesSection,
                    sectionHeader: {
                      ...prev.schedulesSection.sectionHeader,
                      highlightedTitle: e.target.value,
                    },
                  },
                }))
              }
              placeholder="e.g., Schedule"
            />
            <Input
              dir="rtl"
              type="text"
              label="Section Highlighted Title (Arabic)"
              value={
                formData.schedulesSection.sectionHeader.highlightedTitle_ar
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  schedulesSection: {
                    ...prev.schedulesSection,
                    sectionHeader: {
                      ...prev.schedulesSection.sectionHeader,
                      highlightedTitle_ar: e.target.value,
                    },
                  },
                }))
              }
              placeholder="مثال: جدول"
            />
            <div className="col-span-full">
              <Input
                type="textarea"
                label="Section Body (English)"
                rows={2}
                value={formData.schedulesSection.sectionHeader.body}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    schedulesSection: {
                      ...prev.schedulesSection,
                      sectionHeader: {
                        ...prev.schedulesSection.sectionHeader,
                        body: e.target.value,
                      },
                    },
                  }))
                }
                placeholder="Optional description"
              />
              <Input
                dir="rtl"
                type="textarea"
                label="Section Body (Arabic)"
                rows={2}
                value={formData.schedulesSection.sectionHeader.body_ar}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    schedulesSection: {
                      ...prev.schedulesSection,
                      sectionHeader: {
                        ...prev.schedulesSection.sectionHeader,
                        body_ar: e.target.value,
                      },
                    },
                  }))
                }
                placeholder="وصف اختياري"
                className="mt-2"
              />
            </div>
          </div>

          {/* Display added schedules */}
          {formData.schedulesSection.schedules.length > 0 && (
            <div className="space-y-4 mb-6">
              <h3 className="tracking-[0.05rem] font-medium text-zinc-400 mb-2">
                Added Schedules
              </h3>
              {formData.schedulesSection.schedules.map((schedule, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-bold text-lg">
                        {schedule.title} / {schedule.title_ar}
                      </h4>
                      <p className="text-zinc-400 text-xs">
                        {schedule.trainingDays.length} training days
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="custom"
                        icon="edit"
                        onClick={() => startEditSchedule(idx)}
                        className="!p-2"
                      />
                      <Button
                        type="custom"
                        icon="delete"
                        onClick={() => removeSchedule(idx)}
                        className="!p-2 text-red-400 hover:text-red-300"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    {schedule.trainingDays.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        className="border-l-2 border-[#0070FF]/30 pl-3"
                      >
                        <p className="text-white font-semibold">
                          {day.title} / {day.title_ar}
                        </p>
                        {(day.subTitle || day.subTitle_ar) && (
                          <p className="text-zinc-400 text-xs">
                            {day.subTitle} / {day.subTitle_ar}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {day.exercises.map((ex, eIdx) => (
                            <span
                              key={eIdx}
                              className="bg-white/10 text-[10px] text-zinc-300 px-2 py-0.5 rounded"
                            >
                              {ex.name} / {ex.name_ar}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add new schedule builder */}
          <div ref={trainingScheduleBuilderRef}></div>
          {!showScheduleBuilder ? (
            <Button
              type="outlined"
              text="+ Add New Schedule"
              onClick={() => setShowScheduleBuilder(true)}
              className="mb-6"
            />
          ) : (
            <div className="border border-white/10 rounded-sm p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">
                {editingScheduleIndex !== null
                  ? "Edit Schedule"
                  : "New Schedule"}
              </h3>
              <Input
                type="text"
                label="Schedule Title (English) *"
                value={newSchedule.title}
                onChange={(e) =>
                  setNewSchedule((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Week 1"
              />
              <Input
                dir="rtl"
                type="text"
                label="Schedule Title (Arabic)"
                value={newSchedule.title_ar}
                onChange={(e) =>
                  setNewSchedule((prev) => ({
                    ...prev,
                    title_ar: e.target.value,
                  }))
                }
                placeholder="مثال: أسبوع 1"
              />

              {/* Existing training days in new schedule */}
              {newSchedule.trainingDays.length > 0 && (
                <div className="space-y-3">
                  <span className="text-base text-zinc-400">
                    Added Sessions
                  </span>
                  {newSchedule.trainingDays.map((day, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-start"
                    >
                      <div>
                        <p className="text-white font-medium">
                          {day.title} / {day.title_ar}
                        </p>
                        <p className="text-zinc-400 text-xs">
                          {day.subTitle} / {day.subTitle_ar}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {day.exercises.map((ex, eIdx) => (
                            <span
                              key={eIdx}
                              className="bg-white/10 text-[10px] text-zinc-300 px-2 py-0.5 rounded"
                            >
                              {ex.name} / {ex.name_ar}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="custom"
                          icon="edit"
                          onClick={() => startEditTrainingSession(idx)}
                          className="!p-2"
                        />
                        <Button
                          type="custom"
                          icon="delete"
                          onClick={() => removeTrainingSession(idx)}
                          className="!p-2 text-red-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add training day builder */}
              <div ref={trainingSessionBuilderRef}></div>
              {!showScheduleTrainingSessionBuilder ? (
                <Button
                  type="outlined"
                  text="+ Add Training Session"
                  onClick={() => setShowScheduleTrainingSessionBuilder(true)}
                  className="mt-2 w-full"
                />
              ) : (
                <div className="border border-white/10 p-4 mt-2">
                  <h3 className="text-base font-bold text-white mb-6">
                    {editingSessionIndex !== null
                      ? "Edit Training Session"
                      : "New Training Session"}
                  </h3>
                  <div className="flex items-center gap-4 mb-2">
                    <label className="text-zinc-400 text-sm flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newTrainingSession.isRest}
                        onChange={(e) => handleRestToggle(e.target.checked)}
                        className="accent-[#0070FF]"
                      />
                      This is a rest day
                    </label>
                  </div>
                  {!newTrainingSession.isRest ? (
                    <div className="space-y-2 mb-4">
                      <Input
                        type="text"
                        placeholder="Day title (English)"
                        value={newTrainingSession.title}
                        onChange={(e) =>
                          setNewTrainingSession((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <Input
                        dir="rtl"
                        type="text"
                        placeholder="Day title (Arabic)"
                        value={newTrainingSession.title_ar}
                        onChange={(e) =>
                          setNewTrainingSession((prev) => ({
                            ...prev,
                            title_ar: e.target.value,
                          }))
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Subtitle (English optional)"
                        value={newTrainingSession.subTitle}
                        onChange={(e) =>
                          setNewTrainingSession((prev) => ({
                            ...prev,
                            subTitle: e.target.value,
                          }))
                        }
                      />
                      <Input
                        dir="rtl"
                        type="text"
                        placeholder="Subtitle (Arabic optional)"
                        value={newTrainingSession.subTitle_ar}
                        onChange={(e) =>
                          setNewTrainingSession((prev) => ({
                            ...prev,
                            subTitle_ar: e.target.value,
                          }))
                        }
                      />
                      {newTrainingSession.exercises.length > 0 && (
                        <div className="flex flex-col gap-2 mb-6">
                          <label className="text-zinc-400 text-sm">
                            Added exercises (Drag to reorder)
                          </label>
                          {newTrainingSession.exercises.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              draggable
                              onDragStart={(e) => handleDragStart(e, exIdx)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, exIdx)}
                              className={`bg-white/5 border ${
                                editingExerciseIndex === exIdx
                                  ? "border-[#0070FF]"
                                  : "border-white/10"
                              } rounded-md p-3 flex justify-between items-center cursor-move hover:bg-white/10 transition-colors duration-200 group`}
                            >
                              <div className="flex items-center gap-3">
                                {/* Drag Handle Icon */}
                                <div className="text-zinc-500 group-hover:text-zinc-300">
                                  ⋮⋮
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-white text-sm font-semibold">
                                    {ex.name} {ex.name_ar && `/ ${ex.name_ar}`}
                                  </span>
                                  <span className="text-zinc-400 text-xs">
                                    {ex.muscle}{" "}
                                    {ex.muscle_ar && `/ ${ex.muscle_ar}`}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => startEditExercise(exIdx)}
                                  className="text-zinc-400 hover:text-white text-xs px-2 py-1 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeExercise(exIdx)}
                                  className="text-red-400 hover:text-red-300 text-xs px-2 py-1 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <label className="text-zinc-400 text-sm flex items-center gap-2 mb-2">
                        {editingExerciseIndex !== null
                          ? "Edit exercise"
                          : "Add new exercise"}
                      </label>
                      <div className="flex flex-col md:flex-row gap-3 mb-4">
                        <Input
                          type="text"
                          placeholder="Exercise name (English)"
                          value={newExercise.name}
                          onChange={(e) =>
                            setNewExercise((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="flex-1"
                        />
                        <Input
                          dir="rtl"
                          type="text"
                          placeholder="Exercise name (Arabic)"
                          value={newExercise.name_ar}
                          onChange={(e) =>
                            setNewExercise((prev) => ({
                              ...prev,
                              name_ar: e.target.value,
                            }))
                          }
                          className="flex-1"
                        />
                        <Input
                          type="text"
                          placeholder="Muscle group (English)"
                          value={newExercise.muscle}
                          onChange={(e) =>
                            setNewExercise((prev) => ({
                              ...prev,
                              muscle: e.target.value,
                            }))
                          }
                          className="flex-1"
                        />
                        <Input
                          dir="rtl"
                          type="text"
                          placeholder="Muscle group (Arabic)"
                          value={newExercise.muscle_ar}
                          onChange={(e) =>
                            setNewExercise((prev) => ({
                              ...prev,
                              muscle_ar: e.target.value,
                            }))
                          }
                          className="flex-1"
                        />
                        <Input
                          type="text"
                          placeholder="Web name (e.g., bench-press)"
                          value={newExercise.webName}
                          onChange={(e) =>
                            setNewExercise((prev) => ({
                              ...prev,
                              webName: e.target.value,
                            }))
                          }
                          className="flex-1"
                        />
                        <div className="flex gap-2">
                          <Button
                            type="filled"
                            text={
                              editingExerciseIndex !== null ? "Update" : "Add"
                            }
                            onClick={saveExercise}
                            rounded="rounded-md"
                            className="whitespace-nowrap"
                          />
                          {editingExerciseIndex !== null && (
                            <Button
                              type="outlined"
                              text="Cancel"
                              onClick={cancelEditExercise}
                              rounded="rounded-md"
                              className="whitespace-nowrap"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-zinc-400 italic text-sm mb-4">
                      Rest day – no exercises
                    </div>
                  )}
                  <div className="flex justify-end">
                    <div className="flex gap-2 items-center">
                      <Button
                        type="filled"
                        text="Save"
                        onClick={saveNewTrainingSession}
                        disabled={
                          !newTrainingSession.isRest &&
                          !newTrainingSession.title.trim()
                        }
                      />
                      <Button
                        type="outlined"
                        text="Cancel"
                        onClick={cancelNewTrainingSession}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-2 items-center mt-10">
                <Button
                  type="filled"
                  text="Save Schedule"
                  onClick={saveSchedule}
                  className="flex-1"
                />
                <Button
                  type="outlined"
                  text="Cancel"
                  onClick={cancelSchedule}
                />
              </div>
            </div>
          )}
        </section>

        <hr className="border-white/10" />

        {/* === TIP SECTION === */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Optional Tip</h2>
          <div className="grid gap-4">
            <Input
              type="textarea"
              label="Tip Body (English)"
              rows={3}
              value={formData.schedulesSection.tip.body}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  schedulesSection: {
                    ...prev.schedulesSection,
                    tip: { ...prev.schedulesSection.tip, body: e.target.value },
                  },
                }))
              }
              placeholder="Add a helpful tip..."
            />
            <Input
              type="textarea"
              label="Tip Body (Arabic)"
              rows={3}
              value={formData.schedulesSection.tip.body_ar}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  schedulesSection: {
                    ...prev.schedulesSection,
                    tip: {
                      ...prev.schedulesSection.tip,
                      body_ar: e.target.value,
                    },
                  },
                }))
              }
              placeholder="أضف نصيحة مفيدة..."
            />
            <Input
              type="url"
              label="External URL (optional)"
              value={formData.schedulesSection.tip.externalUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  schedulesSection: {
                    ...prev.schedulesSection,
                    tip: {
                      ...prev.schedulesSection.tip,
                      externalUrl: e.target.value,
                    },
                  },
                }))
              }
              placeholder="https://..."
            />
          </div>
        </section>

        {/* Action buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="outlined"
            text="Cancel"
            onClick={() =>
              openModal({
                title: "Discard changes?",
                message:
                  "You may have unsaved changes. Are you sure you want to leave?",
                confirmText: "Yes, discard",
                cancelText: "Stay",
                confirmVariant: "warning",
                onConfirm: () => navigate("/dashboard/splits"),
              })
            }
          />
          <Button
            submit
            type="filled"
            text={
              status === "loading"
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Split"
                  : "Create Split"
            }
            disabled={uploadingImage || status === "loading"}
          />
        </div>
        {error && <ErrorTag type="small" error={error} severity="error" />}
      </form>
    </div>
  );
};

export default CreateSplitForm;

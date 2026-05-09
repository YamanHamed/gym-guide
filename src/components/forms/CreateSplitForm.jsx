// src/components/forms/CreateSplitForm.jsx
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { createSplit } from "../../store/splitsSlice";
import Button from "../Button";
import Input from "../Input";
import Card from "../Card";
import toast from "react-hot-toast";
import { useModal } from "../../contexts/ModalContext";
import { createSplit, updateSplit } from "../../store/slices/splitsSlice";
import { uploadImage } from "../../utils/uploadImage";
import ErrorTag from "../ErrorTag";

const CreateSplitForm = () => {
  // === GENERAL ===
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { openModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { status, error } = useSelector((state) => state.splits);
  // === MAIN STATE ===
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    links: [],
    pageHeader: { plainTitle: "", highlightedTitle: "", body: "", image: "" },
    trainingDaysSection: {
      sectionHeader: { plainTitle: "", highlightedTitle: "", body: "" },
      cards: [],
    },
    schedulesSection: {
      sectionHeader: { plainTitle: "", highlightedTitle: "", body: "" },
      schedules: [], // [  {  title, trainingDays: [ {title, subTitle, exercises: [name, webName]} ]  },  ]
      tip: {}, // { body, externalUrl }
    },
  });

  useEffect(() => {
    if (location.state?.isEditing && location.state?.split) {
      const split = location.state.split;
      setIsEditing(true);
      setEditingId(split._id);
      setFormData({
        name: split.name || "",
        description: split.description || "",
        image: split.image || "",
        links: split.links || [],
        pageHeader: {
          plainTitle: split.pageHeader?.plainTitle || "",
          highlightedTitle: split.pageHeader?.highlightedTitle || "",
          body: split.pageHeader?.body || "",
          image: split.pageHeader?.image || "",
        },
        trainingDaysSection: {
          sectionHeader: {
            plainTitle:
              split.trainingDaysSection?.sectionHeader?.plainTitle || "",
            highlightedTitle:
              split.trainingDaysSection?.sectionHeader?.highlightedTitle || "",
            body: split.trainingDaysSection?.sectionHeader?.body || "",
          },
          cards: split.trainingDaysSection?.cards || [],
        },
        schedulesSection: {
          sectionHeader: {
            plainTitle: split.schedulesSection?.sectionHeader?.plainTitle || "",
            highlightedTitle:
              split.schedulesSection?.sectionHeader?.highlightedTitle || "",
            body: split.schedulesSection?.sectionHeader?.body || "",
          },
          schedules: split.schedulesSection?.schedules || [],
          tip: {
            body: split.schedulesSection?.tip?.body || "",
            externalUrl: split.schedulesSection?.tip?.externalUrl || "",
          },
        },
      });
    } else {
      // Reset form for create mode
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        image: "",
        links: [],
        pageHeader: {
          plainTitle: "",
          highlightedTitle: "",
          body: "",
          image: "",
        },
        trainingDaysSection: {
          sectionHeader: { plainTitle: "", highlightedTitle: "", body: "" },
          cards: [],
        },
        schedulesSection: {
          sectionHeader: { plainTitle: "", highlightedTitle: "", body: "" },
          schedules: [],
          tip: { body: "", externalUrl: "" },
        },
      });
    }
  }, [location.state]);

  // === HANDLERS ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };
  const [uploadingImage, setUploadingImage] = useState(false);
  const handleImageFile = async (file, setState) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setState(url);
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

    // Validation for splits
    if (!formData.name || !formData.description || !formData.image) {
      toast.error(
        "Please fill all required fields: name, description, and card image",
      );
      return;
    }
    // Page header: at least one title
    if (
      !formData.pageHeader.plainTitle &&
      !formData.pageHeader.highlightedTitle
    ) {
      toast.error("Page header needs at least a plain or highlighted title");
      return;
    }
    // Training days cards: at least one card with title and body
    if (!formData.trainingDaysSection.cards.length) {
      toast.error("Add at least one training day card (title + body)");
      return;
    }
    // Schedules: at least one schedule, and each schedule must have a title and at least one training day
    if (!formData.schedulesSection.schedules.length) {
      toast.error("Add at least one schedule (e.g., Week 1)");
      return;
    }

    const title = isEditing ? "Update Split" : "Create Split";
    const message = isEditing
      ? "Are you sure you want to save these changes?"
      : "Are you sure you want to create this split?";
    const confirmText = isEditing ? "Save" : "Create";

    openModal({
      title,
      message,
      confirmText,
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

  // === OUTER CARD ===
  const [linkInput, setLinkInput] = useState({ label: "", url: "" });
  const addLink = () => {
    if (linkInput.label && linkInput.url) {
      setFormData({
        ...formData,
        links: [...formData.links, linkInput],
      });
      setLinkInput({ label: "", url: "" });
    }
  };
  const removeLink = (index) => {
    const newLinks = [...formData.links];
    newLinks.splice(index, 1);
    setFormData({ ...formData, links: newLinks });
  };

  // === TRAINING DAY ===
  const [newCard, setNewCard] = useState({
    title: "",
    body: "",
    image: null,
  });
  const [fileInputKey, setFileInputKey] = useState(0);
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [showTrainingDayBuilder, setShowTrainingDayBuilder] = useState(false);
  const trainingDayCardBuilderRef = useRef(null);
  const saveNewTrainingDayCard = async () => {
    // Validation
    if (!newCard.title.trim() || !newCard.body.trim()) {
      toast.error("Title and body are required");
      return;
    }
    if (!newCard.image) {
      toast.error("Please upload an image");
      return;
    }

    let imageUrl = newCard.image;

    if (editingCardIndex !== null) {
      // Update existing card at same position
      const updatedCards = [...formData.trainingDaysSection.cards];
      updatedCards[editingCardIndex] = {
        title: newCard.title,
        body: newCard.body,
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
      // Add new card at the end
      setFormData((prev) => ({
        ...prev,
        trainingDaysSection: {
          ...prev.trainingDaysSection,
          cards: [
            ...prev.trainingDaysSection.cards,
            { title: newCard.title, body: newCard.body, image: imageUrl },
          ],
        },
      }));
      toast.success("Card added");
      setShowTrainingDayBuilder(false);
    }

    // Reset form
    setNewCard({ title: "", body: "", image: null });
    setFileInputKey((prev) => prev + 1); // clear file input if using key trick
  };
  const cancelNewTrainingDayCard = () => {
    setEditingCardIndex(null);
    setNewCard({ title: "", body: "", image: null });
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
  };
  const startEditTrainingDayCard = (index) => {
    setShowTrainingDayBuilder(true);
    const card = formData.trainingDaysSection.cards[index];
    setNewCard({
      title: card.title,
      body: card.body,
      image: card.image, // existing URL string (no preview)
    });
    setEditingCardIndex(index);
    trainingDayCardBuilderRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // === SCHEDULE ===
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    trainingDays: [],
  });
  const [editingScheduleIndex, setEditingScheduleIndex] = useState(null);
  const [showScheduleBuilder, setShowScheduleBuilder] = useState(false);
  const trainingScheduleBuilderRef = useRef();
  const saveSchedule = () => {
    if (!newSchedule.title.trim()) {
      toast.error("Session title is required");
      return;
    }
    if (newSchedule.trainingDays.length === 0) {
      toast.error("Session exercises is required");
      return;
    }

    // Updating existing schedule
    if (editingScheduleIndex !== null) {
      const updatedSchedules = [...formData.schedulesSection.schedules];
      updatedSchedules[editingScheduleIndex] = {
        title: newSchedule.title,
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
    }
    // adding new schedule
    else {
      setFormData((prev) => ({
        ...prev,
        schedulesSection: {
          ...prev.schedulesSection,
          schedules: [...prev.schedulesSection.schedules, { ...newSchedule }],
        },
      }));
    }

    // success alert
    toast.success("new schedule is created");

    // reset
    cancelSchedule();
  };
  const cancelSchedule = () => {
    setNewSchedule({ title: "", trainingDays: [] });
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
  };
  const startEditSchedule = (index) => {
    const schedule = formData.schedulesSection.schedules[index];
    setEditingScheduleIndex(index);
    setNewSchedule({
      title: schedule.title,
      trainingDays: JSON.parse(JSON.stringify(schedule.trainingDays)), // deep copy
    });
    setShowScheduleBuilder(true); // open the builder if hidden

    //  scroll to builder
    trainingScheduleBuilderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // === TRAINING SESSIONS ===
  const [newTrainingSession, setNewTrainingSession] = useState({
    title: "",
    subTitle: "",
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
      toast.error("Session title is required");
      return;
    }
    if (
      newTrainingSession.exercises.length === 0 &&
      !newTrainingSession.isRest
    ) {
      toast.error("Session exersies is required");
      return;
    }

    const session = {
      title: newTrainingSession.title,
      subTitle: newTrainingSession.subTitle,
      exercises: newTrainingSession.exercises,
      isRest: newTrainingSession.isRest,
    };

    // updating existing Session
    if (editingSessionIndex !== null) {
      const updatedTrainingSession = [...newSchedule.trainingDays];

      updatedTrainingSession[editingSessionIndex] = { ...session };

      setNewSchedule((prev) => ({
        ...prev,
        trainingDays: [...updatedTrainingSession],
      }));

      // success alert
      toast.success("session updated");

      setEditingSessionIndex(null);
    }

    // adding new training session
    else {
      setNewSchedule((prev) => ({
        ...prev,
        trainingDays: [...prev.trainingDays, session],
      }));
      // success alert
      toast.success("new session is created");
    }

    // reset builder
    cancelNewTrainingSession();
  };
  const cancelNewTrainingSession = () => {
    setNewTrainingSession({
      title: "",
      subTitle: "",
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

    setEditingSessionIndex(index);

    setNewTrainingSession({ ...session });

    setShowScheduleTrainingSessionBuilder(true); // open the builder if hidden

    //  scroll to builder
    trainingSessionBuilderRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleRestToggle = (checked) => {
    if (checked) {
      setNewTrainingSession({
        title: "Rest Day",
        subTitle: "Recovery",
        isRest: true,
        exercises: [],
      });
    } else {
      setNewTrainingSession({
        title: "",
        subTitle: "",
        isRest: false,
        exercises: [],
      });
    }
  };

  // === TRAINING SESSION EXERCISE ===
  const [newExercise, setNewExercise] = useState({
    name: "",
    webName: "",
  });
  const addExercise = () => {
    if (!newExercise.name.trim()) return;
    setNewTrainingSession((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          name: newExercise.name,
          webName:
            newExercise.webName ||
            newExercise.name.toLowerCase().replace(/\s/g, "-"),
        },
      ],
    }));
    setNewExercise({ name: "", webName: "" });
  };
  const removeExercise = (idx) => {
    setNewTrainingSession((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== idx),
    }));
  };

  //================
  return (
    <div className=" border border-white/10 p-8">
      {/* === FORM HEADER === */}
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold italic tracking-tight uppercase">
          New Split{" "}
        </h3>
        <div className="h-0.5 w-12 bg-[#0070FF] mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* === OUTER CARD SECTION === */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Card </h2>

          <Input
            type="text"
            name="name"
            label="Split Name *"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="split name"
          />
          <Input
            type="textarea"
            name="description"
            label="Short Description *"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="short descrwiption "
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

          <div>
            <label className="block  tracking-[0.05rem] font-medium text-zinc-400 mb-2">
              Extra Links
            </label>
            {formData.links.length > 0 && (
              <div className=" space-y-4 mb-4">
                {formData.links.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg p-3 ps-6 transition-all duration-200 group"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-white/90">
                        {link.label + " "} :
                      </span>
                      <span className="text-xs text-zinc-400 ml-2 break-all">
                        {link.url}
                      </span>
                    </div>
                    <Button
                      type="custom"
                      onClick={() => removeLink(idx)}
                      className="text-zinc-500 hover:!text-red-400 !transition-colors !duration-200  !rounded-md !p-2"
                      text=" ⨉"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <Input
                type="text"
                placeholder="label"
                value={linkInput.label}
                onChange={(e) =>
                  setLinkInput({ ...linkInput, label: e.target.value })
                }
                className="flex-1"
              />
              <Input
                type="url"
                placeholder="url"
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

        {/* === PAGE HEADER SECTION === */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Page Header</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Plain Title"
              value={formData.pageHeader.plainTitle}
              onChange={(e) =>
                handleNestedChange("pageHeader", "plainTitle", e.target.value)
              }
              placeholder="noncolored part of the title (before)"
            />
            <Input
              type="text"
              label="Highlighted Title"
              value={formData.pageHeader.highlightedTitle}
              onChange={(e) =>
                handleNestedChange(
                  "pageHeader",
                  "highlightedTitle",
                  e.target.value,
                )
              }
              placeholder=" colored part of the title (after)"
            />

            <div className="col-span-full">
              <Input
                type="textarea"
                label="Body Text"
                rows={3}
                value={formData.pageHeader.body}
                onChange={(e) =>
                  handleNestedChange("pageHeader", "body", e.target.value)
                }
                placeholder="body text"
              />
            </div>

            <div>
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
          </div>
        </section>

        <hr className="border-white/10" />

        {/* === TRAINING DAYS SECTION === */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Training Days</h2>

          {/* == TRAINING DAYS SECTION HEADER == */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              type="text"
              label="Section Plain Title"
              placeholder="e.g., Weekly"
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
            />
            <Input
              type="text"
              label="Section Highlighted Title"
              placeholder="e.g., Schedule"
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
            />

            <div className="col-span-full">
              <Input
                type="textarea"
                label="Section Body"
                rows={2}
                placeholder="Optional description"
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
              />
            </div>
          </div>

          {/* == TRAINING DAY CARDS == */}
          {formData.trainingDaysSection.cards.length > 0 && (
            <div className="space-y-2">
              <h3 className="block  tracking-[0.05rem] font-medium text-zinc-400 mb-4">
                Added Training days
              </h3>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {formData.trainingDaysSection.cards.map((card, idx) => {
                  return (
                    <div key={idx} className="relative">
                      <Card
                        type="top-image"
                        title={card.title}
                        body={card.body}
                        image={card.image}
                      />

                      <div className="absolute bottom-2 right-2 flex gap-1">
                        <div className="flex justify-end">
                          <Button
                            type="custom"
                            icon="edit"
                            onClick={() => {
                              startEditTrainingDayCard(idx);
                            }} // handleEditCard(idx)
                            className="!p-2" // optional: reduce padding for icon-only button
                          />
                          <Button
                            type="custom"
                            icon="delete"
                            onClick={() =>
                              openModal({
                                title: "Delete Card?",
                                message:
                                  "Are you sure you want to delete this?",
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
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* == ADD NEW TRAINING DAY == */}
          <div className="m-0 p-0" ref={trainingDayCardBuilderRef}></div>
          {!showTrainingDayBuilder ? (
            <Button
              type="outlined"
              text="+ Add New Training Day"
              onClick={() => setShowTrainingDayBuilder(true)}
              className="mb-6"
            />
          ) : (
            <div className="border border-white/10 p-6  rounded-sm space-y-4">
              <h3 className="text-lg font-bold text-white">New Training Day</h3>

              <Input
                required
                type="text"
                placeholder="training day ( eg. push ) "
                value={newCard.title}
                onChange={(e) =>
                  setNewCard({ ...newCard, title: e.target.value })
                }
              />
              <Input
                required
                type="textarea"
                placeholder="muscles targeted ( eg. in push day we train the chest and . . . )"
                value={newCard.body}
                onChange={(e) =>
                  setNewCard({ ...newCard, body: e.target.value })
                }
              />
              <Input
                key={fileInputKey}
                required
                type="file"
                placeholder="Upload training day image * "
                accept="image/*"
                onChange={(file) =>
                  handleImageFile(file, (url) => {
                    setNewCard({ ...newCard, image: url });
                  })
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
                  onClick={() => {
                    cancelNewTrainingDayCard();
                  }}
                />
              </div>
            </div>
          )}
        </section>

        <hr className="border-white/10" />

        {/* === TRAINING SCHEDULES SECTION ===  */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Schedules</h2>

          {/* === TRAINING SCHEDULES SECTION HEADER === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              type="text"
              label="Section Plain Title"
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
              type="text"
              label="Section Highlighted Title"
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

            <div className="col-span-full">
              <Input
                type="textarea"
                label="Section Body"
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
            </div>
          </div>

          {/* === ADDED TRAINING SCHEDULES === */}
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
                        {schedule.title}
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
                        <p className="text-white font-semibold">{day.title}</p>
                        {day.subTitle && (
                          <p className="text-zinc-400 text-xs">
                            {day.subTitle}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {day.exercises.map((ex, eIdx) => (
                            <span
                              key={eIdx}
                              className="bg-white/10 text-[10px] text-zinc-300 px-2 py-0.5 rounded"
                            >
                              {ex.name}
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

          {/* === ADD NEW TRAINING SCHEDULES === */}
          <div className="m-0 p-0" ref={trainingScheduleBuilderRef}></div>
          {!showScheduleBuilder ? (
            <Button
              type="outlined"
              text="+ Add New Schedule"
              onClick={() => setShowScheduleBuilder(true)}
              className="mb-6"
            />
          ) : (
            <div className="border border-white/10 rounded-sm p-6 space-y-4">
              {/* == SCHEDULE HEADER == */}
              <h3 className="text-lg font-bold text-white">New Schedule</h3>

              {/* == SCHEDULE TITLE == */}
              <Input
                type="text"
                label="Schedule Title *"
                value={newSchedule.title}
                onChange={(e) =>
                  setNewSchedule((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="eg. ppl-1"
              />

              {/* == TRAINING SESSIONS  == */}
              <div className="space-y-3 mt-4 ">
                {/* == ADDED TRAINING SESSIONS NUMBER == */}
                {newSchedule.trainingDays.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-base text-zinc-400">
                      Added Sessions
                    </span>
                  </div>
                )}

                {/* == ADDED TRAINING SESSIONS  == */}
                {newSchedule.trainingDays.map((day, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-start"
                  >
                    <div>
                      <p className="text-white font-medium">{day.title}</p>
                      {day.subTitle && (
                        <p className="text-zinc-400 text-xs">{day.subTitle}</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {day.exercises.map((ex, exIdx) => (
                          <span
                            key={exIdx}
                            className="bg-white/10 text-[10px] text-zinc-300 px-2 py-0.5 rounded"
                          >
                            {ex.name}
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
                        icon="delete"
                        type="custom"
                        onClick={() => removeTrainingSession(idx)}
                        className="!p-2 text-red-400 text-xs"
                      />
                    </div>
                  </div>
                ))}

                {/* == FORM TO ADD THE TRAINING SESSION  == */}
                <div className="m-0 p-0" ref={trainingSessionBuilderRef}></div>
                {!showScheduleTrainingSessionBuilder ? (
                  <Button
                    type="outlined"
                    text="+ Add Training Session"
                    onClick={() => setShowScheduleTrainingSessionBuilder(true)}
                    className="mt-2 w-full"
                  />
                ) : (
                  <div className="border border-white/10 p-4  mt-2">
                    {/* == SESSION HEADER == */}
                    <h3 className="text-base font-bold text-white mb-6">
                      New Training Session
                    </h3>

                    {/* == IS REST DAY CHECKBOX == */}
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

                    {/* == SESSION BUILDER == */}
                    {!newTrainingSession.isRest ? (
                      <div className="space-y-2 mb-4">
                        {/* == SESSION TITLE == */}
                        <Input
                          type="text"
                          placeholder="Day title (e.g., Push Day)"
                          value={newTrainingSession.title}
                          onChange={(e) =>
                            setNewTrainingSession((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                        {/* == SESSION SUBTITLE == */}
                        <Input
                          type="text"
                          placeholder="Subtitle (optional)"
                          value={newTrainingSession.subTitle}
                          onChange={(e) =>
                            setNewTrainingSession((prev) => ({
                              ...prev,
                              subTitle: e.target.value,
                            }))
                          }
                        />
                        {/* == ADDED EXERCISES == */}
                        {newTrainingSession.exercises.length > 0 && (
                          <div className="flex flex-wrap gap-2 ">
                            {newTrainingSession.exercises.map((ex, exIdx) => (
                              <span
                                key={exIdx}
                                className="bg-white/10 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
                              >
                                {ex.name}
                                <button
                                  type="button"
                                  onClick={() => removeExercise(exIdx)}
                                  className="text-red-400 text-xs ml-1"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        <label className="text-zinc-400 text-sm flex items-center gap-2">
                          added exercises
                        </label>

                        {/* == FORM TO ADD EXERCISES == */}
                        <div className="flex flex-col md:flex-row gap-3 mb-4">
                          <Input
                            type="text"
                            placeholder="Exercise name (e.g., Bench Press)"
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
                            type="text"
                            placeholder="Web name (slug)"
                            value={newExercise.webName}
                            onChange={(e) =>
                              setNewExercise((prev) => ({
                                ...prev,
                                webName: e.target.value,
                              }))
                            }
                            className="flex-1"
                          />
                          <Button
                            type="filled"
                            text="Add"
                            onClick={addExercise}
                            rounded="rounded-md"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-zinc-400 italic text-sm  mb-4">
                        Rest day – no exercises
                      </div>
                    )}

                    {/* == SAVING SESSION == */}
                    <div className="flex justify-end ">
                      <div className="flex gap-2 items-center ">
                        <Button
                          type="filled"
                          text="save"
                          onClick={saveNewTrainingSession}
                          className="w-full flex-1"
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
              </div>

              {/* == SAVING SCHEDULE == */}
              <div className="flex gap-2 items-center  mt-10">
                <Button
                  type="filled"
                  text={editingCardIndex !== null ? "Update Card" : "Save Card"}
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

        {/* === TIP OR INFO SECTION === */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Optional Tip</h2>
          <div className="grid gap-4">
            <Input
              type="textarea"
              label="Tip Body"
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
              placeholder="Add a helpful tip for this split..."
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

        {/* == SAVE AND CANCEL == */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="outlined"
            text="Cancel"
            onClick={() => {
              openModal({
                title: "Discard changes?",
                message:
                  "You may have unsaved changes. Are you sure you want to leave?",
                confirmText: "Yes, discard",
                cancelText: "Stay",
                confirmVariant: "warning",
                onConfirm: () => navigate("/dashboard/splits"),
              });
            }}
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
        <ErrorTag error={error} />
      </form>
    </div>
  );
};

export default CreateSplitForm;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createExercise,
  updateExercise,
} from "../../store/slices/exercisesSlice";
import { useBlocker, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import toast from "react-hot-toast";
import { uploadImage } from "../../utils/uploadImage";
import ErrorTag from "../ErrorTag";
import { useModal } from "../../contexts/ModalContext";

const CreateExerciseForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { status, error } = useSelector((state) => state.exercises);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

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

  // State with Arabic fields
  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    muscle: "",
    muscle_ar: "",
    muscleHead: "",
    muscleHead_ar: "",
    description: "",
    description_ar: "",
    image: "",
    videoUrl: "",
    difficulty: "Beginner",
    importance: 5,
    links: [], // each link: { label, label_ar, url }
  });

  // Link input (both languages)
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

  const [uploadingImage, setUploadingImage] = useState(false);
  const handleImageFile = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      setHasUnsavedChanges(true);
      toast.success("Image uploaded");
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setHasUnsavedChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation (English required fields)
    if (!formData.name || !formData.muscle || !formData.description) {
      toast.error("Please fill all required fields and upload an image");
      return;
    }

    const title = isEditing ? "Update Exercise" : "Create Exercise";
    const message = isEditing
      ? "Are you sure you want to save these changes?"
      : "Are you sure you want to create this exercise?";
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
              updateExercise({ id: editingId, updates: formData }),
            ).unwrap();
            toast.success("Exercise updated");
          } else {
            await dispatch(createExercise(formData)).unwrap();
            toast.success("Exercise created");
          }
          navigate("/dashboard/exercises", { state: {} });
        } catch (err) {
          toast.error(err || `${isEditing ? "Update" : "Creation"} failed`);
        }
      },
    });
  };

  // Populate form when editing
  useEffect(() => {
    if (location.state?.isEditing && location.state?.exercise) {
      const ex = location.state.exercise;
      setIsEditing(true);
      setEditingId(ex._id);
      setFormData({
        name: ex.name || "",
        name_ar: ex.name_ar || "",
        muscle: ex.muscle || "",
        muscle_ar: ex.muscle_ar || "",
        muscleHead: ex.muscleHead || "",
        muscleHead_ar: ex.muscleHead_ar || "",
        description: ex.description || "",
        description_ar: ex.description_ar || "",
        image: ex.image || "",
        videoUrl: ex.videoUrl || "",
        difficulty: ex.difficulty || "Beginner",
        importance: ex.importance || 5,
        links: (ex.links || []).map((link) => ({
          label: link.label,
          label_ar: link.label_ar || "",
          url: link.url,
        })),
      });
    } else {
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        name: "",
        name_ar: "",
        muscle: "",
        muscle_ar: "",
        muscleHead: "",
        muscleHead_ar: "",
        description: "",
        description_ar: "",
        image: "",
        videoUrl: "",
        difficulty: "Beginner",
        importance: 5,
        links: [],
      });
    }
  }, [location.state]);

  return (
    <div className="border border-white/10 p-8">
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold italic tracking-tight uppercase">
          {isEditing ? "Edit Exercise" : "Create New Exercise"}
        </h3>
        <div className="h-0.5 w-12 bg-[#0070FF] mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* === NAME (English + Arabic) === */}
        <div className="space-y-4">
          <Input
            label="Name (English) *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Bench Press"
          />
          <Input
            dir="rtl"
            label="Name (Arabic)"
            type="text"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleChange}
            placeholder="مثال: ضغط الصدر"
          />
        </div>

        {/* === MUSCLE & MUSCLE HEAD (English + Arabic) === */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Muscle (English) *"
              type="text"
              name="muscle"
              value={formData.muscle}
              onChange={handleChange}
              required
              placeholder="e.g., chest"
            />
            <Input
              dir="rtl"
              label="Muscle (Arabic)"
              type="text"
              name="muscle_ar"
              value={formData.muscle_ar}
              onChange={handleChange}
              placeholder="مثال: صدر"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Muscle Head (English)"
              type="text"
              name="muscleHead"
              value={formData.muscleHead}
              onChange={handleChange}
              placeholder="e.g., upper chest"
            />
            <Input
              dir="rtl"
              label="Muscle Head (Arabic)"
              type="text"
              name="muscleHead_ar"
              value={formData.muscleHead_ar}
              onChange={handleChange}
              placeholder="مثال: أعلى الصدر"
            />
          </div>
        </div>

        {/* === DESCRIPTION (English + Arabic) === */}
        <div className="space-y-4">
          <Input
            label="Description (English) *"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe the exercise in English"
          />
          <Input
            dir="rtl"
            label="Description (Arabic)"
            type="textarea"
            name="description_ar"
            value={formData.description_ar}
            onChange={handleChange}
            rows={4}
            placeholder="شرح التمرين بالعربية"
          />
        </div>

        {/* === IMAGE UPLOAD (same for both) === */}
        <Input
          name="image"
          type="file"
          label="Exercise Image"
          accept="image/*"
          placeholder="upload exercise image"
          onChange={handleImageFile}
        />

        {/* === DIFFICULTY (single, not translated) === */}
        <Input
          label="Difficulty *"
          type="select"
          required
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          options={[
            { value: "Beginner", label: "BEGINNER" },
            { value: "Intermediate", label: "INTERMEDIATE" },
            { value: "Advanced", label: "ADVANCED" },
          ]}
          placeholder="Select difficulty"
        />

        {/* === IMPORTANCE === */}
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

        {/* === EXTRA LINKS (both label and label_ar) === */}
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

        {/* === BUTTONS === */}
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
                onConfirm: () => navigate("/dashboard/exercises"),
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
                  ? "Update Exercise"
                  : "Create Exercise"
            }
            disabled={uploadingImage || status === "loading"}
          />
        </div>
        {error && <ErrorTag type="small" error={error} severity="error" />}
      </form>
    </div>
  );
};

export default CreateExerciseForm;

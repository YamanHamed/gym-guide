import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createExercise,
  updateExercise,
} from "../../store/slices/exercisesSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import toast from "react-hot-toast";
import { uploadImage } from "../../utils/uploadImage";
import ErrorTag from "../ErrorTag";
import { useModal } from "../../contexts/ModalContext";

const CreateExerciseForm = () => {
  // == METHODS AND HOOKS
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { status, error } = useSelector((state) => state.exercises);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  // == MAIN STATE
  const [formData, setFormData] = useState({
    name: "",
    muscle: "",
    muscleHead: "",
    description: "",
    image: "",
    videoUrl: "",
    difficulty: "Beginner",
    links: [],
  });
  // == LINKS STATE
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
  // == HANDLERS
  const [uploadingImage, setUploadingImage] = useState(false);
  const handleImageFile = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
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
  };
  // == SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.muscle ||
      !formData.description ||
      !formData.image
    ) {
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

  useEffect(() => {
    if (location.state?.isEditing && location.state?.exercise) {
      const ex = location.state.exercise;
      setIsEditing(true);
      setEditingId(ex._id);
      setFormData({
        name: ex.name || "",
        muscle: ex.muscle || "",
        muscleHead: ex.muscleHead || "",
        description: ex.description || "",
        image: ex.image || "",
        videoUrl: ex.videoUrl || "",
        difficulty: ex.difficulty || "Beginner",
        links: ex.links || [],
      });
    } else {
      // Reset form when entering create mode (e.g., after navigating away)
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        name: "",
        muscle: "",
        muscleHead: "",
        description: "",
        image: "",
        videoUrl: "",
        difficulty: "Beginner",
        links: [],
      });
    }
  }, []);

  return (
    <div className=" border border-white/10 p-8">
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold italic tracking-tight uppercase">
          {isEditing ? "Edit Exercise" : "Create New Exercise"}
        </h3>
        <div className="h-0.5 w-12 bg-[#0070FF] mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* == NAME == */}
        <Input
          label="Name *"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="exercise name"
        />

        {/* == MUSCLE AND MUSCLE HEAD == */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="  Muscle *"
            type="text"
            name="muscle"
            value={formData.muscle}
            onChange={handleChange}
            required
            placeholder="e.g., chest, back, legs"
          />
          <Input
            label=" Muscle Head"
            type="text"
            name="muscleHead"
            value={formData.muscleHead}
            onChange={handleChange}
            placeholder="e.g., upper, lower, middle"
          />
        </div>

        {/* == DESCRIPTION == */}
        <Input
          label="Description *"
          type="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="description"
        />

        {/* == IMAGE UPLOAD == */}
        <Input
          name="image"
          type="file"
          label="Exercise Image"
          accept="image/*"
          placeholder="upload exercise image"
          onChange={handleImageFile}
        />

        {/* == DIFFICULTY == */}
        <Input
          label=" Difficulty *"
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

        {/* == LINKS == */}
        <div>
          <label className="block  tracking-[0.05rem] font-medium text-zinc-400 mb-2">
            Extra Links
          </label>
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
          {formData.links.length > 0 && (
            <div className=" space-y-4">
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
        </div>

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
        <ErrorTag error={error} />
      </form>
    </div>
  );
};

export default CreateExerciseForm;

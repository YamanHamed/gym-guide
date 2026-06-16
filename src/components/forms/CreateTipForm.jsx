import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import toast from "react-hot-toast";
import { useModal } from "../../contexts/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { createTip, updateTip } from "../../store/slices/tipsSlice";
import ErrorTag from "../ErrorTag";

const CreateTipForm = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { status, error } = useSelector((state) => state.tips);

  // MAIN STATE with Arabic fields
  const [formData, setFormData] = useState({
    title: "",
    title_ar: "",
    content: "",
    content_ar: "",
    tags: ["general"],
    importance: 5,
    links: [],
  });

  // Links state with Arabic label
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
      setLinkInput({ label: "", label_ar: "", url: "" });
    }
  };

  const removeLink = (index) => {
    const newLinks = [...formData.links];
    newLinks.splice(index, 1);
    setFormData({ ...formData, links: newLinks });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!formData.content.trim()) {
      toast.error("Please enter the content/description");
      return;
    }

    const title = isEditing ? "Update Tip" : "Create Tip";
    const message = isEditing
      ? "Are you sure you want to save these changes?"
      : "Are you sure you want to create this tip?";
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
              updateTip({ id: editingId, updates: formData }),
            ).unwrap();
            toast.success("Tip updated successfully");
          } else {
            await dispatch(createTip(formData)).unwrap();
            toast.success("Tip created successfully");
          }
          navigate("/dashboard/tips", { state: {} });
        } catch (err) {
          toast.error(err || `${isEditing ? "Update" : "Creation"} failed`);
        }
      },
    });
  };

  // Populate form when editing
  useEffect(() => {
    if (location.state?.isEditing && location.state?.tip) {
      const tip = location.state.tip;
      // eslint-disable-next-line
      setIsEditing(true);
      setEditingId(tip._id);
      setFormData({
        title: tip.title || "",
        title_ar: tip.title_ar || "",
        content: tip.content || "",
        content_ar: tip.content_ar || "",
        tags: tip.tags || ["general"],
        importance: tip.importance || 5,
        links: (tip.links || []).map((link) => ({
          label: link.label,
          label_ar: link.label_ar || "",
          url: link.url,
        })),
      });
    } else {
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        title: "",
        title_ar: "",
        content: "",
        content_ar: "",
        tags: ["general"],
        importance: 5,
        links: [],
      });
    }
  }, [location.state]);

  return (
    <div className="border border-white/10 p-8">
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold italic tracking-tight uppercase">
          {isEditing ? "Edit Tip" : "Create New Tip"}
        </h3>
        <div className="h-0.5 w-12 bg-[#0070FF] mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          type="text"
          label="Title (English) *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Proper Breathing Technique"
        />
        <Input
          dir="rtl"
          type="text"
          label="Title (Arabic)"
          name="title_ar"
          value={formData.title_ar}
          onChange={handleChange}
          placeholder="مثال: تقنية التنفس الصحيحة"
        />

        <Input
          name="content"
          type="textarea"
          label="Content (English) *"
          value={formData.content}
          onChange={handleChange}
          rows={6}
          placeholder="Write the tip content in English..."
        />
        <Input
          dir="rtl"
          name="content_ar"
          type="textarea"
          label="Content (Arabic)"
          value={formData.content_ar}
          onChange={handleChange}
          rows={6}
          placeholder="اكتب محتوى النصيحة بالعربية..."
        />

        <Input
          type="checkbox-group"
          name="tags"
          label="Categories"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          options={[
            { value: "general", label: "General" },
            { value: "exercises", label: "Exercises" },
            { value: "splits", label: "Splits" },
            { value: "nutrition", label: "Nutrition" },
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

        <div>
          <label className="block tracking-[0.05rem] font-medium text-zinc-400 mb-2">
            Extra Links
          </label>

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

          {formData.links.length > 0 && (
            <div className="space-y-1">
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
        </div>

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
                onConfirm: () => navigate("/dashboard/tips"),
              });
            }}
          />
          <Button
            type="filled"
            text={
              status === "loading"
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Tip"
                  : "Create Tip"
            }
            submit
            disabled={status === "loading"}
          />
        </div>
        {error && <ErrorTag type="small" error={error} severity="error" />}
      </form>
    </div>
  );
};

export default CreateTipForm;

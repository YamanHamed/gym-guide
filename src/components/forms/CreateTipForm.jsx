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
  // == METHODS AND HOOKS
  const navigate = useNavigate();
  const { openModal } = useModal();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { status, error } = useSelector((state) => state.tips);
  // == MAIN STATE
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tag: "general",
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
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

  useEffect(() => {
    if (location.state?.isEditing && location.state?.tip) {
      const tip = location.state.tip;
      // eslint-disable-next-line
      setIsEditing(true);
      setEditingId(tip._id);
      setFormData({
        title: tip.title || "",
        content: tip.content || "",
        links: tip.links || [],
      });
    } else {
      // Reset form for create mode
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        title: "",
        content: "",
        links: [],
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className=" border border-white/10 p-8">
      {/* === FORM HEADER === */}
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold italic tracking-tight uppercase">
          New Tip
        </h3>
        <div className="h-0.5 w-12 bg-[#0070FF] mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          type="text"
          label="Title *"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          name="content"
          type="textarea"
          label="Content *"
          value={formData.content}
          onChange={handleChange}
        />
        <Input
          type="select"
          name="tag"
          label="Category"
          value={formData.tag}
          onChange={handleChange}
          options={[
            { value: "general", label: "General" },
            { value: "technique", label: "Technique" },
            { value: "nutrition", label: "Nutrition" },
            { value: "motivation", label: "Motivation" },
          ]}
        />

        <div>
          <label className="block  tracking-[0.05rem] font-medium text-zinc-400 mb-2">
            Extra Links
          </label>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <Input
              type="text"
              placeholder="Label"
              value={linkInput.label}
              onChange={(e) =>
                setLinkInput({ ...linkInput, label: e.target.value })
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
        <ErrorTag error={error} />
      </form>
    </div>
  );
};

export default CreateTipForm;

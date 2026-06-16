import toast from "react-hot-toast";

export const copyToClipboard = async (text, label = "Email") => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  } catch (err) {
    toast.error("Failed to copy. Please try again later.");
    console.error(err);
  }
};

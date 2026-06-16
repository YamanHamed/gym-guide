import React, { useState } from "react";
import Header from "./Header";
import Hr from "./Hr";
import Button from "./Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const FeedBackSec = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Transition Divider */}
      <Hr />

      <section className="max-w-7xl mx-auto">
        {/* Header Section */}
        <Header
          className="mb-16"
          plainTitle={t("feedback.plainTitle")}
          highlightTitle={t("feedback.highlightTitle")}
          body={t("feedback.body")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Connection Status */}
          <div className="hidden md:flex md:col-span-1 flex-col justify-between p-8 rounded-[2rem] bg-surface-container-low/30 border border-white/5">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#0070FF] animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50">
                  {t("feedback.status")}
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed italic">
                {t("feedback.quote")}
              </p>
            </div>

            <div className="mt-12 opacity-20">
              <span className="notranslate material-symbols-outlined text-6xl text-white">
                sensors
              </span>
            </div>
          </div>
          {/* Right Columns: The Form Area */}
          <div className="col-span-1 md:col-span-2 p-8 md:p-12 rounded-[2rem] bg-surface-container-low/30 border border-white/5">
            {/* Form Title */}
            <div>
              <h3 className="text-white text-xl font-bold italic tracking-tight uppercase">
                {t("feedback.formTitle")}
              </h3>

              <div className="h-0.5 w-12 bg-[#0070FF] mt-2 mb-6"></div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeedBackSec;

const ContactForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please write a message");
      return;
    }
    setIsSending(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, {
        name: name.trim() || "Anonymous",
        email: email.trim() || "not provided",
        message: message.trim(),
      });
      toast.success("Message sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={t("contactForm.namePlaceholder")}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-[#0070FF]/50 transition-all placeholder:text-zinc-700"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={t("contactForm.emailPlaceholder")}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-[#0070FF]/50 transition-all placeholder:text-zinc-700"
        />
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="5"
        placeholder={t("contactForm.messagePlaceholder")}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-[#0070FF]/50 transition-all placeholder:text-zinc-700 resize-none"
      ></textarea>

      {/* Primary Colored Submit Button */}
      <button
        disabled={isSending}
        className="group relative w-full py-5 bg-[#0070FF] hover:bg-[#005ed4] rounded-xl overflow-hidden transition-all shadow-[0_0_20px_-5px_rgba(0,112,255,0.4)] active:scale-[0.98]"
      >
        <span className="relative text-[11px] font-black uppercase tracking-[0.4em] text-white flex items-center justify-center gap-3">
          {isSending ? t("contactForm.sending") : t("contactForm.send")}
          <span className="notranslate material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
            north_east
          </span>
        </span>
      </button>
    </form>
  );
};

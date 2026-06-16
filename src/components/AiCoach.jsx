import { useState, useRef, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, sendMessage } from "../store/slices/chatSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// Sub-component for individual messages
const Message = ({ role, content, time }) => {
  const isAI = role === "assistant";
  return (
    <div
      className={`flex flex-col ${isAI ? "items-start" : "items-end"} max-w-[85%] ${isAI ? "self-start" : "self-end"} animate-in fade-in slide-in-from-${isAI ? "left" : "right"}-4 duration-500`}
    >
      <div className={`flex items-center gap-2 mb-2 ${isAI ? "ml-1" : "mr-1"}`}>
        {isAI && (
          <div className="w-6 h-6 rounded-md bg-surface-container-high flex items-center justify-center">
            <span
              className="notranslate material-symbols-outlined text-[#0070FF] text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              smart_toy
            </span>
          </div>
        )}
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          {isAI ? "Coach" : "You"}
        </span>
      </div>
      <div
        className={`${isAI ? "bg-surface-container border border-white/5 rounded-tl-none" : "bg-[#0070FF] text-white rounded-tr-none shadow-[0_10px_30px_-10px_rgba(0,112,255,0.4)]"} rounded-2xl p-5 backdrop-blur-sm`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
      <span
        className={`text-[10px] text-zinc-600 mt-2 ${isAI ? "ml-1" : "mr-1"}`}
      >
        {time}
      </span>
    </div>
  );
};
const LoadingDots = () => {
  return (
    <div className="flex flex-col items-start max-w-[85%] self-start animate-in fade-in duration-500">
      {/* Header - Matches the Message header spacing */}
      <div className="flex items-center gap-2 mb-2 ml-1">
        <div className="w-6 h-6 rounded-md bg-surface-container-high flex items-center justify-center">
          <span
            className="notranslate material-symbols-outlined text-[#0070FF] text-sm animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            smart_toy
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Coach is thinking
        </span>
      </div>

      {/* Bubble - Matches p-5 and rounded corners exactly */}
      <div className="bg-surface-container border border-white/5 rounded-2xl rounded-tl-none p-5 backdrop-blur-sm min-w-[80px]">
        <div className="flex gap-1.5 items-center justify-start h-5">
          {/* Using a slightly softer blue for the dots to keep it "thinking" */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#0070FF]/60 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0070FF]/60 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0070FF]/60 animate-bounce"></div>
        </div>
      </div>

      {/* Footer Spacer - Matches the timestamp height so the screen doesn't jump */}
      <span className="text-[10px] text-transparent mt-2 ml-1 select-none">
        00:00
      </span>
    </div>
  );
};

const AICoach = () => {
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { messages, isLoading } = useSelector((state) => state.chat);
  const { t } = useTranslation();

  // Auto-scroll to bottom when a new message arrives
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollToBottom = () => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      };

      // Trigger on next frame
      requestAnimationFrame(scrollToBottom);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMsg = {
      role: "user",
      content: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    dispatch(addUserMessage(userMsg));
    const currentMsg = inputValue;
    setInputValue("");
    try {
      await dispatch(sendMessage(currentMsg)).unwrap();
    } catch (err) {
      toast.error(err || "Failed to get AI response");
    }
  };

  return (
    <div className="flex flex-col supports-[height:100dvh]:h-[calc(100dvh-80px)] h-[calc(100vh-80px)] overflow-hidden relative">
      {/* Messages Scroll Area */}
      <main
        ref={scrollRef}
        className="flex-grow overflow-y-auto py-8 custom-scrollbar scroll-smooth"
      >
        <div className="max-w-4xl mx-auto flex flex-col space-y-8 pb-10">
          <Message
            role="assistant"
            content={t("chat.welcome")}
            time={new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
          {messages.map((msg, index) => (
            <Message
              key={index}
              role={msg.role}
              content={msg.content}
              time={msg.time}
            />
          ))}
          {isLoading && <LoadingDots />}
        </div>
      </main>

      {/* Floating Input Area – sticks to bottom of container */}
      <div className="sticky  bottom-0 pt-3 pb-2">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="relative bg-surface-container rounded-xl border border-white/10 shadow-lg">
              <Input
                type="textarea"
                placeholder={t("chat.placeholder")}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                rows={1}
                className="w-full pe-12 resize-none overflow-hidden !bg-transparent !border-none focus:ring-0 mb-10"
              />
              <Button
                onClick={handleSendMessage}
                icon="arrow_upward"
                className="absolute bottom-2 end-2 flex items-center justify-center w-10 h-10 m-1 !rounded-1xl"
              />
            </div>
          </div>
          <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold mt-2">
            {t("chat.footer")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AICoach;

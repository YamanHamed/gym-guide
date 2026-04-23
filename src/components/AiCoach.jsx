import { useState, useRef, useEffect } from "react";

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
              className="material-symbols-outlined text-[#0070FF] text-sm"
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
            className="material-symbols-outlined text-[#0070FF] text-sm animate-pulse"
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
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const quickActions = [
    {
      id: 1,
      label: "Form Check",
      prompt: "Can you help me check my form for my deadlift?",
    },
    {
      id: 2,
      label: "Meal Plan",
      prompt: "I need a high-protein meal plan for lean bulking.",
    },
    {
      id: 3,
      label: "Fix My Split",
      prompt: "My current 3-day split feels stale. How can I optimize it?",
    },
    {
      id: 4,
      label: "Supplement Guide",
      prompt: "What are the essential supplements for muscle recovery?",
    },
  ];
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome back, ready to crush your workout ?",
      time: "09:41 AM",
    },
  ]);

  // Auto-scroll to bottom when a new message arrives
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      // We use a small delay to ensure the new message is rendered in the DOM
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

    const userMessage = {
      role: "user",
      content: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // 🎯 POINTING TO YOUR BACKEND (Change 5000 to your actual backend port)
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();

      const aiMessage = {
        role: "assistant",
        content: data.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Frontend Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden relative">
      {/* Messages Scroll Area */}
      <main
        ref={scrollRef}
        className="flex-grow overflow-y-auto px-4 md:px-0 py-8 custom-scrollbar scroll-smooth"
      >
        <div className="max-w-4xl mx-auto flex flex-col space-y-8 pb-10">
          {/* Messages go here... */}

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

      {/* Floating Input Area - Fixed Background Color */}
      <div className="w-full bg-background/80 backdrop-blur-xl px-4 pb-8 pt-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {/* Quick Action Pills - Added no-scrollbar class */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="whitespace-nowrap px-5 py-2 rounded-full bg-surface-container/50 border border-white/5 text-[10px] font-bold uppercase tracking-tighter hover:bg-[#0070FF] hover:text-white transition-all active:scale-95 text-on-surface-variant"
                onClick={() => {
                  setInputValue(action.prompt);
                }}
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Main Input Container */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0070FF]/20 to-[#0070FF]/20 rounded-full blur opacity-50 group-focus-within:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center bg-surface-container rounded-full p-2 border border-white/10 shadow-2xl">
              {/* <button className="flex items-center justify-center w-12 h-12 rounded-full text-zinc-500 hover:text-[#0070FF] transition-colors">
                <span className="material-symbols-outlined">add_circle</span>
              </button> */}
              <input
                className="flex-grow bg-transparent border-none focus:ring-0 text-on-surface placeholder-zinc-600 ps-4 px-2 py-3 text-sm outline-none"
                placeholder="Ask Coach about your performance..."
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0070FF] text-white shadow-lg hover:scale-105 active:scale-90 transition-all"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  send
                </span>
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
            Coach can make mistakes. Verify critical training data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AICoach;

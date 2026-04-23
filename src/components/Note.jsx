const Note = ({ className, body, linkText, linkUrl, icon = "lightbulb_2" }) => {
  return (
    <div className={`flex gap-4 group ${className || ""}`}>
      <div className="flex flex-col">
        {/* == BODY == */}
        <p className="text-md text-zinc-500 mb-4 font-light leading-relaxed italic">
          <span className="notranslate material-symbols-outlined text-primary-container text-xl select-none me-2 mb-2 ">
            {icon}
          </span>
          {body}
        </p>

        {/* == READ MORE LINK == */}
        {linkText && linkUrl && (
          <a
            href={linkUrl}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-primary-container transition-all duration-500  "
          >
            {linkText}
            <span className="notranslate material-symbols-outlined text-xs ">
              arrow_forward
            </span>
          </a>
        )}
      </div>
    </div>
  );
};
export default Note;

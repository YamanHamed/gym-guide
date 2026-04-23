function Card({
  // styles for the whole card ( usually for margins and width )
  className = "",
  // type = {"steps" , " full-image" or default }
  type,
  // == step
  step,
  // == icon
  icon,
  iconColor = "text-primary-container",
  // == tag
  tag,
  tagColor,
  // == title
  title,
  titleColor = "text-white",
  titleSize,
  titleClassName = "",
  // == body
  body,
  bodyColor = "text-zinc-500",
  bodySize,
  bodyClassName = "",
  // == image
  image,
  imageAlt = "",
  imageRounded = "rounded-xl",
  // == styles
  bg = "",
  rounded,
  border = "gray",
  // == links in footer
  links = [], // Type : [ { label, url } ]
  // == others
  onClick,
  reverse,
  children,
}) {
  const bgStyles = {
    dark: "bg-[#050505]",
    gray: "bg-white/[0.02]",
    gradient: "bg-gradient-to-br from-[#0070FF]/10 to-transparent",
    primary: "bg-primary-container",
  };
  const borderStyles = {
    primary: " border border-[#0070FF]/20 hover:border-primary-container/30",
    gray: "border border-white/10 hover:border-white/20",
  };
  // const textSizesStyles = {
  //   // Titles
  //   pageHeaderTitle: "text-5xl md:text-7xl",
  //   sectionHeaderTitle: "text-4xl",
  //   fullImageCardTitle: " text-3xl",
  //   topImageCardTitle: " text-2xl",
  //   sideImageCardTitle: "text-4xl md:text-5xl",
  //   defaultTitle: "text-xl",
  //   // Body
  //   largeBody: "text-lg", // headers
  //   mediumBody: "text-md", // cards
  //   smallBody: "text-sm", // footers
  //   // Tags
  //   tag: "text-[10px]",
  // };
  // const fontWeights = {
  //   page: "font-black",
  //   section: "font-black",
  //   cardTitle: "font-extrabold",
  //   cardBody: "font-light",
  // };

  if (type === "steps") {
    return (
      <div
        className={`
          relative group p-8 transition-all duration-500 overflow-hidden cursor-pointer
          ${rounded || ""}
          ${bgStyles[bg] || ""} 
          ${border && !className.includes("border") ? borderStyles[border] : ""}
          ${className || ""}
        `}
      >
        {/* == STEP LAYER == */}
        {step && (
          <div className="absolute top-4 right-8 text-6xl font-black italic text-white/5 group-hover:text-[#0070FF]/10 transition-colors pointer-events-none select-none">
            {step}
          </div>
        )}

        {/* == CONTENT LAYER == */}
        <div className=" z-10 ">
          {/* == ICON AND TAG == */}
          <div className="flex items-center gap-3 mb-6 relative ">
            {icon && (
              <span
                className={`notranslate material-symbols-outlined ${iconColor} text-3xl `}
              >
                {icon}
              </span>
            )}
            {tag && (
              <span
                className={`${tagColor || "text-zinc-500"} text-[10px] font-black uppercase tracking-[0.2em]`}
              >
                {tag}
              </span>
            )}
          </div>
          {/* == TITLE == */}
          <h4
            className={` 
            ${titleColor} ${titleSize || "text-lg"} tracking-[0.1em] mb-6  
            relative ${titleClassName}

            tuppercase italic font-black 
        `}
          >
            {title}
          </h4>
          {/* == BODY == */}
          <p
            className={`
             ${bodySize || "text-md"}  ${bodyColor} font-light leading-relaxed 
              ${bodyClassName}
          `}
          >
            {body}
          </p>
          {/* == OPTIONAL CHILDREN == */}
          {children && <div className="mt-4 relative">{children}</div>}
        </div>
      </div>
    );
  }
  if (type === "full-image") {
    return (
      <div
        onClick={onClick}
        className={` cursor-pointer group relative overflow-hidden ${rounded} ${className}`}
      >
        {/* == IMAGE LAYER == */}
        <img
          src={image}
          alt={imageAlt}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 `}
        />

        {/* == READABILITY OVERLAY == */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Base Layer: The "Light" hover state (always underneath) */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/15 to-transparent" />

          {/* Top Layer: The "Dark" normal state (fades out on hover) */}
          <div
            className="
              absolute transition-all duration-500 inset-0 ease-out
              bg-gradient-to-br from-black/80 via-black/30 to-transparent
              group-hover:opacity-0
            "
          />
        </div>

        {/* == CONTENT LAYER == */}
        <div className="relative h-full p-8 flex flex-col justify-between z-10">
          <div>
            {/* == TAG == */}
            <span
              className={`
                ${tagColor || "text-primary-container"} text-[10px] lowercase tracking-[0.2em] 
                block mb-1 ps-2 italic`}
            >
              {tag}
            </span>
            {/* == TITLE == */}
            <h2
              className={`
                ${titleColor} ${titleSize || "text-3xl"} font-extrabold uppercase tracking-tighter italic
                group-hover:text-[#0070FF] transition-all duration-300 
                ${titleClassName} 
              `}
            >
              {title}
            </h2>
          </div>
          {/* == ARROW LINK == */}
          <div className="flex justify-end">
            <span className="material-symbols-outlined notranslate text-zinc-500  group-hover:text-[#0070FF] transition-all duration-500 ">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (type === "top-image") {
    return (
      <div
        onClick={onClick}
        className={` relative group  transition-all duration-500 overflow-hidden cursor-pointer
          ${rounded || ""}
          ${bgStyles[bg] || ""} 
          ${border && !className.includes("border") ? borderStyles[border] : ""}
          ${className || ""}
        `}
      >
        {/* == IMAGES == */}
        <div className=" w-full overflow-hidden bg-surface-container-low relative border-b border-white/10">
          <img className="w-full h-full object-cover " src={image} />
        </div>

        {/* == CONTENT == */}
        <div className="flex-1 flex flex-col py-8  px-6  md:p-8 ">
          {/* == TITLE == */}
          <div className={`flex items-top justify-between gap-3 mb-6`}>
            <h2 className="text-2xl text-white uppercase  italic font-black ">
              {title}
            </h2>

            <span
              className={`notranslate material-symbols-outlined ${iconColor} translate-y-[5%] `}
            >
              {icon || "fitness_center"}
            </span>
          </div>
          {/* == BODY == */}
          <p
            className={`text-md text-zinc-500 font-light leading-relaxed mb-6 `}
          >
            {body}
          </p>
          {/* == LINKS == */}
          {links && links.length > 0 && (
            <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
              {links?.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="flex justify-between text-xs uppercase text-zinc-500 hover:text-primary-container transition-all transition-500 tracking-widest"
                >
                  {link.label}
                  <span className="notranslate material-symbols-outlined text-xl">
                    north_east
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  if (type === "side-image") {
    return (
      <div
        onClick={onClick}
        className={` group  transition-all duration-500 overflow-hidden cursor-pointer
          ${rounded || ""}
          ${bgStyles[bg] || ""} 
          ${border && !className.includes("border") ? borderStyles[border] : ""}
          ${className || ""}
        `}
      >
        {/* === DESKTOP LAYOUT  ===*/}
        {reverse ? (
          <div className="hidden md:flex  flex-row min-h-[300px]">
            {/* == IMAGE ==*/}
            <div className="flex-2 relative overflow-hidden">
              <img
                src={image}
                className="w-full h-full object-cover opacity-90"
                alt={title}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0A0A0A]/60" />
            </div>

            {/* == CONTENT == */}
            <div className="flex-1 relative ">
              <div
                className={`absolute inset-y-0 -left-11 w-18  ${bgStyles[bg] || "bg-[#131313]"}  -skew-x-[6deg] z-0 `}
              />
              {/* == CONTENT WRAPPER == */}
              <div className="relative flex flex-col h-full z-10 ps-6 p-12">
                {/* == TITLE == */}
                <div className="flex items-top justify-between gap-3 mb-6">
                  <h2 className="text-2xl text-white uppercase italic font-black  leading-[1.2] max-w-[200px]">
                    {title}
                  </h2>
                  <span
                    className={`notranslate material-symbols-outlined ${iconColor} translate-y-[5%] `}
                  >
                    {icon || "fitness_center"}
                  </span>
                </div>
                {/* == BODY == */}
                <p className="text-md text-zinc-500 mb-10 font-light leading-relaxed ">
                  {body}
                </p>
                {/* == LINKS == */}
                <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
                  {links?.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="flex justify-between text-xs uppercase text-zinc-500 hover:text-primary-container transition-all transition-500 tracking-widest"
                    >
                      {link.label}
                      <span className="material-symbols-outlined text-xl">
                        north_east
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex  flex-row min-h-[300px]">
            {/* == CONTENT == */}
            <div className="flex-1 flex flex-col p-12 pe-6">
              {/* == TITLE == */}
              <div className="flex items-top justify-between gap-3 mb-6">
                <h2 className="text-2xl text-white uppercase italic font-black  leading-[1.2] max-w-[200px]">
                  {title}
                </h2>
                <span
                  className={`notranslate material-symbols-outlined ${iconColor} translate-y-[5%] `}
                >
                  {icon || "fitness_center"}
                </span>
              </div>
              {/* == BODY == */}
              <p className="text-md text-zinc-500 mb-10 font-light leading-relaxed ">
                {body}
              </p>
              {/* == LINKS == */}
              <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
                {links?.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="flex justify-between text-xs  uppercase text-zinc-500 hover:text-primary-container transition-all transition-500 tracking-widest"
                  >
                    {link.label}
                    <span className="material-symbols-outlined text-xl">
                      north_east
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* == IMAGE ==*/}
            <div className="flex-2 relative overflow-hidden">
              <div
                className={`absolute inset-y-0 -left-11 w-18  ${bgStyles[bg] || "bg-[#131313]"}  -skew-x-[7deg] z-10 `}
              />
              <img
                src={image}
                className="w-full h-full object-cover opacity-90"
                alt={title}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0A0A0A]/60" />
            </div>
          </div>
        )}

        {/* ===MOBILE LAYOUT  === */}
        <div className="flex md:hidden flex-col">
          {/* == HEADER == */}
          <div className="py-8  px-6">
            {/* == TITLE == */}
            <div className="flex items-top justify-between gap-3 mb-6">
              <h2 className="text-2xl text-white uppercase italic font-black   leading-[1.2] max-w-[200px]">
                {title}
              </h2>
              <span
                className={`notranslate material-symbols-outlined ${iconColor} translate-y-[5%] `}
              >
                {icon || "fitness_center"}
              </span>
            </div>
            <p className="text-md text-zinc-500 font-light leading-relaxed ">
              {body}
            </p>
          </div>

          {/* == IMAGE ==*/}
          <div className="w-full h-64 border-y border-white/10">
            <img
              src={image}
              className="w-full h-full object-cover opacity-90"
              alt={title}
            />
          </div>

          {/* == LINKS == */}

          <div className="flex flex-col gap-3 py-8  px-6 ">
            {links?.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="flex justify-between text-xs text-zinc-500 hover:text-primary-container uppercase tracking-widest"
              >
                {link.label}
                <span className="material-symbols-outlined text-sm">
                  north_east
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        flex flex-col h-full p-8 cursor-pointer group
        transition-all duration-500 
        ${rounded || ""}
        ${bgStyles[bg] || ""} 
        ${borderStyles[border] || ""}
        ${className || ""}
      `}
    >
      {/* == ICON AND TAG == */}
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <span
            className={`notranslate material-symbols-outlined ${iconColor} `}
          >
            {icon}
          </span>
        )}
        {tag && (
          <span className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em]">
            {tag}
          </span>
        )}
      </div>

      {/* == TITLE == */}
      {title && (
        <h4
          className={`text-white text-lg font-black uppercase italic tracking-[0.1em]  mb-6 ${titleClassName} ${titleSize}`}
        >
          {title}
        </h4>
      )}

      {/* == IMAGE == */}
      {image && (
        <div
          className={`relative w-full h-64 md:h-72  overflow-hidden border border-white/10 bg-[#050505] mb-8 group/img shadow-2xl ${imageRounded}`}
        >
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#0070FF]/40 to-transparent z-10 pointer-events-none"></div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none"></div>
        </div>
      )}

      {/* == BODY == */}
      {body && (
        <p
          className={`text-zinc-500 text-md leading-relaxed font-light ${bodyClassName} ${bodySize}`}
        >
          {body}
        </p>
      )}

      {/* == CHILDREN == */}
      {children && <div className="mb-6">{children}</div>}

      {/* == LINKS == */}
      {links && links.length > 0 && (
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
          {links?.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="flex justify-between text-xs uppercase text-zinc-500 hover:text-primary-container transition-all transition-500 tracking-widest"
            >
              {link.label}
              <span className="notranslate material-symbols-outlined text-xl">
                north_east
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;

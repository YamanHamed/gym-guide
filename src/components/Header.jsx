const Header = ({
  plainTitle,
  highlightTitle,
  body,
  image,
  imageClassName,
  titleSize = "text-4xl",
  bodySize = "text-lg",
  reverse = false,
  className = "",
  titleClassName = "",
  bodyClassName = "",
  dir,
  pageHeader = false,
  subTitle = "Build your physique smartly",
}) => {
  // PAGE HEADER
  if (pageHeader) {
    return (
      <header
        dir={dir}
        className={`relative  min-h-[40vh] flex flex-col justify-center py-12 overflow-hidden ${className}`}
      >
        {/* == BG IMAGE WRAPPER == */}
        {image && (
          <div className="absolute hidden sm:block inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={image}
              className={`w-full h-full object-cover object-center transition-opacity duration-1000 opacity-60 mix-blend-lighten ${imageClassName}`}
              alt=""
            />

            {/* 1. The Main Deep Mask: This makes the left side (text area) solid black */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/90 to-transparent"></div>
            {/* 2. The Edge Softener: A very wide radial mask that hides the image edges */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 20%, #131313 100%)",
              }}
            ></div>

            {/* 3. The Bottom Fade: Critical for integrating with the page content below */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
          </div>
        )}

        {/* == HEADER CONTENT ==*/}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 relative z-10">
          <div className="w-full md:max-w-4xl">
            <h1
              className={`${titleSize} font-black italic tracking-tighter text-white uppercase leading-[0.82] ${titleClassName}`}
            >
              {reverse ? (
                <>
                  <span className="text-[#0070FF] ">{highlightTitle}</span>
                  <br className="hidden md:block" /> {plainTitle}
                </>
              ) : (
                <>
                  {plainTitle} <br className="hidden md:block" />
                  <span className="text-[#0070FF] ">{highlightTitle}</span>
                </>
              )}
            </h1>
          </div>

          {/* == SIDE SUB TITLE == */}
          <div className=" text-start border-l-2 md:border-r-2 md:border-l-0   border-[#0070FF] pl-4">
            {/* <p className="text-white text-md font-black italic tracking-tighter uppercase mb-2 leading-tight">
              {subTitle}
            </p> */}
            {body && (
              <p
                className={`text-zinc-500 text-xs  uppercase tracking-[0.2em] font-bold leading-relaxed ${bodyClassName}`}
              >
                {body}
              </p>
            )}
          </div>
        </div>
      </header>
    );
  }

  // SECTION HEADER MODE
  return (
    <div dir={dir} className={`text-start ${className}`}>
      <h2
        className={`${titleSize} ${titleClassName} font-black text-white italic tracking-tighter uppercase leading-none`}
      >
        {reverse ? (
          <>
            <span className="text-[#0070FF]">{highlightTitle}</span>{" "}
            {plainTitle}
          </>
        ) : (
          <>
            {plainTitle}{" "}
            <span className="text-[#0070FF]">{highlightTitle}</span>
          </>
        )}
      </h2>

      {body && (
        <p
          className={`text-zinc-400 ps-2 mt-6 max-w-xl font-light leading-relaxed ${bodyClassName} ${bodySize}`}
        >
          {body}
        </p>
      )}
    </div>
  );
};

export default Header;

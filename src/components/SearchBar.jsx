import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  fetchSearchResults,
  clearSearch,
} from "../store/slices/searchSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchBar = ({
  mobile = false,
  className,
  role = "user",
  onSearchEffect,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query, results, status, error } = useSelector(
    (state) => state.search,
  );
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef(null);

  // Immediate dispatch on every keystroke
  const handleChange = (e) => {
    const newQuery = e.target.value;
    dispatch(setQuery(newQuery));
    setShowResults(true);
    // Trigger search immediately (the thunk will cancel previous inflight request)
    if (newQuery.trim()) {
      dispatch(fetchSearchResults(newQuery));
    } else {
      dispatch(clearSearch());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
      setShowResults(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleResultClick = (item) => {
    setShowResults(false);
    dispatch(clearSearch());
    if (role === "admin") {
      if (item.type === "exercise") {
        navigate(
          `/dashboard/exercises/#exercise-${item.name.toLowerCase().replace(/\s+/g, "-")}`,
        );
      } else if (item.type === "split") {
        navigate(
          `/dashboard/splits/#split-${item.name.toLowerCase().replace(/\s+/g, "-")}`,
        );
      }
    } else {
      if (item.type === "exercise") {
        navigate(
          `/library/${item.muscle}#exercise-${item.name.toLowerCase().replace(/\s+/g, "-")}`,
        );
      } else if (item.type === "split") {
        navigate(`/splits/${item.name}`);
      }
    }
    onSearchEffect();
  };

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const desktopClasses =
    "hidden md:flex items-center bg-white/5 border border-white/5 rounded-full px-4 py-1.5 focus-within:border-[#0070FF]/50 transition-colors";
  const mobileClasses =
    "flex md:hidden items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3";

  return (
    <div ref={containerRef} className={`relative  ${className}`}>
      <form
        onSubmit={handleSubmit}
        className={mobile ? mobileClasses : desktopClasses}
      >
        <button
          type="submit"
          className="material-symbols-outlined text-zinc-500 text-sm cursor-pointer hover:text-white transition-colors"
        >
          search
        </button>
        <input
          type="text"
          placeholder={
            role === "user" ? t("nav.searchLabel") : "search what you think "
          }
          className={`bg-transparent border-none outline-none font-bold tracking-widest text-white placeholder-zinc-600 ml-2 ${
            mobile ? "text-xs w-full ml-3" : "text-[10px] w-32"
          }`}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </form>

      {/* Results dropdown */}
      {showResults &&
        (status === "loading" ||
          status === "succeeded" ||
          status === "failed") && (
          <div
            className={`absolute z-50 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl w-full max-h-80 overflow-y-auto ${
              mobile ? "left-0 right-0" : "right-0 left-auto w-80"
            }`}
          >
            {status === "loading" && (
              <div className="p-4 text-zinc-400 text-sm">Searching...</div>
            )}
            {status === "failed" && (
              <div className="p-4 text-red-400 text-sm">Error: {error}</div>
            )}
            {status === "succeeded" && (
              <>
                {results.length === 0 ? (
                  <div className="p-4 text-zinc-400 text-sm">
                    No results found.
                  </div>
                ) : (
                  results.map((item) => (
                    <button
                      key={`${item.type}-${item.id}`}
                      onClick={() => handleResultClick(item)}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            className="w-8 h-8 rounded object-cover"
                          />
                        )}
                        <div>
                          <div className="text-white font-semibold text-sm">
                            {item.name}
                          </div>
                          <div className="text-zinc-400 text-xs">
                            {item.type === "exercise"
                              ? `Exercise • ${item.muscle}`
                              : "Split"}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </>
            )}
          </div>
        )}
    </div>
  );
};

export default SearchBar;

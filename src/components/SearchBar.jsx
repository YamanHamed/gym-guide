import { useDispatch, useSelector } from "react-redux";
import { setSearch, submitSearch } from "../store/slices/searchSlice";

const SearchBar = ({ mobile = false }) => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state) => state.search);

  const handleSearchChange = (e) => {
    dispatch(setSearch({ searchValue: e.target.value }));
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    dispatch(submitSearch());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  // Mobile and Desktop share logic but have slightly different container styles
  const desktopClasses =
    "hidden md:flex items-center bg-white/5 border border-white/5 rounded-full px-4 py-1.5 focus-within:border-[#0070FF]/50 transition-colors";
  const mobileClasses =
    "flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3";

  return (
    <div className={mobile ? mobileClasses : desktopClasses}>
      <span
        onClick={handleSearchSubmit}
        className="material-symbols-outlined text-zinc-500 text-sm cursor-pointer hover:text-white transition-colors"
      >
        search
      </span>
      <input
        type="text"
        placeholder={mobile ? "SEARCH PROTOCOLS" : "SEARCH EXERCISES"}
        className={`bg-transparent border-none outline-none font-bold tracking-widest text-white placeholder-zinc-600 ml-2 ${
          mobile ? "text-xs w-full ml-3" : "text-[10px] w-32"
        }`}
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown} // enter key submits search
      />
    </div>
  );
};

export default SearchBar;

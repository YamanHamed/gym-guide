import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchValue = action.payload?.searchValue ?? "";
    },
    submitSearch: (state) => {
      alert("Searching for " + state.searchValue);
    },
  },
});

export const { setSearch, submitSearch } = searchSlice.actions;
export default searchSlice.reducer;

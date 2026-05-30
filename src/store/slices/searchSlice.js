import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// We'll store active abort controllers per request
let activeController = null;

export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (query, { rejectWithValue }) => {
    // Cancel previous request if it exists
    if (activeController) {
      activeController.abort();
    }
    // Create new controller for this request
    const controller = new AbortController();
    activeController = controller;

    if (!query || query.trim() === "") {
      return rejectWithValue("Search query is empty");
    }

    try {
      const response = await axios.get(`${API_BASE}/search`, {
        params: { q: query },
        signal: controller.signal,
      });
      return response.data; // { results, query }
    } catch (err) {
      if (axios.isCancel(err)) {
        // Do nothing – this is expected when a new request cancels an older one
        return rejectWithValue("cancelled");
      }
      const message =
        err.response?.data?.error || err.message || "Search failed";
      return rejectWithValue(message);
    }
  },
);

const initialState = {
  query: "", // current search term (always up to date)
  results: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      // Immediately clear old results and mark as idle/loading? We'll let the thunk handle.
      if (!action.payload.trim()) {
        state.results = [];
        state.status = "idle";
        state.error = null;
      } else {
        // We will dispatch fetchSearchResults from the component, so we don't change status here.
        // But we want to show loading indicator as soon as we start searching.
        // Actually the thunk will set loading state when pending.
      }
    },
    clearSearch: (state) => {
      state.query = "";
      state.results = [];
      state.status = "idle";
      state.error = null;
      if (activeController) {
        activeController.abort();
        activeController = null;
      }
    },
    resetSearchState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        // Only update if the query matches the current one (optional safety)
        if (state.query === action.payload.query) {
          state.status = "succeeded";
          state.results = action.payload.results;
        }
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        if (action.payload === "cancelled") {
          // Do nothing – the request was cancelled, keep previous state
          return;
        }
        state.status = "failed";
        state.error = action.payload;
        state.results = [];
      });
  },
});

export const { setQuery, clearSearch, resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;

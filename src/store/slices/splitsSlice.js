import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token");

// ---------- Fetch all splits (public) ----------
export const fetchSplits = createAsyncThunk(
  "splits/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/splits`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch splits",
      );
    }
  },
);

// ---------- Fetch a single split by ID (public) ----------
export const fetchSplitById = createAsyncThunk(
  "splits/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/splits/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch split",
      );
    }
  },
);

// ---------- Create a new split (admin only) ----------
export const createSplit = createAsyncThunk(
  "splits/create",
  async (splitData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/splits`, splitData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Create failed",
      );
    }
  },
);

// ---------- Update a split (admin only) ----------
export const updateSplit = createAsyncThunk(
  "splits/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/splits/${id}`, updates, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Update failed",
      );
    }
  },
);

// ---------- Delete a split (admin only) ----------
export const deleteSplit = createAsyncThunk(
  "splits/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/splits/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return id; // return deleted id to remove from state
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Delete failed",
      );
    }
  },
);

// ---------- Slice ----------
const splitsSlice = createSlice({
  name: "splits",
  initialState: {
    list: [], // all splits for browse
    currentSplit: null, // single split for detail/edit
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCurrentSplit: (state) => {
      state.currentSplit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== Fetch all ==========
      .addCase(fetchSplits.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSplits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchSplits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ========== Fetch single ==========
      .addCase(fetchSplitById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSplitById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentSplit = action.payload;
      })
      .addCase(fetchSplitById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ========== Create ==========
      .addCase(createSplit.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createSplit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createSplit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ========== Update ==========
      .addCase(updateSplit.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateSplit.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.list.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        if (state.currentSplit?._id === action.payload._id)
          state.currentSplit = action.payload;
      })
      .addCase(updateSplit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ========== Delete ==========
      .addCase(deleteSplit.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteSplit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((s) => s._id !== action.payload);
        if (state.currentSplit?._id === action.payload)
          state.currentSplit = null;
      })
      .addCase(deleteSplit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentSplit } = splitsSlice.actions;
export default splitsSlice.reducer;

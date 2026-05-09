import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token");

// ---------- Fetch all tips (public) ----------
export const fetchTips = createAsyncThunk(
  "tips/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/tips`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch tips",
      );
    }
  },
);

// ---------- Fetch a single tip (public) ----------
export const fetchTipById = createAsyncThunk(
  "tips/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/tips/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch tip",
      );
    }
  },
);

// ---------- Create a new tip (admin only) ----------
export const createTip = createAsyncThunk(
  "tips/create",
  async (tipData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/tips`, tipData, {
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

// ---------- Update a tip (admin only) ----------
export const updateTip = createAsyncThunk(
  "tips/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/tips/${id}`, updates, {
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

// ---------- Delete a tip (admin only) ----------
export const deleteTip = createAsyncThunk(
  "tips/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/tips/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Delete failed",
      );
    }
  },
);

// ---------- Slice ----------
const tipsSlice = createSlice({
  name: "tips",
  initialState: {
    list: [],
    currentTip: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCurrentTip: (state) => {
      state.currentTip = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchTips.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTips.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch single
      .addCase(fetchTipById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTipById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentTip = action.payload;
      })
      .addCase(fetchTipById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create
      .addCase(createTip.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTip.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createTip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update
      .addCase(updateTip.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateTip.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.list.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        if (state.currentTip?._id === action.payload._id)
          state.currentTip = action.payload;
      })
      .addCase(updateTip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteTip.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTip.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((t) => t._id !== action.payload);
        if (state.currentTip?._id === action.payload) state.currentTip = null;
      })
      .addCase(deleteTip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTip } = tipsSlice.actions;
export default tipsSlice.reducer;

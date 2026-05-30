import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes (set to Infinity to never re‑fetch)

const getToken = () => localStorage.getItem("token");

// ---------- Fetch all exercises (public) ----------
export const fetchExercises = createAsyncThunk(
  "exercises/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/exercises`);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch exercises";
      return rejectWithValue(message);
    }
  },
);

// ---------- Fetch exercises by muscle (public) ----------
export const fetchExercisesByMuscle = createAsyncThunk(
  "exercises/fetchByMuscle",
  async (muscle, { getState, rejectWithValue }) => {
    const { muscleCache } = getState().exercises;
    const cached = muscleCache[muscle];

    // If cached and fresh, return cached data directly (no API call)
    if (cached && cached.data && Date.now() - cached.lastFetched < CACHE_TTL) {
      return { muscle, data: cached.data, fromCache: true };
    }

    // Otherwise fetch from API
    try {
      const response = await axios.get(`${API_BASE}/exercises/${muscle}`);
      return { muscle, data: response.data, fromCache: false };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch";
      return rejectWithValue({ muscle, message });
    }
  },
);

// ---------- Create a new exercise (admin only) ----------
export const createExercise = createAsyncThunk(
  "exercises/create",
  async (exerciseData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/exercises`, exerciseData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Create failed";
      return rejectWithValue(message);
    }
  },
);

// ---------- Update an exercise (admin only) ----------
export const updateExercise = createAsyncThunk(
  "exercises/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/exercises/${id}`, updates, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Update failed";
      return rejectWithValue(message);
    }
  },
);

// ---------- Delete an exercise (admin only) ----------
export const deleteExercise = createAsyncThunk(
  "exercises/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/exercises/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return id;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Delete failed";
      return rejectWithValue(message);
    }
  },
);

// ---------- Slice ----------
const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    list: [],
    filteredList: [],
    status: "idle", // for fetchAll, create, update, delete
    error: null,
    filteredStatus: "idle", // for fetchByMuscle
    filteredError: null,
    muscleCache: {}, // { chest: { data, status, error, lastFetched } }
  },
  reducers: {
    clearFilteredList: (state) => {
      state.filteredList = [];
      state.filteredStatus = "idle";
      state.filteredError = null;
    },
    clearCache: (state, action) => {
      const muscle = action.payload;
      if (muscle) delete state.muscleCache[muscle];
      else state.muscleCache = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== Fetch all ==========
      .addCase(fetchExercises.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ========== Fetch by muscle ==========
      .addCase(fetchExercisesByMuscle.pending, (state, action) => {
        const muscle = action.meta.arg;
        state.muscleCache[muscle] = {
          ...state.muscleCache[muscle],
          status: "loading",
          error: null,
        };
      })
      .addCase(fetchExercisesByMuscle.fulfilled, (state, action) => {
        const { muscle, data, fromCache } = action.payload;
        state.muscleCache[muscle] = {
          data,
          status: "succeeded",
          error: null,
          lastFetched: fromCache
            ? state.muscleCache[muscle]?.lastFetched
            : Date.now(),
        };
      })
      .addCase(fetchExercisesByMuscle.rejected, (state, action) => {
        const { muscle, message } = action.payload;
        state.muscleCache[muscle] = {
          ...state.muscleCache[muscle],
          status: "failed",
          error: message,
        };
      })

      // ========== Create ==========
      .addCase(createExercise.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createExercise.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ========== Update ==========
      .addCase(updateExercise.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.list.findIndex(
          (ex) => ex._id === action.payload._id,
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateExercise.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ========== Delete ==========
      .addCase(deleteExercise.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((ex) => ex._id !== action.payload);
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearFilteredList } = exercisesSlice.actions;
export default exercisesSlice.reducer;

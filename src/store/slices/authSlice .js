import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ---------- Login thunk ----------
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        username,
        password,
      });
      const { token, userId, username: userName, role } = response.data;
      // Store token in localStorage for API interceptor / getToken()
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ userId, username: userName, role }),
      );
      return { token, userId, username: userName, role };
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || "Login failed";
      return rejectWithValue(message);
    }
  },
);

// ---------- Check if token exists on app load (optional) ----------
const loadUserFromStorage = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    return { token, user: JSON.parse(user), isAuthenticated: true };
  }
  return { token: null, user: null, isAuthenticated: false };
};

// ---------- Check if token is valid  ----------
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const response = await axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Not authenticated");
    }
  },
);

const initialState = {
  token: loadUserFromStorage().token,
  user: loadUserFromStorage().user,
  isAuthenticated: loadUserFromStorage().isAuthenticated,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = {
          userId: action.payload.userId,
          username: action.payload.username,
          role: action.payload.role,
        };
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

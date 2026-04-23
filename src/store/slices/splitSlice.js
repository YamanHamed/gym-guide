// src/store/slices/splitSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSplitId: 'ppl-01',
  completedWorkouts: [],
  filters: {
    difficulty: 'all',
    equipment: 'all'
  }
};

const splitSlice = createSlice({
  name: 'splits',
  initialState,
  reducers: {
    // These are your "Actions"
    setActiveSplit: (state, action) => {
      state.activeSplitId = action.payload;
    },
    setDifficultyFilter: (state, action) => {
      state.filters.difficulty = action.payload;
    },
    toggleWorkoutComplete: (state, action) => {
      const id = action.payload;
      if (state.completedWorkouts.includes(id)) {
        state.completedWorkouts = state.completedWorkouts.filter(i => i !== id);
      } else {
        state.completedWorkouts.push(id); // Perfectly safe in RTK!
      }
    }
  }
});

export const { setActiveSplit, setDifficultyFilter, toggleWorkoutComplete } = splitSlice.actions;
export default splitSlice.reducer;
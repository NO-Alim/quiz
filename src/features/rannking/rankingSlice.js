import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  point: 0,
  moduleId: [],
};

const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    setPoint: (state, action) => {
      state.point = state.point + action.payload.point;
      state.moduleId = [...state.moduleId, action.payload.moduleId];
    },
  },
});

export default rankingSlice.reducer;
export const { setPoint } = rankingSlice.actions;

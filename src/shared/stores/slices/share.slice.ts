import { createSlice } from '@reduxjs/toolkit';

export interface ShareState {
  isLoading?: boolean;
  currentUser?: any;
}

const initialState: ShareState = {
  isLoading: false,
  currentUser: null,
};

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    setUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const shareReducer = shareSlice.reducer;
export const shareActions = {
  ...shareSlice.actions,
};

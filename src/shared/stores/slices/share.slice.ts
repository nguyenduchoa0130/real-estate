import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/interfaces/user.interface';

export interface ShareState {
  isLoading?: boolean;
  currentUser?: User;
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
  },
});

export const shareReducer = shareSlice.reducer;
export const shareActions = shareSlice.actions;

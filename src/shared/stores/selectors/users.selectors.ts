import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@rootStore';

const selectUsers = (rootState: RootState) => rootState.users;

export const usersSelectors = {
  selectListStaffs: createSelector(selectUsers, (state) => state.listStaffs),
};

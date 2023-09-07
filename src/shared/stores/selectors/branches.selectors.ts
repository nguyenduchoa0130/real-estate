import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@rootStore';

const selectBranches = (state: RootState) => state.branches;

export const branchesSelectors = {
  selectListBranches: createSelector(selectBranches, (state) => state.listBranches),
};

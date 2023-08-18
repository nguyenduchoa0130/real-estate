import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/root-store';

const selectShareFeature = (rootState: RootState) => rootState.share;

export const shareSelectors = {
  selectIsLoading: createSelector(selectShareFeature, (state) => state.isLoading),
  selectCurrentUser: createSelector(selectShareFeature, (state) => state.currentUser),
};

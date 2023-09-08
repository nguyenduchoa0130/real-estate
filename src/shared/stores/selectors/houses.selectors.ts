import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@rootStore';

const selectHouses = (rootState: RootState) => rootState.houses;

export const housesSelectors = {
  selectHouseTypes: createSelector(selectHouses, (state) => state.houseTypes),
  selectListHouses: createSelector(selectHouses, (state) => state.listHouses),
};

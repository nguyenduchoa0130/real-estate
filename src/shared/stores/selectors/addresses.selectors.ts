import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@rootStore';

const selectAddressesFeature = (state: RootState) => state.addresses;

export const addressesSelectors = {
  selectDistricts: createSelector(selectAddressesFeature, (state) => state.districts),
  selectWards: createSelector(selectAddressesFeature, (state) => state.wards),
};

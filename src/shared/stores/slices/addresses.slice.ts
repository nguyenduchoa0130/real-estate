import { District, Ward } from '@interfaces/addresses.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AddressService from '@services/address.service';
import AlertUtil from '@utils/alert.util';
import { shareActions } from './share.slice';

export interface AddressesState {
  districts: District[];
  wards: Ward[];
}

const initialState: AddressesState = {
  districts: [],
  wards: [],
};

const getAllDistricts = createAsyncThunk('addresses/getAllDistricts', async (_, { dispatch }) => {
  try {
    dispatch(shareActions.showLoading());
    const districts = await AddressService.getAllDistricts();
    return districts;
  } catch (error) {
    AlertUtil.showError(error?.response?.data?.message || error.message);
    return Promise.reject();
  } finally {
    dispatch(shareActions.hideLoading());
  }
});

const createNewDistrict = createAsyncThunk(
  'addresses/createNewDistrict',
  async (payload: Omit<District, 'id'>, { dispatch }) => {
    try {
      dispatch(shareActions.showLoading());
      const district = await AddressService.createNewDistrict(payload);
      return district;
    } catch (error) {
      AlertUtil.showError(error?.response?.data?.message || error.message);
      return Promise.reject();
    } finally {
      dispatch(shareActions.hideLoading());
    }
  },
);

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDistricts.fulfilled, (state, action) => {
        state.districts = action.payload;
      })
      .addCase(createNewDistrict.fulfilled, (state, action) => {
        state.districts = [action.payload, ...state.districts];
      });
  },
});

export const addressesReducer = addressesSlice.reducer;
export const addressesActions = {
  ...addressesSlice.actions,
  getAllDistricts,
  createNewDistrict,
};

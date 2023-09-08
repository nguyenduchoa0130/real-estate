import { Landlord } from '@interfaces/landlord.interface';
import { Staff } from '@interfaces/staff.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LandLordService from '@services/landlord.service';
import StaffService from '@services/staff.service';
import AlertUtil from '@utils/alert.util';
import { shareActions } from './share.slice';

interface UsersState {
  listStaffs?: Staff[];
  listLandlords?: Landlord[];
}

const initialState: UsersState = {
  listStaffs: [],
  listLandlords: [],
};

const createNewStaff = createAsyncThunk(
  'staff/createNewStaff',
  async (payload: Staff, { dispatch }) => {
    try {
      dispatch(shareActions.showLoading());
      const staff = await StaffService.createNewStaff(payload);
      return staff;
    } catch (error) {
      throw error;
    } finally {
      dispatch(shareActions.hideLoading());
    }
  },
);

const getAllStaffs = createAsyncThunk('staff/getAllStaffs', async (_, { dispatch }) => {
  try {
    dispatch(shareActions.showLoading());
    const staffs = await StaffService.getAllStaffs();
    return staffs;
  } catch (error) {
    AlertUtil.showError(error?.response?.data?.message || error.message);
    return Promise.reject();
  } finally {
    dispatch(shareActions.hideLoading());
  }
});

const createNewLandlord = createAsyncThunk(
  'staff/createNewLandlord',
  async (payload: Landlord, { dispatch }) => {
    try {
      dispatch(shareActions.showLoading());
      const landlord = await LandLordService.createNewLandlord(payload);
      return landlord;
    } catch (error) {
      AlertUtil.showError(error?.response?.data?.message || error.message);
      return Promise.reject();
    } finally {
      dispatch(shareActions.hideLoading());
    }
  },
);

const getAllLandlords = createAsyncThunk('staff/getAllLandlords', async (_, { dispatch }) => {
  try {
    dispatch(shareActions.showLoading());
    const staffs = await LandLordService.getAllLandlords();
    return staffs;
  } catch (error) {
    AlertUtil.showError(error?.response?.data?.message || error.message);
    return Promise.reject();
  } finally {
    dispatch(shareActions.hideLoading());
  }
});

const usersSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewStaff.fulfilled, (state, { payload }) => {
        state.listStaffs.push(payload);
      })
      .addCase(getAllStaffs.fulfilled, (state, { payload }) => {
        state.listStaffs = payload;
      })
      .addCase(createNewLandlord.fulfilled, (state, { payload }) => {
        state.listLandlords.push(payload);
      })
      .addCase(getAllLandlords.fulfilled, (state, { payload }) => {
        state.listLandlords = payload;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = {
  ...usersSlice.actions,
  createNewStaff,
  getAllStaffs,
  createNewLandlord,
  getAllLandlords,
};

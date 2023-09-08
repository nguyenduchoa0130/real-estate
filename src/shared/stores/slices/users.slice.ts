import { Staff } from '@interfaces/staff.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StaffService from '@services/staff.service';
import { shareActions } from './share.slice';

interface UsersState {
  listStaffs?: Staff[];
}

const initialState: UsersState = {
  listStaffs: [],
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
    throw error;
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
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = {
  ...usersSlice.actions,
  createNewStaff,
  getAllStaffs,
};

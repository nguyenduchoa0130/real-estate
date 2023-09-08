import { Branch } from '@interfaces/branch.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BranchesService from '@services/branches.service';
import { shareActions } from './share.slice';
import AlertUtil from '@utils/alert.util';

interface BranchesState {
  listBranches?: Branch[];
}

const initialState: BranchesState = {
  listBranches: [],
};

const createNewBranch = createAsyncThunk(
  'branches/createNewBranch',
  async (payload: Partial<Branch>, { dispatch }) => {
    try {
      dispatch(shareActions.showLoading());
      const branch = await BranchesService.createNewBranch(payload);
      return branch;
    } catch (error) {
      AlertUtil.showError(error?.response?.data?.message || error.message);
      return Promise.reject();
    } finally {
      dispatch(shareActions.hideLoading());
    }
  },
);

const getAllBranches = createAsyncThunk('branches/getAllBranches', async (_, { dispatch }) => {
  try {
    dispatch(shareActions.showLoading());
    const branches = await BranchesService.getAllBranches();
    return branches;
  } catch (error) {
    AlertUtil.showError(error?.response?.data?.message || error.message);
    return Promise.reject();
  } finally {
    dispatch(shareActions.hideLoading());
  }
});

const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewBranch.fulfilled, (state, { payload }) => {
        state.listBranches = [...state.listBranches, payload];
      })
      .addCase(getAllBranches.fulfilled, (state, { payload }) => {
        state.listBranches = payload;
      });
  },
});

export const branchesReducer = branchesSlice.reducer;
export const branchesActions = {
  ...branchesSlice.actions,
  createNewBranch,
  getAllBranches,
};

import { HouseType } from '@interfaces/house-type.interface';
import { House } from '@interfaces/house.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HousesService from '@services/houses.service';
import AlertUtil from '@utils/alert.util';
import { shareActions } from './share.slice';

interface HousesState {
  houseTypes?: HouseType[];
  listHouses?: House[];
}

const initialState: HousesState = {
  houseTypes: [],
  listHouses: [],
};

const getAllHouseTypes = createAsyncThunk('houses/getAllHouseTypes', async (_, { dispatch }) => {
  try {
    dispatch(shareActions.showLoading());
    const houseTypes = await HousesService.getAllHouseTypes();
    return houseTypes;
  } catch (error) {
    AlertUtil.showError(error?.response?.data?.message || error.message);
    return Promise.reject();
  } finally {
    dispatch(shareActions.hideLoading());
  }
});

const createNewHouse = createAsyncThunk(
  'houses/createNewHouse',
  async (payload: House, { dispatch }) => {
    try {
      dispatch(shareActions.showLoading());
      const house = await HousesService.createNewHouse(payload);
      return house;
    } catch (error) {
      AlertUtil.showError(error?.response?.data?.message || error.message);
      return Promise.reject();
    } finally {
      dispatch(shareActions.hideLoading());
    }
  },
);

const getListHousesByLandlordId = createAsyncThunk(
  'houses/getListHousesByLandlordId',
  async (landlordId: number, { dispatch }) => {
    try {
      dispatch(shareActions.showLoading());
      const listHouses = await HousesService.getAllHousesByLandlordId(landlordId);
      return listHouses;
    } catch (error) {
      AlertUtil.showError(error?.response?.data?.message || error.message);
      return Promise.reject();
    } finally {
      dispatch(shareActions.hideLoading());
    }
  },
);

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHouseTypes.fulfilled, (state, action) => {
        state.houseTypes = action.payload;
      })
      .addCase(getListHousesByLandlordId.fulfilled, (state, action) => {
        state.listHouses = action.payload;
      });
  },
});

export const housesReducer = housesSlice.reducer;
export const housesActions = {
  ...housesSlice.actions,
  getAllHouseTypes,
  createNewHouse,
  getListHousesByLandlordId,
};

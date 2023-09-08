import { LoginPayload, User } from '@interfaces/user.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserService from '@services/user.service';
import { shareActions } from './share.slice';
import AlertUtil from '@utils/alert.util';

interface AuthState {}

const initialState: AuthState = {};

const register = createAsyncThunk('share/register', async (payload: User, { dispatch }) => {
  try {
    dispatch(shareActions.showLoading());
    const user = await UserService.register(payload);
    dispatch(shareActions.setUser(user));
    return user;
  } catch (error) {
    AlertUtil.showError(error?.response?.data?.message || error.message);
    return Promise.reject();
  } finally {
    dispatch(shareActions.hideLoading());
  }
});

const login = createAsyncThunk('share/login', async (payload: LoginPayload, { dispatch }) => {
  try {
    dispatch(shareActions.showLoading());
    const user = await UserService.login(payload);
    dispatch(shareActions.setUser(user));
    return user;
  } catch (error) {
    AlertUtil.showError(error?.response?.data?.message || error.message);
    return Promise.reject();
  } finally {
    dispatch(shareActions.hideLoading());
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
export const authActions = {
  ...authSlice.actions,
  register,
  login,
};

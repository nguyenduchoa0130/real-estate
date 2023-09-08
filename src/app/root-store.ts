import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@slices/auth.slice';
import { branchesReducer } from '@slices/branches.slice';
import { usersReducer } from '@slices/users.slice';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { shareReducer } from './../shared/stores/slices/share.slice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  share: shareReducer,
  branches: branchesReducer,
  users: usersReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

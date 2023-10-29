import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserDataSliceType } from '../../types/types';
import { RootState } from '../store';

const initialState: UserDataSliceType = {
  password: '',
  userEmail: '',
  isLoggedIn: false,
};

const userDataSlice = createSlice({
  initialState,
  name: 'userData',
  reducers: {
    addNewUser: (
      _,
      action: PayloadAction<{
        userEmail: string;
        password: string;
      }>
    ) => {
      const userEmail = action.payload.userEmail;
      const password = action.payload.password;
      const newState = {
        userEmail,
        password,
        isLoggedIn: false,
      };
      return newState;
    },
    initializeUserData: (
      _,
      action: PayloadAction<{ userData: UserDataSliceType }>
    ) => {
      const newState = action.payload.userData;
      return newState;
    },
    logoutUser: (state) => {
      const newState = {
        ...state,
        isLoggedIn: false,
      };
      return newState;
    },
    loginUser: (state) => {
      const newState = {
        ...state,
        isLoggedIn: true,
      };
      return newState;
    },

    resetUserData: () => {
      const newState = initialState;
      return newState;
    },
  },
});

export const {
  addNewUser,
  loginUser,
  logoutUser,
  initializeUserData,
  resetUserData,
} = userDataSlice.actions;

export const promoDetails = (state: RootState) => state.userDataSlice;

export default userDataSlice.reducer;

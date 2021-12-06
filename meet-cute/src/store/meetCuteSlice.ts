import { createSlice } from '@reduxjs/toolkit';
import IUserData from '../models/IUserData';

export const meetCuteSlice = createSlice({
  name: 'meetCute',
  initialState: {
    isLoggedIn: false,
    loginKey: '',
    userData: {} as IUserData,
    userMatches: Array<IUserData>(),
    userSearches: Array<IUserData>(),
    userCurrentConversation: {},
    userCurrentConvPartnerToken: '',
    currentProfilePageInfo: {} as IUserData,
    currentProfileIsThisUser: false,
  },
  reducers: {
    login: (state, action) => {},

    logout: (state, action) => {},

    fetcheMatches: (state, action) => {},

    fetchSearches: (state, action) => {},

    fetchUserData: (state, action) => {},

    // check if user profile i
    fetchProfilePage: (state, action) => {},


  },
});

export const {} = meetCuteSlice.actions;

export default meetCuteSlice.reducer;

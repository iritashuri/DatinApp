import { createSlice } from "@reduxjs/toolkit";
import IUserData from "../models/IUserData";

export const meetCuteSlice = createSlice({
  name: "meetCute",
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
  reducers: {},
});

export const {} = meetCuteSlice.actions;

export default meetCuteSlice.reducer;

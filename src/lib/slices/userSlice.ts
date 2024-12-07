import { IUserInfoData } from "@/interfaces/auth/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInfoState {
  user: IUserInfoData | null;
}

const initialState: UserInfoState = {
  user: {
    email: "",
    expertise: [],
    fname: "",
    id: "",
    lname: "",
    phone: "",
    role: "",
    profilepics: "",
  },
};

export const userInfoSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUserInfoData>) => {
      state.user = action.payload;
    },
    resetUserInfo: (state) => {
      state.user = null;
    },
    updateProfilePics: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profilepics = action.payload;
      }
    },
  },
});

export const { setUserInfo, resetUserInfo, updateProfilePics } = userInfoSlice.actions;

export default userInfoSlice.reducer;

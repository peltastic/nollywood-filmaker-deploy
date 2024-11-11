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
  },
});

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface INotificationState {
  newNotification: boolean;
}

const initialState: INotificationState = {
  newNotification: false,
};
export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setNotificationState: (state, action: PayloadAction<boolean>) => {
        state.newNotification = action.payload
    },
  },
});

export const {setNotificationState} = notificationSlice.actions


export default notificationSlice.reducer
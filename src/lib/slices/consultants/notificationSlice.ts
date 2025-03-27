import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface INotificationState {
  newNotification: boolean;
}

const initialState: INotificationState = {
  newNotification: false,
};
export const consultantNotificationSlice = createSlice({
  name: "consultantNotificationSlice",
  initialState,
  reducers: {
    setConsultantNotificationState: (state, action: PayloadAction<boolean>) => {
        state.newNotification = action.payload
    },
  },
});

export const {setConsultantNotificationState} = consultantNotificationSlice.actions


export default consultantNotificationSlice.reducer
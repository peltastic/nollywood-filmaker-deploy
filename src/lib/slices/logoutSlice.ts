import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ILogoutState  {
    logoutType: "expired" | "triggered"
} 

const initialState: ILogoutState = {
    logoutType: "triggered"
}

export const logoutSlice = createSlice({
    name: "logoutSlice",
    initialState,
    reducers: {
        setLogoutType: (state, action: PayloadAction<"expired" | "triggered">) => {
            state.logoutType = action.payload
        }
    }
})


export const {setLogoutType} = logoutSlice.actions

export default logoutSlice.reducer


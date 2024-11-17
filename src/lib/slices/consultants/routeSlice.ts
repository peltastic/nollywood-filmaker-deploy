import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IRouteState {
    consultantFallbackRoute: string | null
}


const initialState: IRouteState = {
    consultantFallbackRoute: ""
}

export const consultantRouteSlice = createSlice({
    name: "consultantRouteSlice",
    initialState,
    reducers: {
        setConsultantFallbackRoute: (state, action: PayloadAction<string | null>) => {
            state.consultantFallbackRoute = action.payload
        }
    }
})

export const {setConsultantFallbackRoute} = consultantRouteSlice.actions

export default consultantRouteSlice.reducer
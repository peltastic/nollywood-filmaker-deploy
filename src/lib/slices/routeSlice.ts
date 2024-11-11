import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IRouteState  {
    fallbackRoute: string | null
} 

const initialState: IRouteState = {
    fallbackRoute: ""
}

export const routeSlice = createSlice({
    name: "routeSlice",
    initialState,
    reducers: {
        setFallbackRoute: (state, action: PayloadAction<string | null>) => {
            state.fallbackRoute = action.payload
        }
    }
})


export const {setFallbackRoute} = routeSlice.actions

export default routeSlice.reducer


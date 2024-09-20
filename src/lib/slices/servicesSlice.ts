import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ServicesState {
  service: string;
}

const initialState: ServicesState = {
  service: "",
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    updateService: (state, action: PayloadAction<string>) => {
      state.service = action.payload;
    },
  },
});

export const { updateService } = servicesSlice.actions;

export default servicesSlice.reducer;

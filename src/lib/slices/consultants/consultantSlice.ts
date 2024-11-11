import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IConsultantInfo {
  id: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  role: "consultant";
  expertise: string[];
}

export interface IConsultantInfoState {
  user: IConsultantInfo | null;
}

const initialState: IConsultantInfoState = {
  user: {
    email: "",
    expertise: [],
    fname: "",
    id: "",
    lname: "",
    phone: "",
    role: "consultant",
  },
};


export const consultantInfoSlice = createSlice({
    name: "consultantSlice",
    initialState,
    reducers: {
        setConsultantInfo: (state, action: PayloadAction<IConsultantInfo>) => {
            state.user = action.payload
        }
    }
})



export const {setConsultantInfo} = consultantInfoSlice.actions

export default consultantInfoSlice.reducer
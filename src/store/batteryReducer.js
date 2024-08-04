import { createSlice } from "@reduxjs/toolkit";

const batterySlice = createSlice({
    name: "battery",
    initialState: {
        value: 0,
        isProfile: false,
    },
    reducers: {
        setBatteryLevel: (state, action) => {
        state.value = action.payload;
        },
        setProfile: (state, action) => {
            state.isProfile = action.payload;
        },
    },
    });

    export const { setBatteryLevel, setProfile } = batterySlice.actions;

export default batterySlice.reducer;
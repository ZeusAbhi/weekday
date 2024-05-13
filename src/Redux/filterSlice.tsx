import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        globalFilterData: [] as Array<{ [key: string]: string [] }>,
    },
    reducers: {
        setGlobalFilterData: (state, action) => {
            const { placeholder, filterData } = action.payload;
            const existingIndex = state.globalFilterData.findIndex(item => item.placeholder === placeholder);
            if (existingIndex !== -1) {
                // If placeholder already exists, update its filter data
                state.globalFilterData[existingIndex].filterData = filterData;
            } else {
                // If placeholder doesn't exist, add a new entry
                state.globalFilterData.push({ placeholder, filterData });
            }
        },
    },
});

export const { setGlobalFilterData } = filterSlice.actions;

export const selectGlobalFilterData = (state: any) => state.filter.globalFilterData;

export default filterSlice.reducer;

import { Location } from 'history';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IHistoryState {
    locations: Location[];
}

const INITIAL_STATE: IHistoryState = {
    locations: []
}

export const historySlice = createSlice({
    name: 'historySlice',
    initialState: INITIAL_STATE,
    reducers: {
        pushLocation(state, { payload }: PayloadAction<Location>) {
            state.locations.push(payload);
        },
        replaceLocation(state, { payload }: PayloadAction<Location>) {
            state.locations.splice(state.locations.length - 1, 1, payload);
        },
        popLocation(state) {
            state.locations.pop();
        }
    }
});

export const historySliceName = historySlice.name;
export const historyReducer = historySlice.reducer;
export const historyActions = historySlice.actions;
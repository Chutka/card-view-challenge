import { historySliceName } from "../slices/history";
import { TRootState } from "../store";

export const rootHistorySelector = (state: TRootState) => state[historySliceName];

export const historyLocationsSelector = (state: TRootState) => rootHistorySelector(state).locations;

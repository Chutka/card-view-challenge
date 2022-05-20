import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsReducer, cardsSliceName } from "./slices/cards";
import { transactionsReducer, transactionsSliceName } from "./slices/transactions";

export const store = configureStore({
    reducer: combineReducers({
        [cardsSliceName]: cardsReducer,
        [transactionsSliceName]: transactionsReducer
    }),
});

export type TRootState = ReturnType<typeof store.getState>
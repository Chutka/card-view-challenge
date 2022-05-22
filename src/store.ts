import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsReducer, cardsSliceName } from "./slices/cards";
import { historySliceName, historyReducer } from "./slices/history";
import { transactionsReducer, transactionsSliceName } from "./slices/transactions";

const reducer = combineReducers({
    [historySliceName]: historyReducer,
    [cardsSliceName]: cardsReducer,
    [transactionsSliceName]: transactionsReducer
})

export const store = configureStore({
    reducer,
    devTools: true,
    middleware: function(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
});

export const dispatch = store.dispatch;

export type TRootState = ReturnType<typeof store.getState>
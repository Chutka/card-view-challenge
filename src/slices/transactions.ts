import { createSlice } from "@reduxjs/toolkit";
import { TRANSACTIONS_MOCK } from "../mockData/generator";
import { ITransaction } from "../types/transaction";

interface ITransactionsState {
  transactions: ITransaction[];
}

export const TRANSACTIONS_INITIAL_STATE: ITransactionsState = {
  transactions: TRANSACTIONS_MOCK,
};

export const transactionsSlice = createSlice({
  name: "transactionsSlice",
  initialState: TRANSACTIONS_INITIAL_STATE,
  reducers: {},
});

export const transactionsSliceName = transactionsSlice.name;
export const transactionsActions = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;

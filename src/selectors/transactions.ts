import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash";
import { transactionsSliceName } from "../slices/transactions";
import { TRootState } from "../store";
import { ITransactionsFilter } from "../types/transactionsFilters";

export const rootTransactionsSelector = (state: TRootState) =>
  state[transactionsSliceName];

export const transactionsSelector = (state: TRootState) =>
  rootTransactionsSelector(state).transactions;

export const transactionsByCountAndOffsetSelector = createSelector(
  transactionsSelector,
  (_: unknown, filters: ITransactionsFilter) => filters,
  (transactions, filters) => transactions.filter(transaction => {
    if (filters.cardID !== '' && transaction.cardID !== filters.cardID) {
      return false;
    }
    if (filters.currency !== '' && transaction.currency !== filters.currency) {
        return false;
    }
    if (filters.startDate !== null && transaction.transactionDate.getTime() < filters.startDate.getTime()) {
        return false;
    }
    if (filters.endDate !== null && transaction.transactionDate.getTime() > filters.endDate.getTime()) {
      return false;
    }
    if (filters.amount !== '' && !transaction.amount.toString().includes(filters.amount)) {
      return false;
    }
    if (filters.cardAccount !== '' && !transaction.cardAccount.includes(filters.cardAccount)) {
        return false;
    }
    return true;
  })
);

export const makeTransactionsByFiltersSelector =
  (filters: ITransactionsFilter) => (state: TRootState) =>
    transactionsByCountAndOffsetSelector(state, filters);

export const transactionByIdSelector = createSelector(
  transactionsSelector,
  (_: unknown, transactionId: string | undefined) => transactionId,
  (transactions, transactionId) => {
    if (isNil(transactionId)) {
      return undefined;
    }
    return transactions.find(
      (transaction) => transaction.transactionID === transactionId
    );
  }
);

export const makeTransactionByIdSelector =
  (cardId: string | undefined) => (state: TRootState) =>
    transactionByIdSelector(state, cardId);

import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash";
import { transactionsSliceName } from "../slices/transactions";
import { TRootState } from "../store";

export const rootTransactionsSelector = (state: TRootState) =>
  state[transactionsSliceName];

export const transactionsSelector = (state: TRootState) =>
  rootTransactionsSelector(state).transactions;

export const transactionsByCountAndOffsetSelector = createSelector(
  transactionsSelector,
  (_: unknown, count: number) => count,
  (_: unknown, __: unknown, offset: number) => offset,
  (cards, count, offset) => cards.slice(offset, offset + count)
);

export const makeTransactionsByCountAndOffsetSelector =
  (count: number, offset: number) => (state: TRootState) =>
    transactionsByCountAndOffsetSelector(state, count, offset);

export const transactionsLengthSelector = (state: TRootState) =>
transactionsSelector(state).length;

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

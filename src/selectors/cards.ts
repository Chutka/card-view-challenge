import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash";
import { cardsSliceName } from "../slices/cards";
import { TRootState } from "../store";
import { ICardsFilter } from "../types/cardsFilter";

export const rootCardsSelector = (state: TRootState) => state[cardsSliceName];

export const cardsSelector = (state: TRootState) => rootCardsSelector(state).cards;

export const cardsByCountAndOffsetSelector = createSelector(
    cardsSelector,
    (_: unknown, filter: ICardsFilter) => filter,
    (cards, filters) => cards.filter(card => {
        if (filters.cardID !== '' && card.cardID !== filters.cardID) {
            return false;
        }
        if (filters.currency !== '' && card.currency !== filters.currency) {
            return false;
        }
        if (filters.status !== '' && card.status !== filters.status) {
            return false;
        }
        if (filters.cardAccount !== '' && !card.cardAccount.includes(filters.cardAccount)) {
            return false;
        }
        return true;
    })
)

export const makeCardsByCountAndOffsetSelector = (filters: ICardsFilter) => (state: TRootState) => cardsByCountAndOffsetSelector(state, filters);

export const cardByIdSelector = createSelector(
    cardsSelector,
    (_: unknown, cardId: string | undefined) => cardId,
    (cards, cardId) => {
        if (isNil(cardId)) {
            return undefined;
        }
        return cards.find(card => card.cardID === cardId);
    }
);

export const makeCardByIdSelector = (cardId: string | undefined) => (state: TRootState) => cardByIdSelector(state, cardId);

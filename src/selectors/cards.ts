import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash";
import { cardsSliceName } from "../slices/cards";
import { TRootState } from "../store";

export const rootCardsSelector = (state: TRootState) => state[cardsSliceName];

export const cardsSelector = (state: TRootState) => rootCardsSelector(state).cards;

export const cardsByCountAndOffsetSelector = createSelector(
    cardsSelector,
    (_: unknown, count: number) => count,
    (_: unknown, __: unknown,  offset: number) => offset,
    (cards, count, offset) => cards.slice(offset, offset + count)
)

export const makeCardsByCountAndOffsetSelector = (count: number, offset: number) => (state: TRootState) => cardsByCountAndOffsetSelector(state, count, offset);

export const cardsLengthSelector = (state: TRootState) => cardsSelector(state).length;

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

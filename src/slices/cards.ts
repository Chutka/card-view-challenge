import { createSlice } from "@reduxjs/toolkit";
import { CARDS_MOCK } from "../mockData/generator";
import { ICard } from "../types/card";

interface ICardsState {
    cards: ICard[]
}

export const CARDS_INITIAL_STATE: ICardsState = {
    cards: CARDS_MOCK
}

export const cardsSlice = createSlice({
    name: 'cardsReducer',
    initialState: CARDS_INITIAL_STATE,
    reducers: {}
});

export const cardsSliceName = cardsSlice.name;
export const cardsActions = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
import React from 'react';
import { PathRouteProps } from "react-router-dom";
import CardById from '../pages/CardById';
import Cards from '../pages/Cards';
import { Home } from '../pages/Home';
import Transactions from '../pages/Transactions';
import TransactionsById from '../pages/TransactionsById';
import { CARDS, CARD_BY_ID, CARD_BY_ID_TRANSACTIONS, CARD_BY_ID_TRANSACTION_BY_ID, HOME, TRANSACTIONS, TRANSACTION_BY_ID } from "./constants";

export interface IRouteExtended extends PathRouteProps {
    name?: string;
}

export const routeConfig: IRouteExtended[] = [{
    path: HOME,
    element: <Home />
}, {
    path: TRANSACTIONS,
    name: 'Transactions',
    element: <Transactions />
}, {
    path: TRANSACTION_BY_ID,
    name: 'Current Transaction',
    element: <TransactionsById />
}, {
    path: CARDS,
    name: 'Cards',
    element: <Cards />
}, {
    path: CARD_BY_ID,
    name: 'Current Card',
    element: <CardById />
}, {
    path: CARD_BY_ID_TRANSACTIONS,
    name: 'Transaction For Card',
    element: <Transactions />
}, {
    path: CARD_BY_ID_TRANSACTION_BY_ID,
    name: 'Current Transaction',
    element: <TransactionsById />
}];
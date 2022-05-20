export const HOME = '';
export const TRANSACTIONS = `${HOME}/transactions`;
export const TRANSACTION_BY_ID = `${TRANSACTIONS}/:transactionId`;

export const CARDS = `${HOME}/cards`;
export const CARD_BY_ID=`${CARDS}/:cardId`;
export const CARD_BY_ID_TRANSACTIONS = `${CARD_BY_ID}/transactions`;
export const CARD_BY_ID_TRANSACTION_BY_ID = `${CARD_BY_ID_TRANSACTIONS}/:transactionId`;
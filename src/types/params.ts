export interface ICardIdParams extends Record<string, string> {
    cardId: string;
}

export interface ITransactionIdParams extends Record<string, string> {
    transactionId: string;
}

export type TCardIdAndTransactionParams = ICardIdParams & ITransactionIdParams;

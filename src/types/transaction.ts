import { CurrenciesEnum } from "./currencies";

export interface ITransaction {
    transactionID: string;
    cardAccount: string;
    cardID: string;
    amount: number;
    currency: CurrenciesEnum;
    transactionDate: Date;
    merchantInfo: string;
}
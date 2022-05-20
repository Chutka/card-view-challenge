import { CurrenciesEnum } from "./currencies";

export type TStatusCard = 'active' | 'blocked';

export interface ICard {
    cardID: string;
    cardAccount: string
    maskedCardNumber: string;
    expireDate: Date;
    currency: CurrenciesEnum;
    status: TStatusCard;
    balance: number;
}
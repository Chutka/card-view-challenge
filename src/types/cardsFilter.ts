import { TStatusCard } from "./card";
import { CurrenciesEnum } from "./currencies";

export interface ICardsFilter {
    cardID: string;
    cardAccount: string;
    currency: CurrenciesEnum | '';
    status: TStatusCard | '';
  }
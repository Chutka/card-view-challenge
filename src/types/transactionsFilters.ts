
import { CurrenciesEnum } from "./currencies";

export interface ITransactionsFilter {
    cardID: string;
    cardAccount: string;
    currency: CurrenciesEnum | '';
    amount: string | '';
    startDate: Date | null;
    endDate: Date | null;
  }
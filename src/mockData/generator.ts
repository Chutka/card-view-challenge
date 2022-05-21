import { random } from "lodash";
import { ICard } from "../types/card";
import { CurrenciesEnum } from "../types/currencies";
import { ITransaction } from "../types/transaction";

export const generateCards = (): ICard[] =>
  Array.from({ length: random(30, 100) }, (_: unknown, index) => ({
    cardID: `${index}`,
    cardAccount: `cardAccount ${index}`,
    maskedCardNumber: `${index} ***`,
    expireDate: new Date(),
    currency:
      index % 3 === 2
        ? CurrenciesEnum.AZN
        : index % 2 === 0
        ? CurrenciesEnum.EUR
        : CurrenciesEnum.USD,
    status: index % 2 === 0 ? "active" : "blocked",
    balance: random(100, 10000),
  }));

export const generateTransactionsByCards = (cards: ICard[]): ITransaction[] =>
  Array.from({ length: random(200, 2000) }, (_: unknown, index) => {
    const transactionDate = new Date();
    transactionDate.setDate(random(1, 28));

    return {
      transactionID: `${index}`,
      cardAccount: cards[index % cards.length].cardAccount,
      cardID: cards[index % cards.length].cardID,
      amount: random(1, 100),
      currency: cards[index % cards.length].currency,
      transactionDate,
      merchantInfo: 'store',
    }
  });

export const CARDS_MOCK = generateCards();

export const TRANSACTIONS_MOCK = generateTransactionsByCards(CARDS_MOCK);

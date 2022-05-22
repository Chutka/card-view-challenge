import { isNil } from "lodash";
import React from "react";
import { PaginationList } from "../../components/PaginationList";
import { withBreadCrumbs } from "../../hocs/withBreadCrumbs";
import { makeTransactionsByFiltersSelector } from "../../selectors/transactions";
import { ITransaction } from "../../types/transaction";
import { ITransactionsFilter } from "../../types/transactionsFilters";
import { Filters } from "./components/Filters";
import { TransactionItem } from "./components/TransactionItem";

const INITIAL_FILTER_VALUES: ITransactionsFilter = {
  cardID: "",
  cardAccount: "",
  currency: "",
  amount: "",
  startDate: null,
  endDate: null,
};

const prepareFilterBySearchParams = (filter: ITransactionsFilter, params: URLSearchParams) => {
  const prepareDate = (defaultValue: Date | null, key: keyof Pick<ITransactionsFilter, 'startDate' | 'endDate'>) => {
    let result = defaultValue;
    try {
      const newDate = params.get(key);
      if (!isNil(newDate)) {
        result = new Date(newDate);
      }
    } catch {}
    return result;
  }
  return {
    cardID: params.get('cardID') ?? filter.cardID,
    cardAccount: params.get('cardAccount') ?? filter.cardAccount,
    currency: params.get('currency') ?? filter.currency,
    amount: params.get('amount') ?? filter.amount,
    startDate: prepareDate(filter.startDate, 'startDate'),
    endDate: prepareDate(filter.endDate, 'endDate'),
  } as ITransactionsFilter
};

export const Transactions: React.FC = () => {
  return (
    <div>
      <PaginationList<ITransaction, ITransactionsFilter>
        initialFilter={INITIAL_FILTER_VALUES}
        prepareFilterBySearchParams={prepareFilterBySearchParams}
        itemsSelector={makeTransactionsByFiltersSelector}
        getItemKey={(transaction) => transaction.transactionID}
        Item={TransactionItem}
        Filter={Filters}
      />
    </div>
  );
};

export default withBreadCrumbs(Transactions);

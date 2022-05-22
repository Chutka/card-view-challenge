import React, { useMemo } from "react";
import { PaginationList } from "../../components/PaginationList";
import { withBreadCrumbs } from "../../hocs/withBreadCrumbs";
import { makeTransactionsByFiltersSelector } from "../../selectors/transactions";
import { ITransaction } from "../../types/transaction";
import { ITransactionsFilter } from "../../types/transactionsFilters";
import { Filters } from "./components/Filters";
import { TransactionItem } from "./components/TransactionItem";

export const Transactions: React.FC = () => {
  const initialFilter = useMemo<ITransactionsFilter>(() => ({
    cardID: "",
    cardAccount: "",
    currency: "",
    amount: "",
    startDate: null,
    endDate: null,
  }), []);

  return (
    <div>
      <PaginationList<ITransaction, ITransactionsFilter>
        initialFilter={initialFilter}
        itemsSelector={makeTransactionsByFiltersSelector}
        getItemKey={(transaction) => transaction.transactionID}
        Item={TransactionItem}
        Filter={Filters}
      />
    </div>
  );
};

export default withBreadCrumbs(Transactions);

import React, { SetStateAction, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { PaginationList } from "../../components/PaginationList";
import { withBreadCrumbs } from "../../hocs/withBreadCrumbs";
import { makeTransactionsByFiltersSelector } from "../../selectors/transactions";
import { ITransaction } from "../../types/transaction";
import { ITransactionsFilter } from "../../types/transactionsFilters";
import { Filters } from "./components/Filters";
import { TransactionItem } from "./components/TransactionItem";

export const Transactions: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ITransactionsFilter>({
    cardID: "",
    cardAccount: "",
    currency: "",
    amount: "",
    startDate: null,
    endDate: null,
  });

  const transactionsByPageSelector = useMemo(
    () => makeTransactionsByFiltersSelector(filters),
    [filters]
  );

  const transactions = useSelector(transactionsByPageSelector);

  const handleFilterOnChange = useCallback(
    (newFilters: SetStateAction<ITransactionsFilter>) => {
      setPage(1);
      setFilters(newFilters);
    },
    []
  );

  return (
    <div>
      <Filters value={filters} onChange={handleFilterOnChange} />
      <PaginationList<ITransaction>
        items={transactions}
        Item={TransactionItem}
        getItemKey={(transaction) => transaction.transactionID}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default withBreadCrumbs(Transactions);

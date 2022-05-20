import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Link,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { generatePath, Link as RouterLink } from "react-router-dom";
import { TRANSACTION_BY_ID } from "../../routes/constants";
import { makeTransactionsByCountAndOffsetSelector, transactionsLengthSelector } from "../../selectors/transactions";
import { formatDate } from "../../utils/date";
import { useStyles } from "./styles";

const COUNT_TRANSACTIONS_PER_PAGE = 10;

export const Transactions: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const transactionsByPageSelector = useMemo(
    () =>
      makeTransactionsByCountAndOffsetSelector(
        COUNT_TRANSACTIONS_PER_PAGE,
        (page - 1) * COUNT_TRANSACTIONS_PER_PAGE
      ),
    [page]
  );

  const transactions = useSelector(transactionsByPageSelector);
  const countTransactions = useSelector(transactionsLengthSelector);
  const countPages = Math.ceil(countTransactions / COUNT_TRANSACTIONS_PER_PAGE);

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <div>
      {transactions.map((transaction, index, cardsList) => (
        <Card
          key={transaction.transactionID}
          className={
            cardsList.length - 1 !== index ? classes.withMargin : undefined
          }
        >
          <CardContent>
            <Typography
              className={classes.transactionHeader}
              variant="h2"
              color="textSecondary"
              gutterBottom
            >
              Transaction for {transaction.cardAccount}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Amount: {transaction.amount}
            </Typography>
            <Typography variant="body2" component="p">
              Date: {formatDate(transaction.transactionDate)}
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              component={RouterLink}
              to={generatePath(TRANSACTION_BY_ID, { transactionId: transaction.transactionID })}
            >
              More info
            </Link>
          </CardActions>
        </Card>
      ))}
      <Pagination page={page} onChange={handlePageChange} count={countPages} />
    </div>
  );
};

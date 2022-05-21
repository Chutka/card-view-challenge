import { Card, CardContent, Typography } from '@material-ui/core';
import { isNil } from 'lodash';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withBreadCrumbs } from '../../hocs/withBreadCrumbs';
import { makeTransactionByIdSelector } from '../../selectors/transactions';
import { ITransactionIdParams } from '../../types/params';
import { formatDate } from '../../utils/date';
import { useStyles } from './styles';

export const TransactionsById: React.FC = () => {
    const classes = useStyles();
    const { transactionId } = useParams<ITransactionIdParams>();
  
    const transactionSelector = useMemo(() => makeTransactionByIdSelector(transactionId), [transactionId]);

    const transaction = useSelector(transactionSelector);
    return !isNil(transaction) ? (
      <Card>
        <CardContent>
          <Typography
            className={classes.header}
            variant="h2"
            color="textSecondary"
            gutterBottom
          >
            {transaction.cardAccount} - {transaction.merchantInfo}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Currency: {transaction.currency}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Amount: {transaction.amount}
          </Typography>
          <Typography variant="body2" component="p">
            Date: {formatDate(transaction.transactionDate)}
          </Typography>
        </CardContent>
      </Card>
    ) : null;
}

export default withBreadCrumbs(TransactionsById);

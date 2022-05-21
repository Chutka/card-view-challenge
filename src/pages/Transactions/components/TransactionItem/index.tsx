import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
} from "@material-ui/core";
import { Link as RouterLink, generatePath } from "react-router-dom";
import { useStyles } from "./styles";
import { IBaseItemProps } from "../../../../components/PaginationList/types";
import { TRANSACTION_BY_ID } from "../../../../routes/constants";
import { formatDate } from "../../../../utils/date";
import { ITransaction } from "../../../../types/transaction";

export const TransactionItem: React.FC<IBaseItemProps<ITransaction>> = ({
  className,
  item,
}) => {
  const classes = useStyles();
  return (
    <Card
      key={item.transactionID}
      className={className}
    >
      <CardContent>
        <Typography
          className={classes.transactionHeader}
          variant="h2"
          color="textSecondary"
          gutterBottom
        >
          Transaction for {item.cardAccount}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Amount: {item.amount}
        </Typography>
        <Typography variant="body2" component="p">
          Date: {formatDate(item.transactionDate)}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          component={RouterLink}
          to={generatePath(TRANSACTION_BY_ID, {
            transactionId: item.transactionID,
          })}
        >
          More info
        </Link>
      </CardActions>
    </Card>
  );
};

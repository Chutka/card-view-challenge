import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
} from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useStyles } from "./styles";
import { BaseItemProps } from "../../../../components/PaginationList/types";
import { formatDate } from "../../../../utils/date";
import { ITransaction } from "../../../../types/transaction";

export const TransactionItem: React.FC<BaseItemProps<ITransaction>> = ({
  className,
  item,
}) => {
  const classes = useStyles();
  const location = useLocation();

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
          to={`${location.pathname}/${item.transactionID}`}
        >
          More info
        </Link>
      </CardActions>
    </Card>
  );
};

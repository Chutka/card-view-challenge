import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Link,
} from "@material-ui/core";
import { isNil } from "lodash";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams, Link as RouterLink, generatePath } from "react-router-dom";
import { CARD_BY_ID_TRANSACTIONS } from "../../routes/constants";
import { makeCardByIdSelector } from "../../selectors/cards";
import { ICardIdParams } from "../../types/params";
import { formatDate } from "../../utils/date";
import { useStyles } from "./styles";

export const CardById: React.FC = () => {
  const classes = useStyles();
  const { cardId } = useParams<ICardIdParams>();

  const cardSelector = useMemo(() => makeCardByIdSelector(cardId), [cardId]);
  const card = useSelector(cardSelector);
  return !isNil(card) ? (
    <Card>
      <CardContent>
        <Typography
          className={classes.cardHeader}
          variant="h2"
          color="textSecondary"
          gutterBottom
        >
          {card.cardAccount}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Currency: {card.currency}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Card number: {card.maskedCardNumber}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Expire date: {formatDate(card.expireDate)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Balance: {card.balance}
        </Typography>
        <Typography variant="body2" component="p">
          Status: {card.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Link component={RouterLink} to={generatePath(CARD_BY_ID_TRANSACTIONS, { cardId: card.cardID })}>Transactions</Link>
      </CardActions>
    </Card>
  ) : null;
};

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Link
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { generatePath, Link as RouterLink } from "react-router-dom";
import { CARD_BY_ID } from "../../routes/constants";
import {
  cardsLengthSelector,
  makeCardsByCountAndOffsetSelector,
} from "../../selectors/cards";
import { useStyles } from "./styles";

const COUNT_CARDS_PER_PAGE = 10;

export const Cards: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const cardsByPageSelector = useMemo(
    () =>
      makeCardsByCountAndOffsetSelector(
        COUNT_CARDS_PER_PAGE,
        (page - 1) * COUNT_CARDS_PER_PAGE
      ),
    [page]
  );

  const cards = useSelector(cardsByPageSelector);
  const countCards = useSelector(cardsLengthSelector);
  const countPages = Math.ceil(countCards / COUNT_CARDS_PER_PAGE);

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <div>
      {cards.map((card, index, cardsList) => (
        <Card
          key={card.cardID}
          className={
            cardsList.length - 1 !== index ? classes.withMargin : undefined
          }
        >
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
              {card.balance}
            </Typography>
            <Typography variant="body2" component="p">
              {card.status}
            </Typography>
          </CardContent>
          <CardActions>
              <Link component={RouterLink} to={generatePath(CARD_BY_ID, { cardId: card.cardID })}>More info</Link>
          </CardActions>
        </Card>
      ))}
      <Pagination page={page} onChange={handlePageChange} count={countPages} />
    </div>
  );
};

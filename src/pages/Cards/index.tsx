import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Link
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { SetStateAction, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { generatePath, Link as RouterLink } from "react-router-dom";
import { withBreadCrumbs } from "../../hocs/withBreadCrumbs";
import { CARD_BY_ID } from "../../routes/constants";
import {
  makeCardsByCountAndOffsetSelector,
} from "../../selectors/cards";
import { ICardsFilter } from "../../types/cardsFilter";
import { Filters } from "./components/Filters";
import { useStyles } from "./styles";

const COUNT_CARDS_PER_PAGE = 10;

export const Cards: React.FC = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState<ICardsFilter>({
    cardID: '',
    cardAccount: '',
    currency: '',
    status: ''
  });
  const [page, setPage] = useState(1);

  const cardsByPageSelector = useMemo(
    () =>
      makeCardsByCountAndOffsetSelector(
        filters,
      ),
    [filters]
  );

  const cards = useSelector(cardsByPageSelector);

  const cardsByPage = useMemo(() => {
    const start = (page - 1) * COUNT_CARDS_PER_PAGE,
      end = start + COUNT_CARDS_PER_PAGE;
    return cards.slice(start, end);
  }, [cards, page])
  const countPages = Math.ceil(cards.length / COUNT_CARDS_PER_PAGE);

  const handleFilterOnChange = useCallback((newFilters: SetStateAction<ICardsFilter>) => {
    setPage(1);
    setFilters(newFilters);
  }, []);
  
  const handlePageChange = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <div>
      <Filters value={filters} onChange={handleFilterOnChange} />
      {cardsByPage.map((card, index, cardsList) => (
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


export default withBreadCrumbs(Cards);
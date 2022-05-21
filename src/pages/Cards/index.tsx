import React, { SetStateAction, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { withBreadCrumbs } from "../../hocs/withBreadCrumbs";
import { makeCardsByCountAndOffsetSelector } from "../../selectors/cards";
import { ICardsFilter } from "../../types/cardsFilter";
import { CardItem } from "./components/CardItem";
import { Filters } from "./components/Filters";
import { PaginationList } from "../../components/PaginationList";
import { ICard } from "../../types/card";

export const Cards: React.FC = () => {
  const [filters, setFilters] = useState<ICardsFilter>({
    cardID: "",
    cardAccount: "",
    currency: "",
    status: "",
  });
  const [page, setPage] = useState(1);

  const cardsByPageSelector = useMemo(
    () => makeCardsByCountAndOffsetSelector(filters),
    [filters]
  );

  const cards = useSelector(cardsByPageSelector);

  const handleFilterOnChange = useCallback(
    (newFilters: SetStateAction<ICardsFilter>) => {
      setPage(1);
      setFilters(newFilters);
    },
    []
  );

  return (
    <div>
      <Filters value={filters} onChange={handleFilterOnChange} />
      <PaginationList<ICard>
        items={cards}
        Item={CardItem}
        getItemKey={(card) => card.cardID}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default withBreadCrumbs(Cards);

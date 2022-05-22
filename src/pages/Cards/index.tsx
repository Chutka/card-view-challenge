import React, { useMemo } from "react";
import { withBreadCrumbs } from "../../hocs/withBreadCrumbs";
import { makeCardsByCountAndOffsetSelector } from "../../selectors/cards";
import { ICardsFilter } from "../../types/cardsFilter";
import { CardItem } from "./components/CardItem";
import { Filters } from "./components/Filters";
import { PaginationList } from "../../components/PaginationList";
import { ICard } from "../../types/card";

export const Cards: React.FC = () => {
  const initialFilter = useMemo<ICardsFilter>(() => {
    return {
      cardID: "",
      cardAccount: "",
      currency: "",
      status: "",
    };
  }, [])

  return (
    <div>
      <PaginationList<ICard, ICardsFilter>
        initialFilter={initialFilter}
        itemsSelector={makeCardsByCountAndOffsetSelector}
        getItemKey={(card) => card.cardID}
        Item={CardItem}
        Filter={Filters}
      />
    </div>
  );
};

export default withBreadCrumbs(Cards);

import React from "react";
import { withBreadCrumbs } from "../../hocs/withBreadCrumbs";
import { makeCardsByCountAndOffsetSelector } from "../../selectors/cards";
import { ICardsFilter } from "../../types/cardsFilter";
import { CardItem } from "./components/CardItem";
import { Filters } from "./components/Filters";
import { PaginationList } from "../../components/PaginationList";
import { ICard } from "../../types/card";

const INITIAL_FILTER_VALUES: ICardsFilter = {
  cardID: "",
  cardAccount: "",
  currency: "",
  status: "",
};

const prepareFilterBySearchParams = (filter: ICardsFilter, params: URLSearchParams) => ({
  cardID: params.get('cardID') ?? filter.cardID,
  cardAccount: params.get('cardAccount') ?? filter.cardAccount,
  currency: params.get('currency') ?? filter.currency,
  status: params.get('status') ?? filter.status,
} as ICardsFilter);

export const Cards: React.FC = () => {
  return (
    <div>
      <PaginationList<ICard, ICardsFilter>
        initialFilter={INITIAL_FILTER_VALUES}
        prepareFilterBySearchParams={prepareFilterBySearchParams}
        itemsSelector={makeCardsByCountAndOffsetSelector}
        getItemKey={(card) => card.cardID}
        Item={CardItem}
        Filter={Filters}
      />
    </div>
  );
};

export default withBreadCrumbs(Cards);

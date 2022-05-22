import { Button } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { ComponentType, SetStateAction, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../../store";
import { useStyles } from "./styles";
import { BaseItemProps, FilterComponentProps } from "./types";

interface PaginationListProps<T, FT> {
  initialFilter: FT;
  itemsSelector: (filter: FT) => (state: TRootState) => T[];
  getItemKey: (item: T) => React.Key;

  Filter: ComponentType<FilterComponentProps<FT>>;
  Item: ComponentType<BaseItemProps<T>>;
}

const COUNT_ITEMS_PER_PAGE = 10;

export function PaginationList<T, FT>({
  initialFilter,
  itemsSelector,
  getItemKey,
  Item,
  Filter,
}: PaginationListProps<T, FT>) {
  const classes = useStyles();

  const [filters, setFilters] = useState<FT>(initialFilter);
  const [page, setPage] = useState(1);

  const items = useSelector(itemsSelector(filters));

  const itemsByPage = useMemo(() => {
    const start = (page - 1) * COUNT_ITEMS_PER_PAGE,
      end = start + COUNT_ITEMS_PER_PAGE;
    return items.slice(start, end);
  }, [items, page]);

  const countPages = Math.ceil(items.length / COUNT_ITEMS_PER_PAGE);

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
      setPage(newPage);
  }, []);

  const handleFilterOnChange = useCallback(
    (newFilters: SetStateAction<FT>) => {
      setPage(1);
      setFilters(newFilters);
    },
    []
  );

  const handleClickFilterReset = useCallback(() => {
    setFilters(initialFilter);
  }, [initialFilter])
  
  return (
    <div>
      <Filter value={filters} onChange={handleFilterOnChange} />
      <Button size="small" type="button" onClick={handleClickFilterReset}>
        Reset Filter
      </Button>
      {itemsByPage.map((item, index, itemsList) => (
        <Item
          key={getItemKey(item)}
          className={
            itemsList.length - 1 !== index ? classes.withMargin : undefined
          }
          item={item}
        />
      ))}
      <Pagination page={page} onChange={handlePageChange} count={countPages} />
    </div>
  );
}

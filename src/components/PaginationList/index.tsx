import { Button } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { ComponentType, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TRootState } from "../../store";
import { useStyles } from "./styles";
import { BaseItemProps, FilterComponentProps } from "./types";

interface PaginationListProps<T, FT> {
  initialFilter: FT;
  prepareFilterBySearchParams: (filter: FT, params: URLSearchParams) => FT;
  itemsSelector: (filter: FT) => (state: TRootState) => T[];
  getItemKey: (item: T) => React.Key;

  Filter: ComponentType<FilterComponentProps<FT>>;
  Item: ComponentType<BaseItemProps<T>>;
}

const COUNT_ITEMS_PER_PAGE = 10;

export function PaginationList<T, FT>({
  initialFilter,
  prepareFilterBySearchParams,
  itemsSelector,
  getItemKey,
  Item,
  Filter,
}: PaginationListProps<T, FT>) {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<FT>(() => {
    return prepareFilterBySearchParams(initialFilter, new URLSearchParams(location.search))
  });
  const [page, setPage] = useState(1);

  const items = useSelector(itemsSelector(filter));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    for (const [key, value] of Object.entries(filter)) {
      params.set(key, value.toString())
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true});
  }, [filter, location.pathname, location.search, navigate])

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
      setFilter(newFilters);
    },
    []
  );

  const handleClickFilterReset = useCallback(() => {
    setFilter(initialFilter);
  }, [initialFilter])
  
  return (
    <div>
      <Filter value={filter} onChange={handleFilterOnChange} />
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

import { Pagination } from "@material-ui/lab";
import { isNil } from "lodash";
import React, { ComponentType, useCallback, useEffect, useMemo, useState } from "react";
import { useStyles } from "./styles";
import { IBaseItemProps } from "./types";

interface PaginationListProps<T> {
  items: T[];
  getItemKey: (item: T) => React.Key;
  Item: ComponentType<IBaseItemProps<T>>;

  page?: number;
  onPageChange?: (newPage: number) => void;
}

const COUNT_ITEMS_PER_PAGE = 10;

export function PaginationList<T>({
  page,
  onPageChange,
  items,
  Item,
  getItemKey,
}: PaginationListProps<T>) {
  const classes = useStyles();
  const [pageValue, setPageValue] = useState(page ?? 1);

  useEffect(() => {
    setPageValue(page ?? 1);
  }, [page]);

  const itemsByPage = useMemo(() => {
    const start = (pageValue - 1) * COUNT_ITEMS_PER_PAGE,
      end = start + COUNT_ITEMS_PER_PAGE;
    return items.slice(start, end);
  }, [items, pageValue]);

  const countPages = Math.ceil(items.length / COUNT_ITEMS_PER_PAGE);

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
      if (!isNil(onPageChange)) {
        onPageChange(newPage);
      } else {
        setPageValue(newPage);
      }
  }, [onPageChange]);

  return (
    <div>
      {itemsByPage.map((item, index, itemsList) => (
        <Item
          key={getItemKey(item)}
          className={
            itemsList.length - 1 !== index ? classes.withMargin : undefined
          }
          item={item}
        />
      ))}
      <Pagination page={pageValue} onChange={handlePageChange} count={countPages} />
    </div>
  );
}

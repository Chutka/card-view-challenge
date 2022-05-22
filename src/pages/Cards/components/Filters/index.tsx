import { FormControl, InputLabel, Select, MenuItem, TextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { FilterComponentProps } from "../../../../components/PaginationList/types";
import { cardsSelector } from "../../../../selectors/cards";
import { TStatusCard } from "../../../../types/card";
import { ICardsFilter } from "../../../../types/cardsFilter";
import { CurrenciesEnum } from "../../../../types/currencies";
import { useStyles } from "./styles";

export const Filters: React.FC<FilterComponentProps<ICardsFilter>> = ({ value, onChange }) => {
    const classes = useStyles();
  const cards = useSelector(cardsSelector);

  const handleChangeCardID = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value;
    if (typeof newValue === 'string') {
        onChange(prevValues => ({
            ...prevValues,
            cardID: newValue
        }));
    }
  }, [onChange])

  const handleChangeStatus = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value;
    if (typeof newValue === 'string') {
        onChange(prevValues => ({
            ...prevValues,
            status: newValue as TStatusCard
        }));
    }
  }, [onChange])

  const handleChangeCardAccount = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value;
    if (typeof newValue === 'string') {
        onChange(prevValues => ({
            ...prevValues,
            cardAccount: newValue
        }));
    }
  }, [onChange])

  const handleChangeCurrency = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value;
    if (typeof newValue === 'string') {
        onChange(prevValues => ({
            ...prevValues,
            currency: newValue as CurrenciesEnum
        }));
    }
  }, [onChange])

  return (
    <div>
      <FormControl className={classes.cardSelect}>
        <InputLabel id="cardID">Select Card</InputLabel>
        <Select
          labelId="cardID"
          value={value.cardID}
          onChange={handleChangeCardID}
        >
            {cards.map(card => (
                <MenuItem key={card.cardID} value={card.cardID}>{card.maskedCardNumber}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField label="Card Account" value={value.cardAccount} onChange={handleChangeCardAccount} />
      <FormControl className={classes.currencySelect}>
        <InputLabel id="currency">Select currency</InputLabel>
        <Select
          labelId="currency"
          value={value.currency}
          onChange={handleChangeCurrency}
        >
            <MenuItem value={CurrenciesEnum.USD}>CurrenciesEnum.USD</MenuItem>
            <MenuItem value={CurrenciesEnum.EUR}>CurrenciesEnum.EUR</MenuItem>
            <MenuItem value={CurrenciesEnum.AZN}>CurrenciesEnum.AZN</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.statusSelect}>
        <InputLabel id="status">Select status</InputLabel>
        <Select
          labelId="status"
          value={value.status}
          onChange={handleChangeStatus}
        >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

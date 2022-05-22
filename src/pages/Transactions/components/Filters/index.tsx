import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { isNil } from "lodash";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { FilterComponentProps } from "../../../../components/PaginationList/types";
import { cardsSelector } from "../../../../selectors/cards";
import { CurrenciesEnum } from "../../../../types/currencies";
import { ITransactionsFilter } from "../../../../types/transactionsFilters";
import { useStyles } from "./styles";

export const Filters: React.FC<FilterComponentProps<ITransactionsFilter>> = ({ value, onChange }) => {
  const classes = useStyles();
  const cards = useSelector(cardsSelector);

  const handleChangeCardID = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const newValue = event.target.value;
      if (typeof newValue === "string") {
        onChange((prevValues) => ({
          ...prevValues,
          cardID: newValue,
        }));
      }
    },
    [onChange]
  );

  const handleChangeCardAccount = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const newValue = event.target.value;
      if (typeof newValue === "string") {
        onChange((prevValues) => ({
          ...prevValues,
          cardAccount: newValue,
        }));
      }
    },
    [onChange]
  );

  const handleChangeAmount = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const newValue = event.target.value;
      if (typeof newValue === "string") {
        onChange((prevValues) => ({
          ...prevValues,
          amount: newValue,
        }));
      }
    },
    [onChange]
  );

  const handleChangeCurrency = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const newValue = event.target.value;
      if (typeof newValue === "string") {
        onChange((prevValues) => ({
          ...prevValues,
          currency: newValue as CurrenciesEnum,
        }));
      }
    },
    [onChange]
  );

  const handleChangeStartDate = useCallback(
    (newValue: Date | null) => {
      if (!isNil(newValue)) {
        onChange((prevValues) => ({
          ...prevValues,
          startDate: newValue,
        }));
      }
    },
    [onChange]
  );

  const handleChangeEndDate = useCallback(
    (newValue: Date | null) => {
      if (!isNil(newValue)) {
        onChange((prevValues) => ({
          ...prevValues,
          endDate: newValue,
        }));
      }
    },
    [onChange]
  );

  return (
    <div className={classes.container}>
      <FormControl className={classes.cardSelect}>
        <InputLabel id="cardID">Select Card</InputLabel>
        <Select
          labelId="cardID"
          value={value.cardID}
          onChange={handleChangeCardID}
        >
          {cards.map((card) => (
            <MenuItem key={card.cardID} value={card.cardID}>
              {card.maskedCardNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Card Account"
        value={value.cardAccount}
        onChange={handleChangeCardAccount}
      />
      <TextField
        label="Amount"
        value={value.amount}
        onChange={handleChangeAmount}
      />
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
      <KeyboardDatePicker
        className={classes.datePicker}
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        label="Date Start"
        value={value.startDate}
        onChange={handleChangeStartDate}
      />
      <KeyboardDatePicker
        className={classes.datePicker}
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        label="Date End"
        value={value.endDate}
        onChange={handleChangeEndDate}
      />
    </div>
  );
};

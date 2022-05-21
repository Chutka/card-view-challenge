import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      container: {
        display: 'flex',
        alignItems: 'center'
      },
      cardSelect: {
          width: 200
      },
      currencySelect: {
          width: 150
      },
      statusSelect: {
          width: 150
      },
      datePicker: {
          margin: 0
      }
  }),
);
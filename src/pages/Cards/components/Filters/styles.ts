import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      cardSelect: {
          width: 200
      },
      currencySelect: {
          width: 150
      },
      statusSelect: {
          width: 150
      }
  }),
);
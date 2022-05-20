import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      cardHeader: {
        fontSize: '1.5rem',
      },
      withMargin: {
        marginBottom: 10
      }
  }),
);
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
} from "@material-ui/core";
import { Link as RouterLink, generatePath } from "react-router-dom";
import { CARD_BY_ID } from "../../../../routes/constants";
import { ICard } from "../../../../types/card";
import { useStyles } from "./styles";
import { IBaseItemProps } from "../../../../components/PaginationList/types";

export const CardItem: React.FC<IBaseItemProps<ICard>> = ({
  className,
  item,
}) => {
  const classes = useStyles();
  return (
    <Card className={className}>
      <CardContent>
        <Typography
          className={classes.cardHeader}
          variant="h2"
          color="textSecondary"
          gutterBottom
        >
          {item.cardAccount}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.balance}
        </Typography>
        <Typography variant="body2" component="p">
          {item.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          component={RouterLink}
          to={generatePath(CARD_BY_ID, { cardId: item.cardID })}
        >
          More info
        </Link>
      </CardActions>
    </Card>
  );
};

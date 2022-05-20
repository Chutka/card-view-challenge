import { AppBar, Tab, Tabs, Toolbar } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CARDS, TRANSACTIONS } from "../../routes/constants";

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const value = useMemo(() => {
    if (location.pathname.includes(CARDS)) {
      return CARDS
    }
    return TRANSACTIONS;
  }, [location.pathname]);

  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: string) => {
    navigate(newValue)
  }, [navigate]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab value={CARDS} label="Cards" />
          <Tab value={TRANSACTIONS} label="Transactions" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CardById } from "../../pages/CardById";
import { Cards } from "../../pages/Cards";
import { Home } from "../../pages/Home";
import { Transactions } from "../../pages/Transactions";
import { TransactionsById } from "../../pages/TransactionsById";
import { Header } from "../Header";
import {
  CARDS,
  CARD_BY_ID,
  CARD_BY_ID_TRANSACTIONS,
  CARD_BY_ID_TRANSACTION_BY_ID,
  HOME,
  TRANSACTIONS,
  TRANSACTION_BY_ID,
} from "../../routes/constants";
import { Provider } from "react-redux";
import { store } from "../../store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Container maxWidth="lg">
            <Routes>
              <Route path={HOME} element={<Home />} />
              <Route path={TRANSACTIONS} element={<Transactions />} />
              <Route path={TRANSACTION_BY_ID} element={<TransactionsById />} />
              {/* <Route path="transactions/:transactionId/:cardId" element={} /> ???? */}
              <Route path={CARDS} element={<Cards />} />
              <Route path={CARD_BY_ID} element={<CardById />} />
              <Route
                path={CARD_BY_ID_TRANSACTIONS}
                element={<Transactions />}
              />
              <Route
                path={CARD_BY_ID_TRANSACTION_BY_ID}
                element={<TransactionsById />}
              />
            </Routes>
          </Container>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

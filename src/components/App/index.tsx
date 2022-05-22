import React from "react";
import { Container } from "@material-ui/core";
import { unstable_HistoryRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../Header";
import { Provider } from "react-redux";
import { store } from "../../store";
import { history } from "../../history";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { routeConfig } from "../../routes/config";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <Header />
            <Container maxWidth="lg">
              <Routes>
                {routeConfig.map(route => (
                  <Route key={route.path} {...route} />
                ))}
              </Routes>
            </Container>
          </Router>
        </div>
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default App;

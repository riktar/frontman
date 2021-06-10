import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, Provider } from "store";
import { RootModel, snapshot } from "store/Root";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./router";

const store = createStore(RootModel, snapshot, {});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={store}>
      <BrowserRouter>
        <Switch>
          {routes.map((page) => (
            <Route key={page.key} {...page.props}>
              {page.component}
            </Route>
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

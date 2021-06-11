import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./router";
import { RecoilRoot } from "recoil";
import App from "components/App";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App>
        <BrowserRouter>
          <Switch>
            {routes.map((page) => (
              <Route key={page.key} {...page.props}>
                {page.component}
              </Route>
            ))}
          </Switch>
        </BrowserRouter>
      </App>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

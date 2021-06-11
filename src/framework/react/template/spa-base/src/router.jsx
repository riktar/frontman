import React from "react";
import Home from "pages/Home";
import Http404 from "pages/Http404";
import jsonRoutes from "./router.json";

const routes = jsonRoutes.map((x) => ({
  ...x,
  component: React.createElement(eval(x.key), {}),
}));

export { routes };

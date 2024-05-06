import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RoutePath } from "./router-config";
import Root from "../pages/root";

interface IRouteParams {
  Component: JSX.Element;
  path: RoutePath;
}

const routes: IRouteParams[] = [
  {
    Component: <Root />,
    path: RoutePath.ROOT,
  },
];

function Router() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          {routes.map(({ Component, path }) => (
            <Route key={path} path={path} element={Component} />
          ))}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;

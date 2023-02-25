import React from "react";
import * as ReactDOM from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router";
import type { RouteObject } from "react-router";
import AppGrid from "./components/AppGrid";
import Layout from "./components/Layout";
import Netflix from "./components/Netflix";
import reportWebVitals from "./reportVitals";
import "./styles/globals.scss";

function render() {
  const routes: RouteObject[] = [
    {
      path: "/netflix",
      element: <Netflix />,
    },
    {
      path: "/",
      element: <AppGrid />,
    },
  ];

  const router = createMemoryRouter(routes);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </React.StrictMode>
  );
}

render();
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import { createMemoryRouter, RouteObject, RouterProvider } from "react-router";
import AppGrid from "./components/AppGrid";
import Layout from "./components/Layout";
import Netflix from "./components/Netflix";
import "./styles/globals.scss";

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");

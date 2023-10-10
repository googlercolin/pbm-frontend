import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Gallery from "./components/Gallery";
import PBMDeploymentForm from "./components/PBMDeploymentForm";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { itemDetailRoute } from "./routes/ItemDetail";
import NavBar from "./components/NavBar";

const routesConfig = [
  {
    path: "/",
    element: <App />,
    loader: async () => {
      return null;
    },
  },
  {
    path: "shop",
    element: <Gallery />,
    loader: async () => {
      return null;
    },
  },
  {
    path: "deploy",
    element: < PBMDeploymentForm/>,
    loader: async () => {
      return null;
    },
  },
  itemDetailRoute,
];

const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

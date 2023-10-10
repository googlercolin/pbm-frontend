import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { itemDetailRoute } from "./routes/ItemDetail";
import NavBar from "./components/NavBar";
import MintPage from "./routes/MintPage";
import TokenPage from "./routes/TokenPage";
import ShopPage from "./routes/ShopPage";
import DeployPage from "./routes/DeployPage";
import { Web3OnboardProvider } from "@web3-onboard/react";
import { WalletProvider } from "./providers/WalletConnectProvider";

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
    element: <ShopPage />,
    loader: async () => {
      return null;
    },
  },
  {
    path: "deploy",
    element: <DeployPage />,
    loader: async () => {
      return null;
    },
  },
  {
    path: "mint",
    element: <MintPage />,
    loader: async () => {
      return null;
    },
  },
  {
    path: "tokens",
    element: <TokenPage />,
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
    <WalletProvider>
      <NavBar />
      <RouterProvider router={router} />
    </WalletProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

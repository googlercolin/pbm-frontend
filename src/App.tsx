import React, { useEffect } from "react";
import "./App.css";
import PBMDeploymentForm from "./components/PBMDeploymentForm";
import { useFactoryContract } from "./hooks/useFactoryContract";
import { useWeb3 } from "./hooks/useWeb3";

function App() {
  const { account, ethersProvider, signer } = useWeb3();
  const { factoryContract, getPBMTokens } = useFactoryContract();
  useEffect(() => {
    getPBMTokens();
  }, [getPBMTokens]);

  return <div className="App">THis should be the landing page</div>;
}

export default App;

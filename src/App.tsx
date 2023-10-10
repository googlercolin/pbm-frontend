import React, { useEffect } from "react";
import "./App.css";
import PBMDeploymentForm from "./components/PBMDeploymentForm";
import { useFactoryContract } from "./hooks/useFactoryContract";

function App() {
  const someTransaction = useFactoryContract();
  useEffect(() => {
    someTransaction();
  }, []);

  return <div className="App">THis should be the landing page</div>;
}

export default App;

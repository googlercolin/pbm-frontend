import React, { useEffect } from "react";
import "./App.css";
import { useFactoryContract } from "./hooks/useFactoryContract";
import { useWeb3 } from "./hooks/useWeb3";
import vault from "./assets/vault.svg";
import { Button } from "react-daisyui";
import { Link } from "react-router-dom";

function App() {
  const { account, ethersProvider, signer } = useWeb3();
  const { factoryContract, getPBMTokens, getPBMToken } = useFactoryContract();
  // useEffect(() => {
  //   getPBMTokens();
  //   getPBMToken(0);
  // }, [getPBMTokens, getPBMToken]);

  return (
    <div className="App flex flex-row items-center justify-center mt-60">
      <div className=" flex flex-col text-left ml-12">
        <h1 className="font-bold text-4xl mb-4">Purpose Bound Money</h1>
        <div>Implementing MAS's concept of Purpose Bound Money.</div>
        <div>
          Read the PBM whitepaper here, or deploy one on our site right now!
        </div>
        <div className="flex">
          <a
            className="mt-4"
            target="_blank"
            rel="noreferrer"
            href="https://www.mas.gov.sg/-/media/mas-media-library/development/fintech/pbm/pbm-technical-whitepaper.pdf"
          >
            <Button color="primary" className="px-12" size="md">
              Whitepaper
            </Button>
          </a>
          <Link to="/deploy" className="mt-4 ml-8">
            <Button className="px-12" color="secondary" size="md">
              Deploy
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-1/2 flex justify-center">
        <img src={vault} alt="vault" className="w-8/12" />
      </div>
    </div>
  );
}

export default App;

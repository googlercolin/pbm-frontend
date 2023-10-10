import React, { useState, useEffect } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

export default function NavBar() {
  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
      connecting, // boolean indicating if connection is in progress
    },
    connect, // function to call to initiate user to connect wallet
    disconnect, // function to call with wallet<DisconnectOptions> to disconnect wallet
    updateBalances, // function to be called with an optional array of wallet addresses connected through Onboard to update balance or empty/no params to update all connected wallets
    setWalletModules, // function to be called with an array of wallet modules to conditionally allow connection of wallet types i.e. setWalletModules([ledger, trezor, injected])
    setPrimaryWallet, // function that can set the primary wallet and/or primary account within that wallet. The wallet that is set needs to be passed in for the first parameter and if you would like to set the primary account, the address of that account also needs to be passed in
  ] = useConnectWallet();
  const [ethersProvider, setProvider] =
    useState<ethers.BrowserProvider | null>();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url },
      });
    }
  }, [wallet]);

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      // if using ethers v6 this is:
      setProvider(new ethers.BrowserProvider(wallet.provider, "any"));
    }
  }, [wallet]);

  const connectButtonHandler = () => {
    if (wallet) {
      disconnect({ label: wallet.label });
      setAccount(null);
    } else {
      connect();
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/deploy">Deploy</a>
            </li>
            <li>
              <a href="/mint">Mint</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/tokens">My Tokens</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl" href="/">
          PBM
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/deploy">Deploy</a>
          </li>
          <li>
            <a href="/mint">Mint</a>
          </li>
          {/* <li tabIndex={0}></li> */}
          <li>
            <a href="/shop">Shop</a>
          </li>
          <li>
            <a href="/tokens">My Tokens</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          className="btn w-48 truncate block"
          onClick={connectButtonHandler}
        >
          {connecting && <span className="loading loading-spinner"></span>}
          {!connecting &&
            (wallet && account ? account.address : "Connect Wallet")}
        </button>
      </div>
    </div>
  );
}

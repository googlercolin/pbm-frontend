import React, { useState, useEffect } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import type { TokenSymbol } from "@web3-onboard/common";

export function useWeb3() {
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
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      // if using ethers v6 this is:
      setProvider(new ethers.BrowserProvider(wallet.provider, "any"));
    }
  }, [wallet]);

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
    if (!wallet && account) {
      setAccount(null);
    }
  }, [wallet, account]);

  useEffect(() => {
    const getSigner = async () => {
      if (ethersProvider) {
        const signer = await ethersProvider.getSigner();
        setSigner(signer);
      }
    };
    getSigner();
  }, [ethersProvider]);

  return { account, ethersProvider, signer };
}

import { useState, useEffect, useCallback } from "react";
import { useWeb3 } from "./useWeb3";
import { Contract } from "ethers";

import UsdcABI from "../ABIs/UsdcABI.json";

export function useUsdcContract() {
  const [contract, setContract] = useState<Contract | null>(null);
  const { account, ethersProvider, signer } = useWeb3();
  const contractAddress = "0x86378fFB1A704B9037A20A8066BEC948deb1DA04";
  const contractAbi = UsdcABI;

  useEffect(() => {
    if (contractAddress && contractAbi && signer) {
      const instance = new Contract(contractAddress, contractAbi, signer);
      setContract(instance);
    }
  }, [contractAddress, contractAbi, signer]);

  const approve = useCallback(
    async (spender: string, amount: number) => {
      try {
        if (contract) {
          // run the code here
          const txn = await contract.approve(spender, amount);
          await txn.wait();
          return txn.hash;
        }
      } catch (error) {
        console.log("error: ", error);
        throw new Error("Something went wrong approving USDC 😢");
      }
    },
    [contract]
  );

  return { usdcContract: contract, approve };
}

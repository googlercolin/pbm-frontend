import { useState, useEffect, useCallback } from "react";
import { useWeb3 } from "./useWeb3";
import { Contract } from "ethers";
import { useGetPBMToken } from "./useGetPBMToken";
import PBMLogicABI from "../ABIs/Logic.json";

export function useLogicContract() {
  const [contract, setContract] = useState<Contract | null>(null);
  const { account, ethersProvider, signer } = useWeb3();

  const { tokenLogicAddress: contractAddress } = useGetPBMToken();

  const contractAbi = PBMLogicABI;

  useEffect(() => {
    if (contractAddress && contractAbi && signer) {
      const instance = new Contract(contractAddress, contractAbi, signer);
      setContract(instance);
    }
  }, [contractAddress, contractAbi, signer]);

  const addToWhitelist = useCallback(
    async (address: string) => {
      try {
        if (contract) {
          // run the code here
          const txn = await contract.addToWhitelist(address);
          await txn.wait();
          return txn.hash;
        }
      } catch (error) {
        console.log("error: ", error);
        throw new Error("Something went wrong adding to whitelist 😢")
      }
    },
    [contract]
  );

  return { logicContract: contract, addToWhitelist };
}

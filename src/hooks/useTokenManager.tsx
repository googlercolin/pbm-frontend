import { useState, useEffect, useCallback } from "react";
import { useGetPBMToken } from "./useGetPBMToken";
import TokenManagerAbi from "../ABIs/TokenManagerABI.json";
import { useWeb3 } from "./useWeb3";
import { Contract } from "ethers";

export function useTokenManager() {
  const [contract, setContract] = useState<Contract | null>(null);
  const { account, ethersProvider, signer } = useWeb3();
  const { tokenManagerAddress: contractAddress } = useGetPBMToken();

  const contractAbi = TokenManagerAbi;

  useEffect(() => {
    if (contractAddress && contractAbi && signer) {
      const instance = new Contract(contractAddress, contractAbi, signer);
      setContract(instance);
    }
  }, [contractAddress, contractAbi, signer]);

  const createTokenType = useCallback(
    async (
      denomination: number,
      amount: number,
      tokenExpiry: number,
      creator: string,
      tokenURI: string
    ) => {
      try {
        if (contract) {
          // run the code here
          const id = await contract.createTokenType(
            denomination,
            amount,
            tokenExpiry,
            creator,
            tokenURI
          );
          return id;
        }
      } catch (error) {
        console.log("error: ", error);
        throw new Error("Something went wrong creating token type 😢")
      }
    },
    [contract]
  );

  return { tokenManagerContract: contract, createTokenType };
}

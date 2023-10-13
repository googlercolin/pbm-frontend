import { useState, useEffect, useCallback } from "react";
import { useGetPBMToken } from "./useGetPBMToken";
import TokenManagerAbi from "../ABIs/TokenManagerABI.json";
import { useWeb3 } from "./useWeb3";
import { Contract } from "ethers";

export interface TokenType {
  denomination: number;
  amount: number;
  expiryDate: number;
  creator: string;
  tokenURI: string;
}

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
          const txn = await contract.createTokenType(
            denomination,
            amount,
            tokenExpiry,
            creator,
            tokenURI
          );
          await txn.wait();
        }
      } catch (error) {
        console.log("error: ", error);
        throw new Error("Something went wrong creating token type 😢");
      }
    },
    [contract]
  );

  const getTokenTypes = useCallback(async () => {
    if (contract) {
      try {
        const tokenTypes: TokenType[] = await contract.getTokenTypes();
        return tokenTypes;
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }, [contract]);

  return { tokenManagerContract: contract, createTokenType, getTokenTypes };
}

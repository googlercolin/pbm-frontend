import { useEffect, useState, useCallback } from "react";
import { Contract, ethers, Signer } from "ethers";
// import FactoryABI from "../ABIs/FactoryABI.json";
import FactoryABI from "../ABIs/FactoryABI.json";
import { useWeb3 } from "./useWeb3";
import { factoryAddress } from "../constants/Constants";

// Define the contract parameters as a TypeScript interface
// interface ContractParams {
//   contractAddress: string;
//   contractAbi: any[]; // Replace 'any[]' with the actual ABI type
//   signerOrProvider: Signer | ethers.BrowserProvider | null | undefined;
// }

export function useFactoryContract() {
  const [contract, setContract] = useState<Contract | null>(null);
  const { account, ethersProvider, signer } = useWeb3();

  const contractAddress = factoryAddress;
  const contractAbi = FactoryABI;

  useEffect(() => {
    if (contractAddress && contractAbi && signer) {
      const instance = new Contract(contractAddress, contractAbi, signer);
      setContract(instance);
    }
  }, [contractAddress, contractAbi, signer]);

  const getPBMTokens = useCallback(async () => {
    try {
      if (contract) {
        // run the code here
        const pbmTokens: string[][] = await contract.getAllPBMTokens();
        // manager, wrapper, logic

      }
    } catch (error) {
      console.log("error: ", error);
    }
  }, [contract]);

  const getPBMToken = useCallback(
    async (id: number) => {
      try {
        if (contract) {
          // run the code here
          const pbmToken: string[] = await contract.getPBMToken(id);
          // manager, wrapper, logic
          return pbmToken;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [contract]
  );

  const deployPBMToken = useCallback(
    async (
      expiryDate: number,
      isTransferable: boolean,
      underlyingTokenAddress: string
    ) => {
      try {
        if (contract) {
          // run the code here
          const txn = await contract.deploy(
            expiryDate,
            isTransferable,
            underlyingTokenAddress
          );
          const receipt = await txn.wait();
          return receipt;
        }
      } catch (error) {
        console.log("error: ", error);
        throw new Error("Something went wrong while deploying 😢")
      }
    },
    [contract]
  );
  return {
    factoryContract: contract,
    getPBMTokens,
    getPBMToken,
    deployPBMToken,
  };
}

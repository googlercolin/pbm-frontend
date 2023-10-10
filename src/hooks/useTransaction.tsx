import { useEffect, useState, useCallback } from "react";
import {
  Contract,
  Signer,
  ContractTransaction,
} from "ethers";
import { useContract } from "./useContract";
import { useWeb3 } from "./useWeb3";

interface ContractParams {
  contractAddress: string;
  contractAbi: any[]; // Replace with the actual ABI type
  functionToCall: string; // The name of the function to call on the contract
}

export function useTransaction(contractParams: ContractParams) {
  const { contractAddress, contractAbi, functionToCall } = contractParams;

  const { account, ethersProvider, signer } = useWeb3();
  
  const contract = useContract({ // check this to the specific contract ?
    contractAddress,
    contractAbi,
    signerOrProvider: signer,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleTransaction = useCallback(
    async (...functionArgs: any[]) => {
      try {
        setLoading(true);
        setError(null);

        if (contract) {
          const transaction = await contract[functionToCall](...functionArgs);

          setTransactionHash(transaction.hash);

          // Wait for the transaction to be mined
          await transaction.wait();

          // Transaction successful
          console.log("Transaction mined:", transaction.hash);
        }
      } catch (error: any) {
        setError(error);
        console.error("Transaction failed:", error);
      } finally {
        setLoading(false);
      }
    },
    [contract, functionToCall]
  );

  return { handleTransaction, loading, error, transactionHash };
}

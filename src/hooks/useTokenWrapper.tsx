import { useEffect, useState, useCallback } from "react";
import { Contract, ethers, Signer } from "ethers";

// Define the contract parameters as a TypeScript interface
interface ContractParams {
  signerOrProvider: Signer | ethers.BrowserProvider | null | undefined;
}

export function useTokenWrapperContract({ signerOrProvider }: ContractParams) {
  const contractAddress = "";
  const contractAbi = ""; // import json

  const [contract, setContract] = useState<Contract | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  useEffect(() => {
    if (contractAddress && contractAbi && signerOrProvider) {
      const instance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signerOrProvider
      );
      setContract(instance);
    }
  }, [contractAddress, contractAbi, signerOrProvider]);

  const someTransaction = useCallback(async () => {
    if (contract) {
        // run the code here
    }
  }, [contract, signerOrProvider])

  return { someTransaction }
}

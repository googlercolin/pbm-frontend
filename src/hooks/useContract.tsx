import { useEffect, useState, useCallback } from "react";
import { Contract, ethers, Signer } from "ethers";

// Define the contract parameters as a TypeScript interface
interface ContractParams {
  contractAddress: string;
  contractAbi: any[]; // Replace 'any[]' with the actual ABI type
  signerOrProvider: Signer | ethers.BrowserProvider;
}

export function useContract({
  contractAddress,
  contractAbi,
  signerOrProvider,
}: ContractParams) {
  const [contract, setContract] = useState<Contract | null>(null);

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

  return contract;
}

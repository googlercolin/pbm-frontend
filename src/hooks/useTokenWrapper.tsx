import { useEffect, useState, useCallback } from "react";
import { Contract, ethers, Signer } from "ethers";
import { useWeb3 } from "./useWeb3";

// Define the contract parameters as a TypeScript interface
interface ContractParams {
  signerOrProvider: Signer | ethers.BrowserProvider | null | undefined;
}

export function useTokenWrapperContract({ signerOrProvider }: ContractParams) {
  const [contract, setContract] = useState<Contract | null>(null);
  const { account, ethersProvider, signer } = useWeb3();

  const contractAddress = "0x708e827AB49aA06B3b541F42f80489CA0bDA9385";
  const contractAbi = ""; // replace with the actual ABI

  useEffect(() => {
    if (contractAddress && contractAbi && ethersProvider) {
      const instance = new Contract(
        contractAddress,
        contractAbi,
        ethersProvider
      );
      setContract(instance);
    }
  }, [contractAddress, contractAbi, ethersProvider]);

  const someTransaction = useCallback(async () => {
    if (contract) {
        // run the code here
    }
  }, [contract, signerOrProvider])

  return { tokenWrapperContract: contract, someTransaction }
}

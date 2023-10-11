import { useEffect, useState, useCallback } from "react";
import { Contract, ethers, Signer } from "ethers";
import { useWeb3 } from "./useWeb3";
import TokenWrapperABI from "../ABIs/TokenWrapper.json";


// Define the contract parameters as a TypeScript interface
interface ContractParams {
  signerOrProvider: Signer | ethers.BrowserProvider | null | undefined;
}

export function useTokenWrapperContract({ signerOrProvider }: ContractParams) {
  const [contract, setContract] = useState<Contract | null>(null);
  const { account, ethersProvider, signer } = useWeb3();

  const contractAddress = "0xD13F9A5599Ba87DdeA389E3a6c9e1fC119f1634e";
  const contractAbi = TokenWrapperABI; // replace with the actual ABI

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

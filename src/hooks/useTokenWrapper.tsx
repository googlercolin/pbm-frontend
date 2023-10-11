import { useEffect, useState, useCallback } from "react";
import { Contract, ethers, Signer } from "ethers";
import { useWeb3 } from "./useWeb3";
import TokenWrapperABI from "../ABIs/TokenWrapper.json";
import { useGetPBMToken } from "./useGetPBMToken";

// Define the contract parameters as a TypeScript interface
interface ContractParams {
  signerOrProvider: Signer | ethers.BrowserProvider | null | undefined;
}

export function useTokenWrapperContract({ signerOrProvider }: ContractParams) {
  const [contract, setContract] = useState<Contract | null>(null);
  const { account, ethersProvider, signer } = useWeb3();

  const { tokenWrapperAddress: contractAddress } = useGetPBMToken();
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

  const mint = useCallback(
    async (account: string, id: number, amount: number) => {
      if (contract) {
        // run the code here
        try {
          const txn = await contract.mint(account, id, amount, "");
          await txn.wait();
          return txn.hash;
        } catch (error) {
          console.log("error: ", error);
        }
      }
    },
    [contract]
  );

  return { tokenWrapperContract: contract, mint };
}

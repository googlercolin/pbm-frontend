import { useEffect, useState, useCallback } from "react";
import { Contract, ethers, Signer, TransactionResponse, TransactionReceipt } from "ethers";
import { useWeb3 } from "./useWeb3";
import TokenWrapperABI from "../ABIs/TokenWrapper.json";
import { useGetPBMToken } from "./useGetPBMToken";


// Define the contract parameters as a TypeScript interface
interface ContractParams {
  signerOrProvider: Signer | ethers.BrowserProvider | null | undefined;
}

export function useTokenWrapperContract() {
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
          const txn: TransactionResponse = await contract.mint(account, id, amount, "");
          const receipt: TransactionReceipt | null = await txn.wait();
          return txn.hash;
        } catch (error) {
          console.log("error: ", error);
        }
      }
    },
    [contract]
  );

  const balanceOf = useCallback(
    async (account: string, id: number) => {
      if (contract) {
        try {
          const balance = await contract.balanceOf(account, id);
          return balance;
        } catch (error) {
          console.log("error: ", error);
        }
      }
    },
    [contract]
  );

  return { tokenWrapperContract: contract, mint, balanceOf};
}

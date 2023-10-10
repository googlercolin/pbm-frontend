import { useEffect, useState, useCallback } from "react";
import { Contract, ethers, Signer } from "ethers";
// import FactoryABI from "../ABIs/FactoryABI.json";
import FactoryABI from "../ABIs/FactoryABI.json";
import { useWeb3 } from "./useWeb3";

// Define the contract parameters as a TypeScript interface
// interface ContractParams {
//   contractAddress: string;
//   contractAbi: any[]; // Replace 'any[]' with the actual ABI type
//   signerOrProvider: Signer | ethers.BrowserProvider | null | undefined;
// }

export function useFactoryContract() {
  const [contract, setContract] = useState<Contract | null>(null);
  const { account, ethersProvider, signer } = useWeb3();

  const contractAddress = "0x708e827AB49aA06B3b541F42f80489CA0bDA9385";
  const contractAbi = FactoryABI;

  useEffect(() => {
    if (contractAddress && contractAbi && signer) {
      const instance = new Contract(
        contractAddress,
        contractAbi,
        signer
      );
      console.log("instance: ", instance)
      setContract(instance);
    }
  }, [contractAddress, contractAbi, signer]);

  const someTransaction = useCallback(async () => {
    console.log("someTransaction");
    console.log("contract: ", contract);
    console.log("signer: ", signer);
    try {
        if (contract) {
            // run the code here
            const pbmTokens = await contract.getPBMToken(0);
          }
    } catch (error) {
        console.log("error: ", error)
    }
    
  }, [contract, signer]);

  return someTransaction;
}

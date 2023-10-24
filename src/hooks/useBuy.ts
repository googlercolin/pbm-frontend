import React, { useCallback, useEffect, useState } from "react";
import { useTokenWrapperContract } from "./useTokenWrapper";
import { useFactoryContract } from "./useFactoryContract";
import { useWeb3 } from "./useWeb3";
import { useTokenManager } from "./useTokenManager";
import { TokenType } from "./useTokenManager";
import { merchantAddress } from "../constants/Constants";
import { useGetPBMToken } from "./useGetPBMToken";

export function useBuy() {
  const { balanceOfBatch, safeBatchTransferFrom, setApprovalForAll } =
    useTokenWrapperContract();
  const { getTokenTypes } = useTokenManager();
  const { account } = useWeb3();
  const { tokenWrapperAddress } = useGetPBMToken();

  const buy = useCallback(
    async (price: number, tokenIds: number[], tokenAmounts: number[]) => {
      if (account) {
        if (tokenWrapperAddress) {
          try {
            await setApprovalForAll(tokenWrapperAddress, true); //Approve token wrapper contract to transfer 1155s
            const txnHash = await safeBatchTransferFrom(
              account.address,
              merchantAddress,
              tokenIds,
              tokenAmounts,
              "0x"
            );
            return txnHash;
          } catch (e) {
            console.log("error", e);
            throw new Error("Something went wrong with your purchase 😢");
          }
        }
      } else {
        console.log("error: ", "Not enough money");
      }
    },
    [account, safeBatchTransferFrom, setApprovalForAll, tokenWrapperAddress]
  );

  return { buy };
}

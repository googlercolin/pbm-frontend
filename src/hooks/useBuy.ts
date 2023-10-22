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
    async (price: number) => {
      // We'll first get the tokens owned by the factory
      const tokens: TokenType[] | undefined = await getTokenTypes();
      // Then get the balances of those tokens owned by the user
      if (account && tokens) {
        // make an array of length tokens.length with each element being the index of that element
        const indices: number[] = Array.from(Array(tokens.length).keys());

        const balances: number[] = await balanceOfBatch(
          account.address,
          indices
        );

        let totalValue: number = 0;
        tokens.forEach((token, i)=>{
          totalValue += Number(token.denomination) / 10**6 * Number(balances[i])
        })

        // If the user has enough money, buy the token
        if (totalValue < price) {
          // First, create an array of the number of tokens needed to make up the price
          const tokenIds: number[] = [];
          const tokenAmounts: number[] = [];
          let remainingPrice = price;

          // Loop through tokens from highest denomination to lowest
          for (let i = tokens.length - 1; i >= 0; i--) {
            if (remainingPrice <= 0) {break};
            
            let balance = Number(balances[i]);
            // If the token is worth less than the remaining price, add it to the array
            tokenIds.push(i);
            // If the token is worth less than the remaining price, add as many as possible to the array
            while (balance > 0 && Number(tokens[i].denomination)/10**6 <= remainingPrice) {
              remainingPrice -= (Number(tokens[i].denomination)/10**6);
              balance -= 1;
            }
            // Add the number of tokens used to the array
            tokenAmounts.push(Number(balances[i]) - balance);
          }
          if (tokenWrapperAddress) {
            await setApprovalForAll(tokenWrapperAddress, true); //Approve token wrapper contract to transfer 1155s
            const txnHash = await safeBatchTransferFrom(
              account.address,
              merchantAddress,
              tokenIds,
              tokenAmounts,
              "0x"
            );

            return txnHash;
          }
        }
      }
      else {
        console.log("error: ", "Not enough money");
      }
    },
    [account, safeBatchTransferFrom, setApprovalForAll, tokenWrapperAddress]
  );

  return { buy };
}

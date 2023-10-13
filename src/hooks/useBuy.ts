import React, { useCallback, useEffect, useState } from "react";
import { useTokenWrapperContract } from "./useTokenWrapper";
import { useFactoryContract } from "./useFactoryContract";
import { useWeb3 } from "./useWeb3";
import { useTokenManager } from "./useTokenManager";
import { TokenType } from "./useTokenManager";
import { mattsAddress } from "../constants/Constants";

export function useBuy() {
  const { balanceOfBatch, safeBatchTransferFrom } = useTokenWrapperContract();
  const { getTokenTypes } = useTokenManager();
  const { account } = useWeb3();

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

        // Get total value owned by balances * token.denomination
        const totalValue = indices
          .map((i) => {
            return balances[i] * tokens[i].denomination;
          })
          .reduce((a, b) => a + b, 0);

        // If the user has enough money, buy the token
        if (totalValue >= price) {
          // First, create an array of the number of tokens needed to make up the price
          const tokenIds: number[] = [];
          const tokenAmounts: number[] = [];
          let remainingPrice = price;
          // Loop through tokens from highest denomination to lowest
          for (let i = tokens.length - 1; i >= 0; i--) {
            let balance = balances[i];
            // If the token is worth more than the remaining price, add it to the array
            if (tokens[i].denomination <= remainingPrice) {
              tokenIds.push(i);
              remainingPrice -= tokens[i].denomination;
              balance -= 1;
            }

            // If the token is worth less than the remaining price, add as many as possible to the array
            while (balance > 0 && tokens[i].denomination <= remainingPrice) {
              remainingPrice -= tokens[i].denomination;
              balance -= 1;
            }

            // Add the number of tokens used to the array
            tokenAmounts.push(balances[i] - balance);

            

            await safeBatchTransferFrom(
              account.address,
              mattsAddress, // Matt is the merchant
              tokenIds,
              tokenAmounts,
              "0x"
            );
          }
        }
      }
      // If the user doesn't have enough money, throw an error
      else {
        throw new Error("Not enough money");
      }
    },
    [account, safeBatchTransferFrom]
  );

  return { buy };
}

import React, { useEffect, useState } from "react";
import VoucherRow from "../components/VoucherRow";
import { useTokenWrapperContract } from "../hooks/useTokenWrapper";
import { useTokenManager } from "../hooks/useTokenManager";
import { useWeb3 } from "../hooks/useWeb3";

interface VoucherRowProps {
  value: number;
  amount: number;
  expiry: string;
}

interface Tokens {
  category: string;
  availTokens: VoucherRowProps[];
}

export default function TokenPage() {
  const { account } = useWeb3();
  const balanceOfBatch = useTokenWrapperContract().balanceOfBatch;
  const getTokenTypes = useTokenManager().getTokenTypes;
  const [tokens, setTokens] = useState<Tokens[]>([]);

  const compare = (a: any, b: any) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      const tokens = await getTokenTypes();
      const tokenIDs = tokens?.map((token, i) => i);
      if (account && tokenIDs) {
        const balances = await balanceOfBatch(account.address, tokenIDs);
        const types = await getTokenTypes();
        const updatedTokens: Tokens[] = [];
        if (types) {
          for (let i = 0; i < types.length; i++) {
            const denomination = types[i].denomination;
            const expiryDate = types[i].expiryDate;
            const balance = balances[i];

            // Create a new token object
            const token: VoucherRowProps = {
              value: Number(denomination) / 1000000,
              amount: Number(balance),
              expiry: new Date(Number(expiryDate) * 1000).toDateString(),
            };

            // Find or create the corresponding category
            const category = "Health and Wellness";
            let categoryToken = updatedTokens.find(
              (t) => t.category === category
            );

            if (!categoryToken) {
              categoryToken = {
                category,
                availTokens: [],
              };
              updatedTokens.push(categoryToken);
            }

            // Add the token to the category
            categoryToken.availTokens.push(token);
          }
        }
        updatedTokens[0].availTokens.sort(compare);
        setTokens(updatedTokens);
      }
    };

    fetchData();
  }, [balanceOfBatch, getTokenTypes, account]);

  // Hardcoded category
  const hardcodedCategory: Tokens = {
    category: "Food & Groceries",
    availTokens: [
      {
        value: 1,
        amount: 5,
        expiry: "Sun Dec 09 2023",
      },
      {
        value: 2,
        amount: 2,
        expiry: "Sun Dec 09 2023",
      },
      {
        value: 5,
        amount: 10,
        expiry: "Sun Dec 09 2023",
      },
    ],
  };

  // Check if the hardcoded category already exists before adding it
  const categoryExists = tokens.find((t) => t.category === "Food & Groceries");
  if (!categoryExists && tokens) {
    tokens.push(hardcodedCategory);
  }

  return (
    <div className="flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold">My Tokens</h1>
      <div className="mt-4">Take a look at all your available tokens here.</div>
      <div className="w-full">
        {tokens.map((token) => (
          <div key={token.category}>
            <div className="divider" />
            <h1 className="text-2xl font-bold">{token.category}</h1>
            <VoucherRow tokens={token.availTokens} />
          </div>
        ))}
      </div>
    </div>
  );
}

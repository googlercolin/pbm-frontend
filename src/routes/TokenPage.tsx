import React from "react";
import VoucherRow from "../components/VoucherRow";

interface VoucherRowProps {
  value: string;
  amount: number;
  expiry: string;
}

interface Tokens {
  category: string;
  availTokens: VoucherRowProps[];
}

export default function TokenPage() {
  const tokens: Tokens[] = [
    {
      category: "Food & Groceries",
      availTokens: [
        {
          value: "$1",
          amount: 5,
          expiry: "30 Oct 2023",
        },
        {
          value: "$2",
          amount: 2,
          expiry: "30 Oct 2023",
        },
        {
          value: "$5",
          amount: 10,
          expiry: "30 Oct 2023",
        },
      ],
    },
    {
      category: "Health and Wellness",
      availTokens: [
        {
          value: "$1",
          amount: 5,
          expiry: "30 Nov 2023",
        },
        {
          value: "$2",
          amount: 2,
          expiry: "30 Nov 2023",
        },
        {
          value: "$5",
          amount: 10,
          expiry: "30 Nov 2023",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold">My Tokens</h1>
      <div className="mt-4">Take a look at all your available tokens here.</div>

      <div className="w-full">
        {tokens.map((token) => (
          <>
            <div className="divider" />
            <h1 className="text-2xl font-bold">{token.category}</h1>
            <VoucherRow tokens={token.availTokens} />
          </>
        ))}
      </div>
    </div>
  );
}

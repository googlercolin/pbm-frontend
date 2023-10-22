import React from "react";
import Voucher from "./Voucher";

interface VoucherRowProps {
  value: number;
  amount: number;
  expiry: string;
}

export default function VoucherRow({ tokens }: { tokens: VoucherRowProps[] }) {
  return (
    <div className="grid grid-cols-4 justify-center w-9/10">
      {tokens.map((token) => (
        <Voucher key={token.value} {...token} />
      ))}
    </div>
  );
}

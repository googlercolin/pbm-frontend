import React from "react";
import Voucher from "./Voucher";

interface VoucherRowProps {
  value: string;
  amount: number;
  expiry: string;
}

export default function VoucherRow({tokens}: {tokens: VoucherRowProps[]}) {
  return (
    <div className="flex justify-center w-9/10">
      {tokens.map((token) => (
        <Voucher key={token.value} {...token} />
      ))}
    </div>
  );
}

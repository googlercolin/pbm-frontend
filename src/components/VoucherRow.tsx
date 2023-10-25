import React from "react";
import Voucher from "./Voucher";

interface VoucherRowProps {
  value: number;
  amount: number;
  expiry: string;
}

export default function VoucherRow({ tokens }: { tokens: VoucherRowProps[] }) {
  return (
    <div className='flex flex-wrap m-12 justify-center'>
      {tokens.map((token) => (
        <Voucher key={token.value} {...token} />
      ))}
    </div>
  );
}
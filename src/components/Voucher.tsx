import React from "react";

interface VoucherRow {
  value: number;
  amount: number;
  expiry: string;
}

export default function Voucher({ value, amount, expiry }: VoucherRow) {
  return (
    <div className="indicator m-8">
      <span className="indicator-item badge badge-secondary p-4">{amount}</span>
      <div className="grid p-8 bg-base-300 place-items-center rounded-xl">
        <div className="text-4xl mb-4 font-bold">${value}</div>
        Expires on: {expiry}
      </div>
    </div>
  );
}

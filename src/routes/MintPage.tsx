import { useEffect, useState } from "react";
import { Button } from "react-daisyui";

export default function MintPage() {
  const tokenTypes = [
    {
      id: 0,
      value: "$1",
      max: 10,
    },
    {
      id: 1,
      value: "$2",
      max: 2,
    },
    {
      id: 2,
      value: "$5",
      max: 5,
    },
  ];

  const [selectedTokenType, setSelectedTokenType] = useState(tokenTypes[0]);
  const [amount, setAmount] = useState(1);
  const [recipientAddress, setRecipientAddress] = useState("");

  const selectTokenHandler = (e: any) => {
    const id = tokenTypes.filter(
      (tokenType) => tokenType.value === e.target.value
    )[0].id;
    setSelectedTokenType(tokenTypes[id]);
  };

  useEffect(() => {
    setAmount(0);
  }, [selectedTokenType]);

  return (
    <div className="flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold">Mint</h1>
      <div className="mt-4">Mint tokens for deployed PBMs here.</div>
      <div className="flex items-center justify-center mt-12">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Select Token</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedTokenType.value}
            onChange={selectTokenHandler}
          >
            <option disabled>Pick one</option>
            {tokenTypes.map((tokenType) => (
              <option key={tokenType.value}>{tokenType.value}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs ml-8">
          <label className="label">
            <span className="label-text">Recipient's Address</span>
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={recipientAddress}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>
        <div className="form-control ml-8">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="number"
            max={selectedTokenType.max}
            placeholder="1"
            value={amount}
            className="input input-bordered w-full"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
      </div>
      <Button className="mt-8">Mint</Button>
    </div>
  );
}

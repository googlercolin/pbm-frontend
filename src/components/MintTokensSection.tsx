import { useState, useEffect } from "react";

export default function MintTokensSection() {
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
  const [amount, setAmount] = useState<number | string>("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const selectTokenHandler = (e: any) => {
    const id = tokenTypes.filter(
      (tokenType) => tokenType.value === e.target.value
    )[0].id;
    setSelectedTokenType(tokenTypes[id]);
  };

  useEffect(() => {
    console.log("elooesodfsdf");
    setAmount("");
  }, [selectedTokenType]);

  return (
    <section className="pt-8 flex flex-col">
      <h1 className="text-2xl font-bold">Step 4: Mint Tokens</h1>
      <h3 className="text-lg">Mint the tokens</h3>

      <div className="form-control w-full">
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
      <div className="form-control">
        <label className="label">
          <span className="label-text">Recipient's Address</span>
        </label>
        <input
          type="text"
          placeholder="0x..."
          value={recipientAddress}
          className="input input-bordered w-full"
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
      </div>
      <div className="form-control">
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
      <button className="mt-4 btn">Create token type</button>
    </section>
  );
}

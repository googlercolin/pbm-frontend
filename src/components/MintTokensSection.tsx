import { useState, useEffect } from "react";
import { useTokenManager } from "../hooks/useTokenManager";

interface TokenType {
  id: number;
  value: number;
  max: number;
  selected: boolean;
}

export default function MintTokensSection() {
  // const tokenTypes = [
  //   {
  //     id: 0,
  //     value: "$1",
  //     max: 10,
  //   },
  //   {
  //     id: 1,
  //     value: "$2",
  //     max: 2,
  //   },
  //   {
  //     id: 2,
  //     value: "$5",
  //     max: 5,
  //   },
  // ];

  // const [selectedTokenID, setSelectedTokenID] = useState(0);
  const [amount, setAmount] = useState<number | string>("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenTypes, setTokenTypes] = useState<any>([]);

  const { tokenManagerContract, createTokenType, getTokenTypes } =
    useTokenManager();

  useEffect(() => {
    const fetchTokenTypes = async () => {
      const res = await getTokenTypes();
      const temp: TokenType[] = [];
      if (res) {
        res.forEach((tokenType: any, index: number) => {
          temp.push({
            id: index,
            value: Number(tokenType[0]),
            max: Number(tokenType[1]),
            selected: false,
          });
        });
        setTokenTypes(temp);
      }
    };
    fetchTokenTypes();
  }, [getTokenTypes]);

  const selectTokenHandler = (e: any) => {
    const temp = tokenTypes.map((tokenType: any) => {
      if (tokenType.id === e.target.value) {
        return { ...tokenType, selected: true };
      } else {
        return { ...tokenType, selected: false };
      }
    });
    setTokenTypes(temp);
  };

  useEffect(() => {
    setAmount("");
  }, [tokenTypes]);

  return (
    <section className="pt-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Step 4: Mint Tokens</h1>
      <h3 className="text-lg">Mint and distribute PBMs to recipients.</h3>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Select Token</span>
        </label>
        <select
          className="select select-bordered"
          value={
            tokenTypes.filter((tokenType: any) => tokenType.selected).value
          }
          onChange={selectTokenHandler}
        >
          <option disabled>Pick one</option>
          {tokenTypes.map((tokenType: any) => (
            <option key={tokenType.id}>${tokenType.value}</option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Recipient's Address</span>
        </label>
        <input
          type="text"
          placeholder="eg. 0x123124322"
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
          placeholder="eg. 123"
          value={amount}
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>
      <button className="btn">Mint Tokens</button>
    </section>
  );
}

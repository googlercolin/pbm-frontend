import { useState, useEffect } from "react";
import { useTokenManager } from "../hooks/useTokenManager";
import { useTokenWrapperContract } from "../hooks/useTokenWrapper";

interface TokenType {
  id: number;
  value: number;
  max: number;
  selected: boolean;
}

export default function MintTokensSection() {
  const [amount, setAmount] = useState<number | string>("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenTypes, setTokenTypes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { getTokenTypes } = useTokenManager();
  const { mint } = useTokenWrapperContract();
  
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
    const fetchTokenTypes = async () => {
      const res = await getTokenTypes();
      const temp: TokenType[] = [];
      if (res) {
        res.forEach((tokenType: any, index: number) => {
          temp.push({
            id: index,
            value: Number(tokenType[0]) / 10 ** 6,
            max: Number(tokenType[1]),
            selected: index === 0 ? true : false,
          });
        });
        temp.sort(compare);
        setTokenTypes(temp);
      }
    };
    fetchTokenTypes();
  }, [getTokenTypes]);

  const selectTokenHandler = (e: any) => {
    const temp = tokenTypes.map((tokenType: any) => {
      if (tokenType.value === Number(e.target.value.slice(1))) {
        return { ...tokenType, selected: true };
      } else {
        return { ...tokenType, selected: false };
      }
    });
    setTokenTypes(temp);
  };

  const mintTokens = async () => {
    setLoading(true);
    try {
      const id = tokenTypes.filter((tokenType: any) => tokenType.selected)[0]
        .id;
      await mint(recipientAddress, id, Number(amount));
      setLoading(false);
      setSuccess(true);
    } catch (e) {
      setLoading(false);
      setError(String(e));
    }
  };

  useEffect(() => {
    const successTimeout = setTimeout(() => setSuccess(false), 3000);
    const errorTimeout = setTimeout(() => setError(""), 3000);
    return () => {
      clearTimeout(successTimeout);
      clearTimeout(errorTimeout);
    };
  }, [success, error]);

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
          <span className="label-text">
            Max: {tokenTypes.filter((token: any) => token.selected)[0]?.max}
          </span>
        </label>
        <input
          type="number"
          placeholder="eg. 123"
          value={amount}
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        {tokenTypes.filter((token: any) => token.selected)[0]?.max < amount && (
          <label className="label">
            <span className="label-text text-error">Max amount exceeded</span>
          </label>
        )}
      </div>
      <button
        disabled={
          loading ||
          Number(amount) < 1 ||
          recipientAddress === "" ||
          tokenTypes.filter((token: any) => token.selected)[0].max < amount
        }
        onClick={mintTokens}
        className="btn"
      >
        Mint Tokens
      </button>
      {success && (
        <div className="toast toast-center">
          <div className="alert alert-success flex">
            <span>Tokens successfully minted 😄</span>
          </div>
        </div>
      )}
      {error && (
        <div className="toast toast-center">
          <div className="alert alert-error text-white flex">
            <span>{error}</span>
          </div>
        </div>
      )}
      {loading && (
        <div className="toast toast-center">
          <div className="alert alert-info text-white flex">
            <span>Minting tokens</span>
            <span className="loading loading-dots loading-md"></span>
          </div>
        </div>
      )}
    </section>
  );
}

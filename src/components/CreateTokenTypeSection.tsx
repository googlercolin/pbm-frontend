import { useState, useEffect } from "react";
import { useTokenManager } from "../hooks/useTokenManager";
import { useUsdcContract } from "../hooks/useUsdcContract";

export default function CreateTokenTypeSection() {
  const [denomination, setDenomination] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { tokenManagerContract, createTokenType } = useTokenManager();
  const { approve } = useUsdcContract();

  const handleDenominationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDenomination(parseInt(event.target.value));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value).toISOString().slice(0, 10));
  };

  const handleSubmit = async () => {
    const totalAmount = denomination * amount * 10 ** 6;
    setLoading(true);
    try {
      const tokenManagerAddress = await tokenManagerContract?.getAddress();
      if (tokenManagerAddress) {
        await approve(tokenManagerAddress, totalAmount);
        await createTokenType(
          denomination * 10 ** 6,
          amount,
          Date.parse(date) / 1000,
          "",
          ""
        );
        setSuccess(true);
      } else {
        setError("Underlying address not found 😢");
      }
      setLoading(false);
    } catch (e) {
      setError(String(e));
      setLoading(false);
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

  return (
    <section className="pt-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Step 2: Create Token Type</h1>
      <h3 className="text-lg">Create new token denominations.</h3>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Token Denomination</span>
        </label>
        <input
          value={denomination}
          type="number"
          placeholder="eg. 5"
          min={1}
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={handleDenominationChange}
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Amount</span>
        </label>
        <input
          value={amount}
          type="number"
          placeholder="eg. 5123"
          min={1}
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={handleAmountChange}
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Token Expiry Date</span>
        </label>
        <input
          value={date}
          min={new Date().toISOString().slice(0, 10)}
          type="date"
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={handleDateChange}
        />
      </div>
      <button
        disabled={loading || amount < 1 || denomination < 1}
        className="btn"
        onClick={handleSubmit}
      >
        Create Token Type
      </button>
      {success && (
        <div className="toast toast-center">
          <div className="alert alert-success flex">
            <span>Token type created successfully 😄</span>
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
            <span>Creating token type</span>
            <span className="loading loading-dots loading-md"></span>
          </div>
        </div>
      )}
    </section>
  );
}

import { useState } from "react";

export default function CreateTokenTypeSection() {
  const [denomination, setDenomination] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

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

  const handleSubmit = () => {
    console.log({
      denomination,
      amount,
      date,
    })
  }

  return (
    <section className="pt-8 flex flex-col">
      <h1 className="text-2xl font-bold">Step 2: Create token type</h1>
      <h3 className="text-lg my-4">Create a Token Type</h3>

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
      <button className="mt-4 btn" onClick={handleSubmit}>Create Token Type</button>
    </section>
  );
}

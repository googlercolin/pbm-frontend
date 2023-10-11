import React from "react";

export default function CreateTokenTypeSection() {
  return (
    <section className="pt-8 flex flex-col">
      <h1 className="text-2xl font-bold">Step 2: Create token type</h1>
      <h3 className="text-lg">Create a token type</h3>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Denomination of the token</span>
        </label>
        <input
          type="number"
          placeholder="eg. 5"
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Amount of tokens to be minted</span>
        </label>
        <input
          type="number"
          placeholder="eg. 5123"
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Expiry date of tokens</span>
        </label>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </div>
      <button className="mt-4 btn">Create token type</button>
    </section>
  );
}

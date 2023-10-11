import React from "react";

export default function WhitelistAddressSection() {
  return (
    <section className="pt-8 flex flex-col">
      <h1 className="text-2xl font-bold">Step 3: Whitelist Addresses</h1>
      <h3 className="text-lg">Enter the addresses to be whitelisted </h3>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Whitelist address</span>
        </label>
        <input
          type="text"
          placeholder="eg. 0x123124322"
          className="input input-bordered w-full"
        />
      </div>
      <button className="mt-4 btn">Create token type</button>
    </section>
  );
}

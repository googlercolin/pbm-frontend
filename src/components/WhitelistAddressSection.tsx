import React, { useState } from "react";

export default function WhitelistAddressSection() {
  const [address, setAddress] = useState<string>("");

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const onSubmit = () => {
    console.log({
      address,
    });
  };
  return (
    <section className="pt-8 flex flex-col">
      <h1 className="text-2xl font-bold">Step 3: Whitelist Addresses</h1>
      <h3 className="text-lg">
        Add addresses that are allowed to receive PBMs as payment.
      </h3>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Whitelist Address</span>
        </label>
        <input
          value={address}
          onChange={handleAddressChange}
          type="text"
          placeholder="eg. 0x123124322"
          className="input input-bordered w-full"
        />
      </div>
      <button onClick={onSubmit} className="mt-4 btn">
        Whitelist Address
      </button>
    </section>
  );
}

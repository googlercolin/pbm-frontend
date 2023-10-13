import React, { useState, useEffect } from "react";
import { useLogicContract } from "../hooks/useLogicContract";

export default function WhitelistAddressSection() {
  const [address, setAddress] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { addToWhitelist } = useLogicContract();

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await addToWhitelist(address);
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

  return (
    <section className="pt-8 flex flex-col gap-4">
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
      <button
        disabled={loading || address === ""}
        onClick={onSubmit}
        className="btn"
      >
        Whitelist Address
      </button>
      {success && (
        <div className="toast toast-center">
          <div className="alert alert-success flex">
            <span>Address successfully whitelisted 😄</span>
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
            <span>Whitelisting address</span>
            <span className="loading loading-dots loading-md"></span>
          </div>
        </div>
      )}
    </section>
  );
}

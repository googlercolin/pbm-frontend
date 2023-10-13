import React, { useState, useEffect } from "react";
import { Button, Input } from "react-daisyui";
import { useFactoryContract } from "../hooks/useFactoryContract";

function PBMDeploymentSection() {
  const [expiryDate, setExpiryDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [isTransferable, setIsTransferable] = useState<boolean>(true);
  const [underlyingTokenAddress, setUnderlyingTokenAddress] = useState<string>(
    "0x86378fFB1A704B9037A20A8066BEC948deb1DA04"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { deployPBMToken } = useFactoryContract();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deployPBMToken(
        Date.parse(expiryDate) / 1000,
        isTransferable,
        underlyingTokenAddress
      );
      setSuccess(true);
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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Step 1: Deploy Contract</h1>
      <h3 className="text-lg">Create and deploy a new PBM.</h3>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Expiry Date</span>
        </label>
        <Input
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(event) => setExpiryDate(event.target.value)}
          value={expiryDate}
        />
        <label className="label">
          <span className="label-text">Underlying Token Address</span>
        </label>
        <Input
          type="text"
          placeholder="eg. 0x123124322"
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(event) => setUnderlyingTokenAddress(event.target.value)}
          value={underlyingTokenAddress}
        />
        <label className="label cursor-pointer mt-4">
          <span className="label-text">Is transferable?</span>
          <Input
            type="checkbox"
            className="toggle toggle-accent"
            checked={isTransferable}
            onChange={(event) => setIsTransferable(!isTransferable)}
          />
        </label>
      </div>
      <Button
        disabled={loading || underlyingTokenAddress === "" || !expiryDate}
        onClick={submit}
      >
        Deploy contract
      </Button>

      {success && (
        <div className="toast toast-center">
          <div className="alert alert-success flex">
            <span>PBM successfully deployed 😄</span>
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
            <span>Deploying PBM</span>
            <span className="loading loading-dots loading-md"></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PBMDeploymentSection;

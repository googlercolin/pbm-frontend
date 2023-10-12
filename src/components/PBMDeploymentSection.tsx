import React, { useState } from "react";
import { Button, Input } from "react-daisyui";
import { useFactoryContract } from "../hooks/useFactoryContract";

interface DenominationField {
  denomination: string;
  amount: string;
}

function PBMDeploymentSection() {
  const [denominationFields, setDenominationFields] = useState<
    DenominationField[]
  >([{ denomination: "", amount: "" }]);

  const [expiryDate, setExpiryDate] = useState<string>("");
  const [isTransferable, setIsTransferable] = useState<boolean>(true);
  const [underlyingTokenAddress, setUnderlyingTokenAddress] = useState<string>(
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"
  );
  const [whitelistAddressFields, setWhitelistAddressFields] = useState<
    string[]
  >([""]);
  const { deployPBMToken } = useFactoryContract();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = await deployPBMToken(
      Date.parse(expiryDate) / 1000,
      isTransferable,
      underlyingTokenAddress
    );
    
    // Show completion message / error message
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Step 1: Deploy contract</h1>
      <h3 className="text-lg">Deploy the contract</h3>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Expiry Date</span>
        </label>
        <Input
          type="date"
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(event) => setExpiryDate(event.target.value)}
          value={expiryDate}
        />
        <label className="label">
          <span className="label-text">Underlying token address</span>
        </label>
        <Input
          type="text"
          placeholder="eg. 0x123124322"
          className="input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(event) => setUnderlyingTokenAddress(event.target.value)}
          value={underlyingTokenAddress}
        />
        <label className="label cursor-pointer">
          <span className="label-text">Is transferable?</span>
          <Input
            type='checkbox'
            className='toggle toggle-accent'
            checked={isTransferable}
            onChange={(event) => setIsTransferable(!isTransferable)}
          />
        </label>
      </div>
      <Button onClick={submit}>Deploy contract</Button>
    </div>
  );
}

export default PBMDeploymentSection;

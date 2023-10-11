import React, { useState } from "react";
import { Button, Input } from "react-daisyui";

interface DenominationField {
  denomination: string;
  amount: string;
}

function PBMDeploymentForm() {
  const [denominationFields, setDenominationFields] = useState<
    DenominationField[]
  >([{ denomination: "", amount: "" }]);

  const [expiryDate, setExpiryDate] = useState<string>("");
  const [isTransferable, setIsTransferable] = useState<boolean>(true);
  const [underlyingTokenAddress, setUnderlyingTokenAddress] = useState<string>("");
  const [whitelistAddresses, setWhitelistAddresses] = useState<string>("");
  const [whitelistAddressFields, setWhitelistAddressFields] = useState<
    string[]
    >([""]);

  const handleDenominationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const data = [...denominationFields];
    data[index][event.target.name as "denomination" | "amount"] =
      event.target.value;
    setDenominationFields(data);
  };

  const handleWhitelistAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const data = [...whitelistAddressFields];
    data[index] = event.target.value;
    setWhitelistAddressFields(data);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      denominationFields,
      expiryDate: Date.parse(expiryDate) / 1000,
      whitelistAddressFields,
      isTransferable,
      underlyingTokenAddress,
    });
  };

  const addDenominationFields = () => {
    const object = {
      denomination: "",
      amount: "",
    };

    setDenominationFields([...denominationFields, object]);
  };

  const removeDenominationFields = (index: number) => {
    const data = [...denominationFields];
    data.splice(index, 1);
    setDenominationFields(data);
  };

  const addWhitelistAddress = () => {
    setWhitelistAddressFields([...whitelistAddressFields, ""]);
  };

  const removeWhitelistAddress = (index: number) => {
    const data = [...whitelistAddressFields];
    data.splice(index, 1);
    setWhitelistAddressFields(data);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Step 1: Deploy contract</h1>
      <h3 className='text-lg'>Deploy the contract</h3>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Expiry Date</span>
        </label>
        <Input
          type='date'
          className='input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          onChange={(event) => setExpiryDate(event.target.value)}
          value={expiryDate}
        />
        <label className='label'>
          <span className='label-text'>Underlying token address</span>
        </label>
        <Input
          type='text'
          placeholder='eg. 0x123124322'
          className='input input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          onChange={(event) => setUnderlyingTokenAddress(event.target.value)}
          value={underlyingTokenAddress}
        />
        <label className='label cursor-pointer'>
          <span className='label-text'>Is transferable?</span>
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

export default PBMDeploymentForm;

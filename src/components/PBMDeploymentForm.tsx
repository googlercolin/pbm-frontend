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
      expiryDate,
      whitelistAddressFields,
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
    <div className="flex flex-col items-center">
      <h1>PBM Deployment Form</h1>
      <form onSubmit={submit}>
        {denominationFields.map((form, index) => {
          return (
            <div key={index}>
              <label>Denominations </label>
              <Input
                name="denomination"
                placeholder="1"
                onChange={(event) => handleDenominationChange(event, index)}
                value={form.denomination}
              />
              <label>Amount </label>
              <Input
                name="amount"
                placeholder="1000"
                onChange={(event) => handleDenominationChange(event, index)}
                value={form.amount}
              />
              <Button onClick={() => removeDenominationFields(index)}>
                Remove
              </Button>
            </div>
          );
        })}
        <Button onClick={addDenominationFields}>Add More Denominations</Button>
        <br />
        <div>
          {whitelistAddressFields.map((address, index) => (
            <div key={index}>
              <label>Whitelist Address {index + 1} </label>
              <Input
                name="whitelistAddress"
                placeholder="0x07865c6E87B9F70255377e024ace6630C1Eaa37F"
                onChange={(event) => handleWhitelistAddressChange(event, index)}
                value={address}
              />
              <Button onClick={() => removeWhitelistAddress(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addWhitelistAddress}>Add Whitelist Address</Button>
          <div>
            <label>Expiry Date </label>
            <Input
              name="expiryDate"
              placeholder="31/12/2023"
              onChange={(event) => setExpiryDate(event.target.value)}
              value={expiryDate}
            />
          </div>
        </div>
      </form>
      <Button onClick={submit}>Submit</Button>
    </div>
  );
}

export default PBMDeploymentForm;

import React from "react";
import PBMDeploymentForm from "../components/PBMDeploymentForm";
import CreateTokenTypeSection from "../components/CreateTokenTypeSection";
import WhitelistAddressSection from "../components/WhitelistAddressSection";
import MintTokensSection from "../components/MintTokensSection";

export default function DeployPage() {
  return (
    <div className="max-w-lg mx-auto my-8">
      <PBMDeploymentForm />
      <CreateTokenTypeSection />
      <WhitelistAddressSection />
      <MintTokensSection />
    </div>
  );
}

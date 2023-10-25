import React, { useEffect, useState } from "react";
import { useFactoryContract } from "./useFactoryContract";

export function useGetPBMToken() {
  const { getPBMToken } = useFactoryContract();
  const [tokenManagerAddress, setTokenManagerAddress] = useState<string>();
  const [tokenWrapperAddress, setTokenWrapperAddress] = useState<string>();
  const [tokenLogicAddress, setTokenLogicAddress] = useState<string>();

  useEffect(() => {
    const getPBMTokenRequest = async () => {
      const pbmTokenAddresses = await getPBMToken(0); // hardcoded id to 0 for now
      const [tokenManagerAddr, tokenWrapperAddr, tokenLogicAddr] =
        pbmTokenAddresses ?? [];
      setTokenManagerAddress(tokenManagerAddr);
      setTokenWrapperAddress(tokenWrapperAddr);
      setTokenLogicAddress(tokenLogicAddr);
    };
    getPBMTokenRequest();
  }, [getPBMToken]);
  return { tokenManagerAddress, tokenWrapperAddress, tokenLogicAddress };
}

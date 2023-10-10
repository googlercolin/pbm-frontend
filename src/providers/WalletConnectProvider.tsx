import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import logo512 from "../assets/logo512.png";

const INFURA_KEY = process.env.REACT_APP_INFURA_API_KEY;

const ethereumGoerli = {
  id: "0x5",
  token: "ETH",
  label: "Goerli",
  rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`,
};

const chains = [ethereumGoerli];
const wallets = [injectedModule()];

const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Purpose Bound Money",
    icon: "<svg></svg>",
    description: "A demo of Purpose Bound Money",
  },
  connect: {
    autoConnectLastWallet: true,
  },
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
};

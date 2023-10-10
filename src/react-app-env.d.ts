/// <reference types="react-scripts" />
interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

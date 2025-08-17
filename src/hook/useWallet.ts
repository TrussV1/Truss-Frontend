import { useState } from "react";
import { BrowserProvider } from "ethers";

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);

  async function connectWallet() {
    if (!(window as any).ethereum) {
      alert("MetaMask is not installed. Please install it.");
      return;
    }
    try {
      const provider = new BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  }

  return { account, connectWallet };
}

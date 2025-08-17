import { BrowserProvider, JsonRpcProvider } from "ethers";

// For MetaMask (frontend)
export function getBrowserProvider(): BrowserProvider {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask not found. Please install it.");
  }
  return new BrowserProvider((window as any).ethereum);
}

// For backend / public RPC
export function getJsonRpcProvider(rpcUrl: string): JsonRpcProvider {
  return new JsonRpcProvider(rpcUrl);
}

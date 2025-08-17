export {};

declare global {
  interface Window {
    ethereum?: any; // You can replace 'any' with MetaMask's type if you want strict typing
  }
}

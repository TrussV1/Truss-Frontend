import "./App.css";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./router";
import { UserProvider } from "./context/userContext";
import { Toaster } from "sonner";
import { getEscrowContract } from "./contract/escrow/contract";
import { getEcommerceContract } from "./contract/ecommerce/contract";
import { useWallet } from "./hook/useWallet";
import { formatEther } from "ethers";

function App() {
  const { account, connectWallet } = useWallet();
  const [escrowBalance, setEscrowBalance] = useState<string>("");
  const [productCount, setProductCount] = useState<string>("");

  async function checkContracts() {
    try {
      const escrow = await getEscrowContract();
      const balance = await escrow.getEscrowBalance();
      setEscrowBalance(formatEther(balance)); // Convert Wei → ETH

      const ecommerce = await getEcommerceContract();
      const count = await ecommerce.getProductCount();
      setProductCount(
        count.toString() === "0" ? "No products yet" : count.toString()
      );
    } catch (error) {
      console.error("Error interacting with contracts:", error);
    }
  }

  useEffect(() => {
    if (account) {
      checkContracts();
    }
  }, [account]);

  return (
    <UserProvider>
      <Toaster richColors position="top-center" />

      <div style={{ padding: "1rem" }}>
        {!account ? (
          <button
            onClick={connectWallet}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff9800",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <div>
            <p><strong>Connected:</strong> {account}</p>
            <p><strong>Escrow Balance:</strong> {escrowBalance} ETH</p>
            <p><strong>Product Count:</strong> {productCount}</p>
          </div>
        )}
      </div>

      <RouterProvider router={routes} />
    </UserProvider>
  );
}

export default App;

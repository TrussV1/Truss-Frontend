import { Contract } from "ethers";
import { ECOMMERCE_CONTRACT_ADDRESS } from "./constant";
import abi from "./abi.json";
import { getBrowserProvider } from "../shared/providers.tsx";

export async function getEcommerceContract(): Promise<Contract> {
  const provider = getBrowserProvider();
  const signer = await provider.getSigner();
  return new Contract(ECOMMERCE_CONTRACT_ADDRESS, abi , signer);
}


import { Contract } from "ethers";
import { ESCROW_CONTRACT_ADDRESS } from "./constant";
import abi from "./abi.json";
import { getBrowserProvider } from "../shared/providers.tsx";

export async function getEscrowContract(): Promise<Contract> {
  const provider = getBrowserProvider();
  const signer = await provider.getSigner();
  return new Contract(ESCROW_CONTRACT_ADDRESS, abi, signer);
}

import dotenv from 'dotenv';
import axios from 'axios';
import {
  createPublicClient,
  http,
  webSocket
} from 'viem';
import { polygon } from 'viem/chains';
import { PPP_CONTRACT_ADDRESS, PPP_CONTRACT_ABI } from './constants.js';

dotenv.config();

const RPC_PROVIDER_API_KEY = process.env.RPC_PROVIDER_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

if (!RPC_PROVIDER_API_KEY || !POLYGONSCAN_API_KEY) {
  throw new Error("Missing API_KEY in .env");
}

const webSocketClient = createPublicClient({
  chain: polygon,
  transport: webSocket(`wss://polygon-mumbai.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

const publicClient = createPublicClient({
  chain: polygon,
  transport: http(`https://polygon-mumbai.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

// fetch the contract's ABI from the explorer
async function getContractAbi(_contractAddress: string) {
  const explorerResponse = await axios.get("https://api-mumbai.polygonscan.com/api", {
    params: {
      module: "contract",
      action: "getabi",
      address: PPP_CONTRACT_ADDRESS,
      apikey: POLYGONSCAN_API_KEY
    }
  });

  const abi = JSON.parse(explorerResponse?.data?.result);
  return abi;
}


webSocketClient.watchContractEvent({
  address: PPP_CONTRACT_ADDRESS,
  abi: PPP_CONTRACT_ABI,
  eventName: "Transfer",
  onError: (error) => {
    throw error;
  },
  onLogs: (logs) => {
    console.log("new logs", logs);
  },
});

console.log("listening for events on contract", contractAddress);



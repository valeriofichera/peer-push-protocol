import axios from 'axios';
import dotenv from 'dotenv';
import {
  createPublicClient,
  http,
  webSocket
} from 'viem';

import { polygonMumbai } from 'viem/chains';

dotenv.config();

const RPC_PROVIDER_API_KEY = process.env.RPC_PROVIDER_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

if (!RPC_PROVIDER_API_KEY || !POLYGONSCAN_API_KEY) {
  throw new Error("Missing API_KEY in .env");
}

const webSocketClient = createPublicClient({
  chain: polygonMumbai,
  transport: webSocket(`wss://polygon-mumbai.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(`https://polygon-mumbai.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});


// fetch the contract's ABI from the explorer
async function getContractAbi(_contractAddress: string) {
  const explorerResponse = await axios.get("https://api-mumbai.polygonscan.com/api", {
    params: {
      module: "contract",
      action: "getabi",
      address: _contractAddress,
      apikey: POLYGONSCAN_API_KEY
    }
  });

  const abi = JSON.parse(explorerResponse?.data?.result);
  return abi;
}

// peanut protocol contract address
const contractAddress = "0xEc8f9a7f47dd6031e27Ff9cef9d0F33e81fceCe9";
const contractAbi = await getContractAbi(contractAddress);


webSocketClient.watchContractEvent({
  address: contractAddress,
  abi: contractAbi,
  eventName: "makeDeposit",
  args: {
    _index: 110,
  },
  onError: (error) => {
    throw error;
  },
  onLogs: (logs) => {
    console.log("new logs", logs);
  },
});

console.log("listening for events on contract", contractAddress);



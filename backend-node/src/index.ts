import axios from 'axios';
import dotenv from 'dotenv';
import {
  GetFilterLogsReturnType,
  Log,
  TransactionReceipt,
  createPublicClient,
  decodeEventLog,
  encodeEventTopics,
  fromHex,
  http,
  webSocket
} from 'viem';

import { polygon } from 'viem/chains';

dotenv.config();

const RPC_PROVIDER_API_KEY = process.env.RPC_PROVIDER_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

if (!RPC_PROVIDER_API_KEY || !POLYGONSCAN_API_KEY) {
  throw new Error("Missing API_KEY in .env");
}

const webSocketClient = createPublicClient({
  chain: polygon,
  transport: webSocket(`wss://polygon-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

const publicClient = createPublicClient({
  chain: polygon,
  transport: http(`https://polygon-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

const contractAddress = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";

// fetch the contract's ABI from the explorer
async function getContractAbi(_contractAddress: string) {
  const explorerResponse = await axios.get("https://api.polygonscan.com/api", {
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

// listen for any new events on the contract
//usdc address
const contractAbi = await getContractAbi(contractAddress);



webSocketClient.watchContractEvent({
  address: contractAddress,
  abi: contractAbi,
  eventName: "Transfer",
  onError: (error) => {
    throw error;
  },
  onLogs: (logs) => {
    console.log("new logs", logs);
  },
});

console.log("listening for events on contract", contractAddress);



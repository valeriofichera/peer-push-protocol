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
import { arbitrum } from 'viem/chains';

dotenv.config();

const RPC_PROVIDER_API_KEY = process.env.RPC_PROVIDER_API_KEY || '';

const webSocketClient = createPublicClient({
  chain: arbitrum,
  transport: webSocket(`wss://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(`https://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});

type ExpectedLogArgs = {
  solver: `0x${string}`;
  challenge: `0x${string}`;
  twitterHandle: string;
}

type ExpectedLog = {
  args: ExpectedLogArgs;
  eventName: string;
  transactionHash: `0x${string}`;
} & Log


// Function to handle ChallengeSolved event
const handleEventTriggered = async (twitterHandleInput: string, challenge: `0x${string}`, transactionHash: `0x${string}`) => {
}

console.log("Listening for ChallengeSolved events...");

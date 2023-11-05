import dotenv from 'dotenv';
import axios from 'axios';
import {
  createPublicClient,
  createWalletClient,
  http,
  webSocket
} from 'viem';
import { polygonZkEvmTestnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

import { PPP_CONTRACT_ADDRESS, PPP_CONTRACT_ABI } from './constants.js';

dotenv.config();

const RPC_PROVIDER_API_KEY = process.env.RPC_PROVIDER_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

if (!RPC_PROVIDER_API_KEY || !POLYGONSCAN_API_KEY) {
  throw new Error("Missing API_KEY in .env");
}

const webSocketClient = createPublicClient({
  chain: polygonZkEvmTestnet,
  transport: webSocket(`wss://polygon-zkevm-testnet.blastapi.io/${RPC_PROVIDER_API_KEY}`)
});

const publicClient = createPublicClient({
  chain: polygonZkEvmTestnet,
  transport: http(`https://polygon-zkevm-testnet.blastapi.io/${RPC_PROVIDER_API_KEY}`)
});

const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

const client = createWalletClient({
  account,
  chain: polygonZkEvmTestnet,
  transport: http(`https://polygon-zkevm-testnet.blastapi.io/${RPC_PROVIDER_API_KEY}`)
})


// fetch the contract's ABI from the explorer
async function getContractAbi(_contractAddress: string) {
  const explorerResponse = await axios.get("https://api-testnet-zkevm.polygonscan.com/api", {
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

// Peanut Protocol contract address
const contractAddress = "0x8d1a17A3A4504aEB17515645BA8098f1D75237f7";
const contractAbi = await getContractAbi(contractAddress);

type PushRequest = {
  id: bigint,
  creator: string,
  contractAddress: string,
  functionName: string,
  currentState: string,
  pushReward: bigint,
  lastUpdate: bigint,
  updateInterval: bigint,
  active: boolean,
};

// attempt to update all pushRequests following the getDepositCount function on the Peanut contract
async function fulfilPeanutPushRequests() {
  const data = await publicClient.readContract({
    address: PPP_CONTRACT_ADDRESS,
    abi: PPP_CONTRACT_ABI,
    functionName: 'getPushRequests',
  }) as PushRequest[];

  // filter for push requests for requests tracking the Peanut contract address and function name
  const filteredPushRequests = data.filter((pushRequest) =>
    pushRequest.contractAddress === contractAddress
    && pushRequest.functionName === 'getDepositCount'
    && pushRequest.active);

  // get the push request ids
  const pushRequestIds = filteredPushRequests.map((pushRequest) => pushRequest.id);

  console.log(`Found ${pushRequestIds.length} eligible pushRequests.`);

  // loop through the push request ids and push the data to the PPP contract
  for (const pushRequestId of pushRequestIds) {
    const request = {
      chain: polygonZkEvmTestnet,
      account,
      address: PPP_CONTRACT_ADDRESS as `0x${string}`,
      abi: PPP_CONTRACT_ABI,
      functionName: 'fulfilPushRequest',
      args: [pushRequestId],
    };
    try {
      const txHash = await client.writeContract(request);

      const transactionReceipt = await publicClient.waitForTransactionReceipt(
        { hash: txHash }
      );

      console.log(`Transaction status for pushRequest ${pushRequestId}: ${transactionReceipt.status}`);

    } catch (error) {
      console.log(`Error fulfilling pushRequest ${pushRequestId}: ${error.shortMessage || error}`);
    }
  }

  console.log("Finished fulfilling push requests");

}

await fulfilPeanutPushRequests();

webSocketClient.watchContractEvent({
  address: contractAddress,
  abi: contractAbi,
  eventName: "DepositEvent",
  onError: (error) => {
    throw error;
  },
  onLogs: (logs) => {
    console.log("new deposit event, running fulfilPeanutPushRequests()");
    fulfilPeanutPushRequests();
  },
});

console.log("listening for events on contract", contractAddress);



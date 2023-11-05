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
const NOTIFY_API_SECRET = process.env.NOTIFY_API_SECRET;
const PROJECT_ID = process.env.PROJECT_ID;
const APP_DOMAIN = process.env.APP_DOMAIN;

if (!RPC_PROVIDER_API_KEY || !POLYGONSCAN_API_KEY || !NOTIFY_API_SECRET || !PROJECT_ID || !APP_DOMAIN) {
  throw new Error("Missing API_KEY in .env");
}

const webSocketClient = createPublicClient({
  chain: polygonZkEvmTestnet,
  transport: webSocket(`wss://polygon-zkevm-testnet.public.blastapi.io`)
});

const publicClient = createPublicClient({
  chain: polygonZkEvmTestnet,
  transport: http(`https://polygon-zkevm-testnet.public.blastapi.io`)
});

const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

const client = createWalletClient({
  account,
  chain: polygonZkEvmTestnet,
  transport: http("https://polygon-zkevm-testnet.public.blastapi.io")
})


// fetch the contract's ABI from the explorer
async function getContractAbi(_contractAddress: string) {
  const explorerResponse = await axios.get("https://testnet-zkevm.polygonscan.com/api", {
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

function parsePushRequest(returnData: PushRequest): PushRequest {
  return {
    id: returnData[0],
    creator: returnData[1],
    contractAddress: returnData[2],
    functionName: returnData[3],
    currentState: returnData[4],
    pushReward: returnData[5],
    lastUpdate: returnData[6],
    updateInterval: returnData[7],
    active: returnData[8],
  };
}

// send notification to the user who's tracked state has changed
async function sendWeb3InboxNotifications(logs) {
  // get requestId from event logs
  const requestId = logs[0]?.args?.requestId;

  // get the pushRequest data from the PPP contract
  const pushRequestsData = await publicClient.readContract({
    address: PPP_CONTRACT_ADDRESS,
    abi: PPP_CONTRACT_ABI,
    functionName: 'pushRequests',
    args: [requestId],
  }) as PushRequest;

  const pushRequest = parsePushRequest(pushRequestsData);

  // get the user's address from the pushRequest
  const userAddressFormatted = `eip155:1:${pushRequest.creator}`;

  console.log("userAddressFormatted", userAddressFormatted);
  console.log("pushRequest.contractAddress", pushRequest.contractAddress)

  const contractAbi = await getContractAbi(pushRequest.contractAddress);

  // pushRequest.currentState is not human readable atm
  // get the current state from the tracked contract
  const currentState = await publicClient.readContract({
    address: pushRequest.contractAddress as `0x${string}`,
    abi: contractAbi,
    functionName: pushRequest.functionName,
    args: [],
  });

  const currentStateFormatted = currentState.toString();

  console.log("currentStateFormatted", currentStateFormatted);

  try {
    const response = await fetch(
      `https://notify.walletconnect.com/${PROJECT_ID}/notify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NOTIFY_API_SECRET}`
        },
        body: JSON.stringify({
          notification: {
            title: `${pushRequest.functionName} state changed!`,
            body: `New state: ${currentStateFormatted}`,
            icon: `https://${APP_DOMAIN}/ppp.png`,
            url: `https://${APP_DOMAIN}`,
            type: "055dee2f-3e83-4950-a705-0ef9ccaf832b", // Notification type ID from WalletConnect Cloud
          },
          accounts: [
            userAddressFormatted
          ]
        })
      }
    );

    console.log("Web3Inbox Push status: ", response.status);

  } catch (error) {
    console.log("error sending notification", error);
  }

}
webSocketClient.watchContractEvent({
  address: PPP_CONTRACT_ADDRESS,
  abi: PPP_CONTRACT_ABI,
  eventName: "PushRequestFulfilled",
  onError: (error) => {
    throw error;
  },
  onLogs: (logs) => {
    sendWeb3InboxNotifications(logs);
  },
});

console.log("listening for events on PPP contract: ", PPP_CONTRACT_ADDRESS);



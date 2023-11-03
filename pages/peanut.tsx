import peanut from '@squirrel-labs/peanut-sdk';
import { ethers } from "ethers";

const CHAINID = 5 // goerli
const RPC_URL = 'https://rpc.ankr.com/eth_goerli'

const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
let walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic)
const address = await walletMnemonic.getAddress();
console.log("Test address: " + address);

const wallet = new ethers.Wallet(
    walletMnemonic.privateKey,
    new ethers.providers.JsonRpcProvider(RPC_URL));

// create link
const createLinkResponse = await peanut.createLink({
  structSigner:{
    signer: wallet
  },
  linkDetails:{
    chainId: 5, // eth-goerli 
    tokenAmount: 0.01,
    tokenType: 0,  // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
  }
});

console.log("New link: " + createLinkResponse.createdLink.link[0]);
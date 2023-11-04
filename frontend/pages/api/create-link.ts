
import type { NextApiRequest, NextApiResponse } from 'next'
import peanut from '@squirrel-labs/peanut-sdk';
import { ethers } from 'ethers';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log('Hello API called')

  const CHAINID = 5; // goerli
  const RPC_URL = 'https://rpc.goerli.eth.gateway.fm';
  const wallet = new ethers.Wallet("private_key", new ethers.providers.JsonRpcProvider(RPC_URL));

  const createLink = async () => {
    // create link
    const { link, txHash } = await peanut.createLink({
      structSigner: {
        signer: wallet,
      },
      linkDetails: {
        chainId: CHAINID,
        tokenAmount: 0.0001,
        tokenType: 0, // 0 is for native tokens
        // Values for tokenType are defined in SDK documentation:
        // https://docs.peanut.to/integrations/building-with-the-sdk/sdk-reference/common-types#epeanutlinktype
      },

    });
    console.log('New link: ' + link);
    return { link, txHash };
  }

  createLink()

  res.status(200).json({ name: 'John Doe' })
}



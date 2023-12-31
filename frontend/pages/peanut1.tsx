import { Button } from '@/components/ui/button';
import { useEthersSigner } from '@/lib/hooks/useEthersSigner';
import peanut from '@squirrel-labs/peanut-sdk';
import Link from 'next/link';



export default function Peanut() {


  const signer = useEthersSigner();

  // create link

  async function createLink() {
    if (
      !signer
    ) return

    const createLinkResponse = await peanut.createLink({
      structSigner: {
        signer
      },
      linkDetails: {
        chainId: 5, // eth-goerli 
        tokenAmount: 0.01,
        tokenType: 0,  // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
      }
    })
    console.log("createLinkResponse", createLinkResponse)
  };



  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        hello
      </div>

      <Button onClick={() => createLink()}>
        Create Link
      </Button>

      <Link href="/test">
        test
      </Link>
    </main>
  )
}
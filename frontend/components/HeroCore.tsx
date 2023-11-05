
import Link from 'next/link';
import { Button } from './ui/button';
import { Hero_Icon } from './icons/Hero_Icon';

const HeroCore = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-12 gap-4 items-center">
        
        {/* Text Section - Taking up 7 of 12 columns */}
        <div className="col-span-7">

          <h1 className="text-7xl font-nebula">
            Peer to Peer <br /> Data Network
          </h1>
          <p className="font-nebula text-md mt-6 mb-4">
          Decentralized Data Feeds secured by Bitcoin.
          </p>
          <p className="font-nebula text-md mt-6 mb-4">
          Build on Core - EVM-compatible smart contracts on a Bitcoin-powered blockchain
          </p>

          <Link href="/">
          <Button className='font-nebula justify-end'>
            Learn More
          </Button>
          </Link>
        </div>

        {/* Image Section - Taking up 5 of 12 columns */}
        <div className="col-span-5 flex justify-center md:justify-end">
        <Hero_Icon className="w-[546.172px] h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default HeroCore;


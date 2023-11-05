
import Link from 'next/link';
import { Hero_Icon } from './icons/Hero_Icon';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-12 gap-4 items-center">
        
        {/* Text Section - Taking up 7 of 12 columns */}
        <div className="col-span-7">

          <h1 className="text-7xl font-nebula">
            Peer to Peer <br /> Data Network
          </h1>
          <p className="font-nebula text-md mt-6 mb-4">
            earn for lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.
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

export default Hero;


{/* <div className="flex justify-between items-center bg-white px-8 py-16">
      <div className="space-y-6">
        <h1 className="text-5xl font-nebula">
         Peer to Peer
          <br />
          Data Network
        </h1>
        <p className="font-nebula text-lg">
          earn for ntp0eirfje28fj 32 '023j82je32gijje23 g9ij23
          g90234gijg23i4g9jg2340gBj2308gfj13
        </p>
        <Link href="/">
            Learn More
        </Link>
      </div>
      <div className="flex-1">
        <Hero_Icon className="w-[546.172px] h-[400px]" />
      </div>
    </div> */}
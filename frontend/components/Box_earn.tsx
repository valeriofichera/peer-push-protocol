import { Earn_Icon } from "./icons/Earn_Icon";


const Box_earn = () => {
  return (
    <div className="bg-gradient-to-r from-white via-gray-100 to-gray-300 rounded-lg  p-8 flex items-center">
      <div className="grid grid-cols-6 gap-4 w-full">

      <div className="col-span-2 flex justify-center items-center">
          <Earn_Icon/>
        </div>
        {/* Text Section - Taking up 4 of 6 columns */}
        <div className="col-span-4 space-y-4">
          <h1 className="text-4xl font-bold text-black font-nebula">Push to Earn</h1>
          <p className="text-black text- font-nebula">
            push feeds of onchain events, <br/> requested by Users
          </p>
          <p className="text-right text-black text-xl font-nebula">earn P<sup>3</sup> Token</p>
        </div>

        
      </div>
    </div>
  );
};

export default Box_earn;

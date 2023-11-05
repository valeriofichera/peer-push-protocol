import { Get_Icon } from "./icons/Get_Icon";


const Box_get = () => {
  return (
    <div className="bg-gradient-to-r from-white via-gray-100 to-gray-300 rounded-lg overflow-hidden py-5 px-7 flex items-center">
      <div className="grid grid-cols-6 gap-4 w-full">

      <div className="col-span-2 flex justify-center items-center">
          <Get_Icon/>
        </div>
        {/* Text Section - Taking up 4 of 6 columns */}
        <div className="col-span-4 space-y-4">
          <h1 className="text-4xl font-bold text-black font-nebula">Get Notfications</h1>
          <p className="text-black text- font-nebula">
            tack onchain events and get notified
          </p>
          <p className="text-right text-black text-xl font-nebula">earn P<sup>3</sup> Token</p>
        </div>

        
      </div>
    </div>
  );
};

export default Box_get;

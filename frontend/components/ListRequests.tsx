import { useEffect, useState } from 'react';
import { PPP_CONTRACT_ABI, PPP_CONTRACT_ADDRESS } from '@/lib/constants';
import { useContractRead } from 'wagmi';
import Image from 'next/image';

const ListRequests = () => {
  // Initialize the requests state with a value that reflects the initial content on the server-side
  const [requests, setRequests] = useState<any>(undefined);
  const [loaded, setLoaded] = useState(false); // State to keep track of loading completion

  const { data, isError, isLoading } = useContractRead({
    address: PPP_CONTRACT_ADDRESS, // The address should be a string
    abi: PPP_CONTRACT_ABI, // The ABI should be an object or array
    functionName: 'getPushRequests',
  });

  // Handle the side effects
  useEffect(() => {
    if (!isLoading && !isError && data) {
      // Once data is loaded and there is no error, update the state.
      setRequests(data as any);
      setLoaded(true); // Mark as loaded
    } else if (isError) {
      setRequests(null); // Handle error state
    }
  }, [data, isLoading, isError]);

  if (!loaded) {
    // This will match the initial server render (nothing or a loader, etc.)
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-6 ">
      <h2 className="col-span-6 col-start-1 text-center text-5xl font-bold text-black font-nebula">
        My Feed
      </h2>


      {isError || requests === null ? (
        <p>Error fetching requests.</p>
      ) : (
        <>
          {requests && requests.map((item: any, index: any | null | undefined) => (

    <div key={index} className="col-span-2 col-start-1 bg-gradient-to-r bg-gray-300 rounded-xl shadow-lg p-5 flex items-center">
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col gap-5">
          <p className="text-sm font-bold">Request ID {index + 1}</p>
          <Image className="pr-3" src="/Peanut_Logo.svg" alt="Peanut" width={100} height={100} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-black font-nebula">
            Peanut Protocol
          </h2>
            <p className="text-xs">{item.contractAddress} </p>
            <p className="text-lg">{item.functionName}</p>
        </div>
      </div>
    </div>

          ))}
        </>
      )}

    </div>
  );


};

export default ListRequests;



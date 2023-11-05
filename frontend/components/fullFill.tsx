import { PPP_CONTRACT_ABI, PPP_CONTRACT_ADDRESS } from '@/lib/constants';
import { useContractWrite } from 'wagmi'
import { Button } from './ui/button';


const FullFill = () => {

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: PPP_CONTRACT_ADDRESS,
    abi: PPP_CONTRACT_ABI,
    functionName: 'fulfilPushRequest',
    args: [0] //user input, which Request to fulfill
  })

  return (
    <div className="flex justify-center mx-auto text-lg p-5 flex flex-col font-nebula text-center w-96">
      <div>Fulfill a Requested Push</div>
      <Button onClick={() => write()}>FullFill</Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>


  );

};

export default FullFill;

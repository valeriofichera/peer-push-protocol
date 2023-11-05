import { PPP_CONTRACT_ABI, PPP_CONTRACT_ADDRESS } from '@/lib/constants';
import { parseUnits } from 'viem';
import { useContractWrite } from 'wagmi'
import { Button } from './ui/button';


const Approve = () => {

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: PPP_CONTRACT_ADDRESS,
    abi: PPP_CONTRACT_ABI,
    functionName: 'approve',
    args: [PPP_CONTRACT_ADDRESS, parseUnits('100000000', 18)],
  })

return (

<div className='font-nebula hover:shadow-lg'>
  <Button onClick={() => write()}>Approve</Button>
  {isLoading && <div>Check Wallet</div>}
  {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
</div>




);

};

export default Approve;

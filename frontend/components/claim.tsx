import { PPP_CONTRACT_ABI, PPP_CONTRACT_ADDRESS } from '@/lib/constants';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from './ui/button';


const Claim = () => {

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: PPP_CONTRACT_ADDRESS,
    abi: PPP_CONTRACT_ABI,
    functionName: 'claimTokens',
  })

  return (

    <div className='flex font-nebula hover:shadow-lg justify-center'>
      <Button onClick={() => write()}>Claim Tokens</Button>
    </div>
  );
};

export default Claim;
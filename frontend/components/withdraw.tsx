import { PPP_CONTRACT_ABI, PPP_CONTRACT_ADDRESS } from '@/lib/constants';
import { parseUnits } from 'viem';
import { useContractWrite } from 'wagmi'
import { Button } from './ui/button';
import { useState } from 'react';
import { Input } from './ui/input';

const Withdraw = () => {

  const [amount, setAmount] = useState('');

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: PPP_CONTRACT_ADDRESS,
    abi: PPP_CONTRACT_ABI,
    functionName: 'withdrawTokens',
    args: [parseUnits(amount, 18)] //uswithdraw PPP tokens
  })

  const handleCreateRequest = () => {
    write();
  };

return (
<div className="grid grid-cols-3 gap-5 font-nebula">
  <div className='grid col-span-1'>
    <Input value={amount} placeholder="Amount" type='number' onChange={(e) => {setAmount(e.target.value);}} />
  </div>
  <div className='grid col-span-2 text-center'>
  <Button onClick={handleCreateRequest}>
    {isLoading ? 'Processing...' : 'Withdraw'}
  </Button>
  </div>
</div>
);

};

export default Withdraw;

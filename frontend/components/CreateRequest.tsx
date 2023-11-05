import { PPP_CONTRACT_ABI, PPP_CONTRACT_ADDRESS } from '@/lib/constants';
import { parseUnits } from 'viem';
import { useContractWrite } from 'wagmi'
import { Input } from './ui/input';
import { useState } from 'react';
import { Button } from './ui/button';


const CreateRequest = () => {

  const [contractAddress, setContractAddress] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [pricePerPush, setPricePerPush] = useState('');
  const [timeIntervall, setTimeIntervall] = useState('');

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: PPP_CONTRACT_ADDRESS,
    abi: PPP_CONTRACT_ABI,
    functionName: 'createPushRequest',
    args: [contractAddress, "getDepositCount", parseUnits('10', 18), 60]
  })


  const handleCreateRequest = () => {
    write();
  };

return (
<div className="grid grid-cols-6 gap-4 p-4 bg-slate-200 rounded-xl shadow-xl font-nebula">
<h2 className="col-span-6 text-center text-4xl font-bold text-black">
<p>Create a new <br/> Push Request</p>
</h2>
<div className='grid col-span-3'>
<div className='flex flex-col gap-10'>
<Input  value={contractAddress} placeholder="Contract Address"  type='string' onChange={(e) => {setContractAddress(e.target.value);}} />
<Input  value={functionName} placeholder="functionName"  type='string' onChange={(e) => {setFunctionName(e.target.value);}} />
</div>
</div>

<div className='grid col-span-3'>
<div className='flex flex-col gap-10'>
<Input  value={pricePerPush} placeholder="Price per Push Notification"  type='number' onChange={(e) => {setPricePerPush(e.target.value);}} />
<Input  value={timeIntervall} placeholder="Frequency (in seconds)"  type='number' onChange={(e) => {setTimeIntervall(e.target.value);}} />
</div>
</div>

<div className='grid col-span-2 col-start-3 font-bold hover:shadow-lg hover:shadow-white'>

<Button onClick={handleCreateRequest} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Create Request'}
      </Button>
      </div>
</div>


);

};

export default CreateRequest;

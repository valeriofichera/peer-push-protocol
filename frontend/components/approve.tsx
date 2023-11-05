import { PPP_CONTRACT_ABI, PPP_CONTRACT_ADDRESS } from '@/lib/constants';
import { parseUnits } from 'viem';
import { useContractWrite } from 'wagmi'


const Approve = () => {

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: PPP_CONTRACT_ADDRESS,
    abi: PPP_CONTRACT_ABI,
    functionName: 'approve',
    args: [PPP_CONTRACT_ADDRESS, parseUnits('100000000', 18)],
  })

return (
<div className="grid grid-cols-3 gap-4 p-4 bg-slate-200 rounded-xl shadow-xl font-nebula">


<h2 className="col-span-3 text-center text-4xl font-bold text-black">
<p>Claim P<sup>3</sup> Token</p>
</h2>
<div className='col-span-3 text-center'>
<p>Claim 1000 P<sup>3</sup> Token to get started</p>
</div>
<div>
  <button onClick={() => write()}>Feesssd</button>
  {isLoading && <div>Check Wallet</div>}
  {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
</div>



</div>
);

};

export default Approve;

import { useEffect, useState } from 'react';
import { PPP_CONTRACT_ABI, PPP_CONTRACT_ADDRESS } from '@/lib/constants';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import { Wallet_Icon } from './icons/Wallet_Icon';
import { read } from 'fs';
import { readContract } from 'viem/actions';

const Balance = () => {
  const { address } = useAccount();
  const { data, isLoading } = useBalance({
    address: address,
    token: PPP_CONTRACT_ADDRESS,
  });
  const {data:value} = useContractRead({
    address: PPP_CONTRACT_ADDRESS,
    abi: PPP_CONTRACT_ABI,
    functionName: 'addressToDepositedTokens',
    args: [address],
  });

  console.log(value);

  // Use a state to hold the formatted balance to prevent content mismatch
  const [balanceFormatted, setBalanceFormatted] = useState('Loading...');
  const [valueFormatted, setValueFormatted] = useState('Loading...');



  useEffect(() => {
    // Update the balance when the data is loaded
    if (data && !isLoading) {
      setBalanceFormatted(`${data.formatted} ${data.symbol}`);
    }

    if (value && !isLoading) {
      setValueFormatted(value.toString());
    }
  }, [data, isLoading]);

  return (
    <div className="grid grid-cols-1 gap-2 p-5 bg-slate-200 rounded-sm font-nebula">
      
      <h2 className="col-span-1 text-xl font-bold text-black">
      <p>Token Balance</p>
      </h2>

      <div className='grid col-span-1'>
      <div className="flex flex-row gap-5">
        <Wallet_Icon className="h-[100px]" />
        <h2 className="text-center text-4xl font-bold text-black">
          {balanceFormatted}
        </h2>
      </div>
      </div>

      <h2 className="col-span-1 text-xl font-bold text-black">
      <p>my Deposits</p>
      </h2>

      <div className='grid col-span-1'>
      <div className="flex flex-row gap-5">
        <Wallet_Icon className="h-[100px]" />
        <h2 className="text-center text-4xl font-bold text-black">
          {valueFormatted}
        </h2>
      </div>
      </div>
 
    </div>
  );
};

export default Balance;

import { useEffect, useState } from 'react';
import { PPP_CONTRACT_ADDRESS } from '@/lib/constants';
import { useBalance } from 'wagmi';

const Balance = () => {
  const { data, isLoading } = useBalance({
    address: PPP_CONTRACT_ADDRESS,
  });

  // Use a state to hold the formatted balance to prevent content mismatch
  const [balanceFormatted, setBalanceFormatted] = useState('Loading...');

  useEffect(() => {
    // Update the balance when the data is loaded
    if (data && !isLoading) {
      setBalanceFormatted(`${data.formatted} ${data.symbol}`);
    }
  }, [data, isLoading]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-slate-200 rounded-xl shadow-xl font-nebula">
      <h2 className="col-span-3 text-center text-4xl font-bold text-black">
        Claim P<sup>3</sup> Token
      </h2>
      <div className='col-span-3 text-center'>
        <p>Claim 1000 P<sup>3</sup> Token to get started</p>
      </div>
      <div className='col-span-3 text-center'>
        Balance: {balanceFormatted}
      </div>
    </div>
  );
};

export default Balance;

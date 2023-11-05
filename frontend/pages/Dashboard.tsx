import CreateRequest from '@/components/CreateRequest'
import ListRequests from '@/components/ListRequests'
import { SendNotificationButton } from '@/components/SendNotificationButton'
import Web3InboxSubscribe from '@/components/Web3InboxSubscribe'
import Balance from '@/components/balance'
import Image from 'next/image'


import Withdraw from '@/components/withdraw'
import Deposit from '@/components/deposit'




export default function Dashboard() {
  return (
<div className='grid grid-rows-4'>
  
<div className='grid row-span-3'>

<div className='grid grid-cols-12 mt-12'>
<div className='grid col-span-6'>
<CreateRequest />
</div>

<div className='grid col-span-3 col-start-10'>

  <div className='gap-5'>
      <Balance />
      <Withdraw />
      <Deposit />
  </div>

<div>
  <div className="font-nebula text-xl font-bold p-3 mt-2">Try it out</div>
  <div className="flex flex-row justify-between">
    <div className="">
      <Web3InboxSubscribe />
    </div>
    <div className="">
      <SendNotificationButton />
    </div>
  </div>
</div>
</div>
</div>
</div>

<div className='grid row-span-1'>

<div className='grid grid-cols-12 mt-12'>

<div className='grid col-span-5 col-start-6 mt-24 font-nebula text-xl'>
Build with 🔥 & ❤️ @ ETHLisbon23 🇵🇹
</div>
</div>
</div>

</div>
  )
}
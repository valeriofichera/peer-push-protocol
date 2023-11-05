import CreateRequest from '@/components/CreateRequest'
import ListRequests from '@/components/ListRequests'
import { SendNotificationButton } from '@/components/SendNotificationButton'
import Web3InboxSubscribe from '@/components/Web3InboxSubscribe'
import Balance from '@/components/balance'
import Image from 'next/image'


import Withdraw from '@/components/withdraw'




export default function Dashboard() {
  return (
<div className='grid grid-rows-2'>
  
<div className='grid row-span-1'>

<div className='grid grid-cols-12 mt-12'>
<div className='grid col-span-6'>
<CreateRequest />
</div>

<div className='grid col-span-3 col-start-10'>

  <div className=''>
      <Balance />
      <Withdraw />
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

<div className='grid col-span-8 col-start-3'>
<ListRequests />
</div>
</div>
</div>

</div>
  )
}
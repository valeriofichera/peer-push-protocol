import Approve from '@/components/approve'
import Balance from '@/components/balance'
import Claim from '@/components/claim'
import Deposit from '@/components/deposit'
import FullFill from '@/components/fullFill'
import Request from '@/components/request'

export default function Notifications() {
  return (
<div className='w-screen'>

<Claim />
<Balance />
<Approve  />
<Deposit />
<Request />
<FullFill />


</div>
  )
}
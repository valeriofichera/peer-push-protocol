import CreateFeed from '@/components/CreateFeed'
import Web3InboxSubscribe from '@/components/Web3InboxSubscribe_style'


export default function Dashboard() {
  return (
<div className='min-w-screen grid grid-cols-12 mt-12'>

<div className='col-span-6'>

        <CreateFeed />
</div>
</div>
  )
}
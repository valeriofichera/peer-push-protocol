
import { SendNotificationButton } from '@/components/SendNotificationButton';
import Web3InboxSubscribe from '@/components/Web3InboxSubscribe';


export default function Home() {
  return (
    <main
      className=''
    >
      <div className='flex flex-col items-center justify-center py-12 '>
  
        <Web3InboxSubscribe />
        <SendNotificationButton />
      </div>
    </main>
  )
}
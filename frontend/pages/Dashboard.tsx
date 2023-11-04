import Image from 'next/image'
import { Inter } from 'next/font/google'
import Feed from '@/components/Feed'
import Web3InboxSubscribe from '@/components/Web3InboxSubscribe_style'


const inter = Inter({ subsets: ['latin'] })

export default function Dashboard() {
  return (
<div className='min-w-screen grid grid-cols-12'>

<div className='col-span-6'>

        <Feed />

        
</div>
</div>
  )
}
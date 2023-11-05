
import { Oxanium } from 'next/font/google'
import ListRequests from '@/components/ListRequests'
import FullFill from '@/components/fullFill'
import Claim from '@/components/claim'

const oxanium = Oxanium({ subsets: ['latin'] })

export default function Marketplace() {
  return (
    <div className='flex flex-col justify-center max-w-2xl mx-auto'>



      <FullFill />
      <Claim />

    </div>

  )
}
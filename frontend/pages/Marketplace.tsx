import Image from 'next/image'
import { Oxanium } from 'next/font/google'
import ListRequests from '@/components/ListRequests'

const oxanium = Oxanium({ subsets: ['latin'] })

export default function Marketplace() {
  return (
<div className='w-screen font-{`oxanium`}'>
<ListRequests />


</div>
  )
}
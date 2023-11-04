import { Inter } from 'next/font/google'
import peanut from '@squirrel-labs/peanut-sdk';
import Feed from '@/components/Feed';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className='h-screen'
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        hell
      </div>

      <Link href='/test'>
        <Feed />
      </Link>
    </main>
  )
}
console.log('Peanut version: ', peanut.version)
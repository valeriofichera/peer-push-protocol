import Image from 'next/image'
import { Inter } from 'next/font/google'
import peanut from '@squirrel-labs/peanut-sdk';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className='h-screen'
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      hell
      </div>
      
      <a href='/test'> test</a>
    </main>
  )
}
console.log('Peanut version: ', peanut.version)
import Feed from '@/components/Feed';
import Web3InboxSubscribe from '@/components/Web3InboxSubscribe';


export default function Home() {
  return (
    <main
      className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'
    >
      <div className='flex flex-col items-center justify-center py-12 bg-red-200'>
        <Feed />
        <Web3InboxSubscribe />
      </div>
    </main>
  )
}
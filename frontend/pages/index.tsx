import Feed from '@/components/Feed';
import Web3InboxSubscribe from '@/components/Web3InboxSubscribe';


export default function Home() {
  return (
    <main
      className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'
    >
<<<<<<< Updated upstream
      <div className='flex flex-col items-center justify-center py-12 bg-red-200'>
=======
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        hell
      </div>

      <div className="w-80 h-36 p-2.5 bg-neutral-200 rounded-lg flex-col justify-start items-start gap-4 inline-flex">
  <div className="justify-start items-center gap-5 inline-flex">
    <div className="justify-start items-center gap-4 flex">
      <div className="w-14 h-14 relative">
        <div className="w-14 h-14 left-0 top-0 absolute bg-red-600 rounded-full" />
        <img className="w-12 h-12 left-[3px] top-[5px] absolute" src="https://via.placeholder.com/50x50" />
      </div>
    </div>
    <div className="h-16 flex-col justify-between items-start inline-flex">
      <div className="w-40 h-5 text-center text-black text-xl font-semibold font-['Inter']">Peanut Protocol</div>
      <div className="w-32 h-5 text-center text-black text-xl font-light font-['Inter']">getRequest()</div>
      <div className="text-center text-black text-xs font-light font-['Inter']">0xa5fFD5f5F22aF05e0D2bB83f0125547C36D1cC71</div>
    </div>
  </div>
  <div className="w-80 justify-between items-center inline-flex">
    <div className="h-8 flex-col justify-between items-center inline-flex">
      <div className="w-14 h-2 text-center text-black text-xs font-semibold font-['Inter']">web3Inbox</div>
    </div>
    <div className="h-9 p-1 bg-white rounded-2xl justify-between items-center flex">
      <div className="w-24 h-5 text-center text-black text-xs font-light font-['Inter']">buy the feed</div>
      <div className="w-6 h-6 relative bg-white bg-opacity-0" />
    </div>
  </div>
</div>

      <Link href='/test'>
>>>>>>> Stashed changes
        <Feed />
        <Web3InboxSubscribe />
      </div>
    </main>
  )
}
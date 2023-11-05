
import Hero_core from '@/components/Hero_core';
import SubHero from '@/components/SubHero';


export default function Home() {
  return (
    <main >
      <div className='flex flex-col items-center justify-center py-12 '>
  
      <Hero_core />
      <SubHero />
      </div>
    </main>
  )
}
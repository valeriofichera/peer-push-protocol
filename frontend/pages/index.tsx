
import Hero from '@/components/Hero';
import SubHero from '@/components/SubHero';


export default function Home() {
  return (
    <main >
      <div className='flex flex-col items-center justify-center py-12 '>
  
      <Hero />
      <SubHero />
      </div>
    </main>
  )
}
import '@/styles/globals.css';
import type { AppProps } from "next/app";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import Header from '@/components/Header';
import { WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID env variable missing");
}

const metadata = {
  name: 'Peer Push Protocol',
  description: 'Peer Push Protocol is an on-chain marketplace for push notifications.',
  url: 'https://peer-push-protocol.vervel.app',
  icons: ['/ppp.png']
}

const chains = [polygonMumbai]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Header />
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
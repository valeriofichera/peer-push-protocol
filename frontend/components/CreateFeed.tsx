import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';

import { useCallback, useEffect } from 'react'
import { useSignMessage, useAccount } from 'wagmi'
import { useInitWeb3InboxClient, useManageSubscription, useMessages, useSubscription, useW3iAccount } from '@web3inbox/widget-react';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ''

const CreateFeed = () => {

  const { address } = useAccount()
    const { signMessageAsync } = useSignMessage()

    // Initialize the Web3Inbox SDK
    const isReady = useInitWeb3InboxClient({
        // The project ID and domain you setup in the Domain Setup section
        projectId,
        domain: 'peer-push-protocol.vercel.app',

        // Allow localhost development with "unlimited" mode.
        // This authorizes this dapp to control notification subscriptions for all domains (including `app.example.com`), not just `window.location.host`
        isLimited: false
    })

    const { account, setAccount, isRegistered, isRegistering, register } = useW3iAccount()
    useEffect(() => {
        if (!address) return
        // Convert the address into a CAIP-10 blockchain-agnostic account ID and update the Web3Inbox SDK with it
        setAccount(`eip155:1:${address}`)
    }, [address, setAccount])

    // In order to authorize the dapp to control subscriptions, the user needs to sign a SIWE message which happens automatically when `register()` is called.
    // Depending on the configuration of `domain` and `isLimited`, a different message is generated.
    const performRegistration = useCallback(async () => {
        if (!address) return
        try {
            await register(message => signMessageAsync({ message }))
        } catch (registerIdentityError) {
            alert(registerIdentityError)
        }
    }, [signMessageAsync, register, address])

    useEffect(() => {
        // Register even if an identity key exists, to account for stale keys
        performRegistration()
    }, [])

    const { isSubscribed, isSubscribing, subscribe } = useManageSubscription()

    const performSubscribe = useCallback(async () => {
        // Register again just in case
        await performRegistration()
        await subscribe()
    }, [subscribe, isRegistered, performRegistration])

    const { subscription } = useSubscription()
    const { messages } = useMessages()



  return (
<div className="grid grid-cols-5 gap-4 p-4 bg-slate-200 rounded-xl shadow-xl font-nebula">


  <h2 className="col-span-5 text-center text-4xl font-bold text-black">
    Create a Feed
  </h2>

    {/* Insert Contract Address */}
    <div className="col-span-3 col-start-2 justify-center text-center items-center">
      <div className='flex flex-col gap-1'>
        <h3 className='font-bold'>Get Contract</h3>
        <Input type="any" placeholder="Contract Address" className='text-center' />
      </div>
    </div>


    {/* Label spans 2 columns, select dropdown spans 3 */}
    <div className="col-span-3 col-start-2 justify-center text-center items-center">
      <div className='flex flex-col gap-1'>
          <h3 className='font-bold'>Get Contract</h3>
          <Select>
            <SelectTrigger className="justify-center text-center items-center">
              <SelectValue placeholder="Function" className="justify-center text-center items-center"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balance">getBalance</SelectItem>
              <SelectItem value="query">getQuery</SelectItem>
              <SelectItem value="pussy">getPussy</SelectItem>
            </SelectContent>
          </Select>
      </div>
    </div>


    {/* Request Button */}
    <div className="col-span-3 col-start-2 justify-center text-center items-center font-bold">
    
    {!isSubscribed ? (
      <>
      <Button onClick={performSubscribe} disabled={isSubscribing}>
      {isSubscribing ? 'Subscribing...' : 'Subscribe to notifications'}
      </Button>
      </>
      ) : (
      <>
          <div>You are subscribed</div>
          <div>Subscription: {JSON.stringify(subscription)}</div>
          <div>Messages: {JSON.stringify(messages)}</div>
      </>
      )}

    </div>


</div>
  );
};

export default CreateFeed;
import { useState, useCallback } from 'react';
import { useW3iAccount } from '@web3inbox/widget-react';
import { INotification } from '@/lib/types';
import { sendNotification } from '@/lib/fetchNotify';
import toast from 'react-hot-toast';

function useSendNotification() {
  const [isSending, setIsSending] = useState<boolean>(false);
  const { account } = useW3iAccount();

  const handleSendNotification = useCallback(
    async (notification: INotification) => {
      if (!account) {
        return;
      }
      setIsSending(true);
      try {
        const { success, message } = await sendNotification({
          accounts: [account],
          notification,
        });
        setIsSending(false);

        if (success) {
          toast.success(notification.title, {
            position: 'top-center',
          });
        } else {
          toast.error(message || 'Message failed.', {
            position: 'top-center',
          });
        }
      } catch (error: any) {
        setIsSending(false);
        console.error({ sendNotificationError: error });
        toast.error(error.message || 'An unexpected error occurred.', {
          position: 'top-center',
        });
      }
    },
    [account]
  );

  return {
    handleSendNotification,
    isSending,
  };
}

export default useSendNotification;

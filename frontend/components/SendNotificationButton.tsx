import useSendNotification from "@/lib/hooks/useSendNotification";
import { INotification } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useW3iAccount } from "@web3inbox/widget-react";
import { Subs_Icon } from "./icons/Subs_Icon";

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN;
export function SendNotificationButton() {
    const { handleSendNotification, isSending } = useSendNotification();
    const { account } = useW3iAccount();

    const testNotification: INotification = {
        title: "Test Notification",
        body: "This is a test notification.",
        icon: `https://${APP_DOMAIN}/ppp.png`,
        url: `https://${APP_DOMAIN}`,
        type: "055dee2f-3e83-4950-a705-0ef9ccaf832b" // type from WalletConnect Cloud
    };

    return (
        <div>
            <button onClick={() => handleSendNotification(testNotification)} disabled={isSending || !account}>
                {isSending ? "Sending..." : <Subs_Icon />}
            </button>
        </div>
    )
};

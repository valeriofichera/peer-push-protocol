import useSendNotification from "@/lib/hooks/useSendNotification";
import { INotification } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function SendNotificationButton() {
    const { handleSendNotification, isSending } = useSendNotification();

    const testNotification: INotification = {
        title: "Test Notification",
        body: "This is a test notification.",
        icon: "/ppp.png",
        url: "https://peer-push-protocol.vercel.app",
        type: "055dee2f-3e83-4950-a705-0ef9ccaf832b" // type from WalletConnect Cloud
    };

    return (
        <div>
            <Button onClick={() => handleSendNotification(testNotification)} disabled={isSending}>
                {isSending ? "Sending..." : "Send Test Notification"}
            </Button>

        </div>
    )
};

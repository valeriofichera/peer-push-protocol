import React from "react";

import { PPP } from "./icons/PPP_logo";
import { Notfication_icon } from "./icons/Notification_icon";
import { Dashboard_icon } from "./icons/Dashboard_icon";
import { MarketPlace_Icon } from "./icons/MarketPlace_Icon";
import Link from "next/link";

function Header() {
  return (
    <div className="min-w-screen flex items-center mt-5">

      <Link href="/" className="flex items-center justify-start flex-grow">
        <PPP className="h-[100px]" />
      </Link>

      <div className="flex flex-row gap-10 justify-center">
        <Link href="/Dashboard" className=" flex flex-row gap-3 items-center bg-slate-200 rounded-lg p-1">
          <Dashboard_icon className="h-[100px]" />
          Dashboard
        </Link>
        <Link href="/Notifications" className="flex flex-row gap-3 items-center bg-slate-200 rounded-lg p-1">
          <Notfication_icon className="h-[100px]" />
          My Notfications
        </Link>
        <Link href="/Marketplace" className="flex flex-row gap-3 items-center bg-slate-200 rounded-lg p-1">
          <MarketPlace_Icon className="h-[100px]" />
          Marketplace
        </Link>
      </div>

      <div className="flex items-center justify-end flex-grow">
        <w3m-button label="Connect Wallet" balance="show" />
      </div>
    </div>
  );
}

export default Header;

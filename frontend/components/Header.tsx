import React from "react";
<<<<<<< Updated upstream
import { PPP } from "@/components/Icons";
=======
import { PPP } from "./icons/PPP_logo";
import { Notfication_icon } from "./icons/Notification_icon";
import { Dashboard_icon } from "./icons/Dashboard_icon";
import { MarketPlace_Icon } from "./icons/MarketPlace_Icon";
>>>>>>> Stashed changes

function Header() {
  return (
    <div className="min-w-screen flex items-center px-10 mt-5">
      
      <div className="flex items-center justify-start flex-grow">
        <PPP className="h-[100px]"/>
      </div>

<div className="flex flex-row gap-10 justify-center">
    <a href="/Dashboard" className="flex flex-row gap-3 items-center bg-slate-200 rounded-lg p-1">
         <Dashboard_icon className="h-[100px]"/>
         Dashboard
    </a>
    <a href="/Notifications" className="flex flex-row gap-3 items-center bg-slate-200 rounded-lg p-1">
         <Notfication_icon className="h-[100px]"/>
         My Notfications
    </a>
    <a href="/Marketplace" className="flex flex-row gap-3 items-center bg-slate-200 rounded-lg p-1">
         <MarketPlace_Icon className="h-[100px]"/>
         Marketplace
    </a>
    </div>

      <div className="flex items-center justify-end flex-grow">
        <w3m-button label="Connect Wallet" balance="show" />
      </div>
    </div>
  );
}
  
export default Header;

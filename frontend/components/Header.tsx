import React from "react";
import { PPP } from "@/components/Icons";

function Header() {
  return (
    <div className="flex items-center justify-center px-10">
      <div className="flex items-center justify-start flex-grow">
      <PPP className="h-[100px]"/>
      </div>
      <div className="flex items-center justify-end flex-grow">
        <w3m-button label="Connect Wallet" balance="show" />
      </div>
    </div>
  );
}

export default Header;

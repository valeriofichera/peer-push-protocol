import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        Peanut 🥜 Notification
      </div>
      <w3m-button label="Connect Wallet" balance="show" />
    </div>
  );
}

export default Header;
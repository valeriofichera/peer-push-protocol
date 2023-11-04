// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "../lib/forge-std/src/Script.sol";
import {PeerPushProtocol} from "../src/PeerPushProtocol.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        PeerPushProtocol ppp = new PeerPushProtocol();

        vm.stopBroadcast();
    }
}


contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
    }
}

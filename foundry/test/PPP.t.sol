// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Test, console2} from "../lib/forge-std/src/Test.sol";
import {PeerPushProtocol} from "../src/PeerPushProtocol.sol";

contract PeerPushProtocolTest is Test {
    PeerPushProtocol public ppp;

    function setUp() public {
        ppp = new PeerPushProtocol();
        ppp.setNumber(0);
    }

    function test_Increment() public {
        ppp.increment();
        assertEq(ppp.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        ppp.setNumber(x);
        assertEq(ppp.number(), x);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/PeerPushProtocol.sol";

contract PeerPushProtocolTest is Test {
    PeerPushProtocol private ppp;

    function setUp() public {
        ppp = new PeerPushProtocol();
    }

    function testInitialSupply() public {
        uint256 initialSupply = ppp.INITIAL_SUPPLY();
        assertEq(
            ppp.balanceOf(address(ppp)),
            initialSupply,
            "Initial supply should be minted to the contract itself"
        );
    }

    function testClaimTokens() public {
        address user = address(0x1);
        vm.prank(user);
        ppp.claimTokens();
        assertEq(
            ppp.balanceOf(user),
            10000 ether,
            "User should have 10000 PPP after claiming"
        );
    }

    function testFailClaimTokensTwice() public {
        address user = address(0x2);
        vm.prank(user);
        ppp.claimTokens();
        vm.prank(user);
        ppp.claimTokens(); // This should fail
    }

    function testDeposit() public {
        // Arrange
        uint256 depositAmount = 10000 ether;
        vm.startPrank(address(0x1));

        // Act
        ppp.claimTokens();
        ppp.approve(address(ppp), depositAmount);
        ppp.deposit(depositAmount);

        // Assert
        assertEq(
            ppp.addressToDepositedTokens(address(1)),
            depositAmount,
            "User should have 10000 PPP after depositing"
        );

        vm.stopPrank();
    }

    function testWithdraw() public {
        // Arrange
        uint256 depositAmount = 10000 ether;
        uint256 withdrawAmount = 5000 ether;

        vm.startPrank(address(0x1));

        // Act
        ppp.claimTokens();
        ppp.approve(address(ppp), depositAmount);
        ppp.deposit(depositAmount);

        // Try to withdraw tokens
        ppp.withdraw(withdrawAmount);

        // Assert
        // Check the balance of deposited tokens after withdrawal
        uint256 remainingBalance = ppp.addressToDepositedTokens(address(1));
        assertEq(remainingBalance, depositAmount - withdrawAmount);

        vm.stopPrank();
    }
}

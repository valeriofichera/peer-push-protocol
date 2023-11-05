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

    function testDepositTokens() public {
        // Arrange
        uint256 depositAmount = 10000 ether;
        vm.startPrank(address(0x1));

        // Act
        ppp.claimTokens();
        ppp.approve(address(ppp), depositAmount);
        ppp.depositTokens(depositAmount);

        // Assert
        assertEq(
            ppp.addressToDepositedTokens(address(1)),
            depositAmount,
            "User should have 10000 PPP after depositing"
        );

        vm.stopPrank();
    }

    function testWithdrawTokens() public {
        // Arrange
        uint256 depositAmount = 10000 ether;
        uint256 withdrawAmount = 5000 ether;

        vm.startPrank(address(0x1));

        // Act
        ppp.claimTokens();
        ppp.approve(address(ppp), depositAmount);
        ppp.depositTokens(depositAmount);

        // Try to withdraw tokens
        ppp.withdrawTokens(withdrawAmount);

        // Assert
        // Check the balance of deposited tokens after withdrawal
        uint256 remainingBalance = ppp.addressToDepositedTokens(address(1));
        assertEq(remainingBalance, depositAmount - withdrawAmount);

        vm.stopPrank();
    }

    function testCreatePushRequest() public {
        // Arrange
        address contractAddress = address(0x1);
        string memory functionName = "getPrice";
        uint256 pushReward = 10 ether;
        uint256 updateInterval = 60;
        vm.startPrank(address(0x1));

        // Act
        ppp.claimTokens();
        ppp.approve(address(ppp), 1000 ether);
        ppp.depositTokens(1000 ether);

        ppp.createPushRequest(
            contractAddress,
            functionName,
            pushReward,
            updateInterval
        );

        // Assert
        assertEq(ppp.addressToDepositedTokens(address(0x1)), 1000 ether);
        assertEq(ppp.getPushRequests().length, 1);

        // Check the values of the push request
        PeerPushProtocol.PushRequest memory pushRequest = ppp.getPushRequests()[
            0
        ];
        assertEq(pushRequest.contractAddress, contractAddress);
        assertEq(pushRequest.functionName, functionName);
        assertEq(pushRequest.pushReward, pushReward);
        assertEq(pushRequest.updateInterval, updateInterval);

        vm.stopPrank();
    }

    function testDisablePushRequest() public {
        // Arrange
        address contractAddress = address(0x1);
        string memory functionName = "getPrice";
        uint256 pushReward = 10 ether;
        uint256 updateInterval = 60;
        vm.startPrank(address(0x1));

        // Act
        ppp.claimTokens();
        ppp.approve(address(ppp), 1000 ether);
        ppp.depositTokens(1000 ether);

        ppp.createPushRequest(
            contractAddress,
            functionName,
            pushReward,
            updateInterval
        );

        // Assert
        assertEq(ppp.addressToDepositedTokens(address(0x1)), 1000 ether);
        assertEq(ppp.getPushRequests().length, 1);

        // Check the values of the push request
        PeerPushProtocol.PushRequest memory pushRequest = ppp.getPushRequests()[
            0
        ];
        assertEq(pushRequest.contractAddress, contractAddress);
        assertEq(pushRequest.functionName, functionName);
        assertEq(pushRequest.pushReward, pushReward);
        assertEq(pushRequest.updateInterval, updateInterval);
        assertEq(pushRequest.active, true);

        // Act
        ppp.disablePushRequest(0);

        // Assert
        assertEq(ppp.getPushRequests()[0].active, false);

        vm.stopPrank();
    }

    function testFulfilPushRequest() public {
        // Arrange
        address contractAddress = address(0x1);
        string memory functionName = "getPrice";
        uint256 pushReward = 10 ether;
        uint256 updateInterval = 60;

        vm.startPrank(address(0x1));
        ppp.claimTokens();
        ppp.approve(address(ppp), 1000 ether);
        ppp.depositTokens(1000 ether);

        // Act
        ppp.createPushRequest(
            contractAddress,
            functionName,
            pushReward,
            updateInterval
        );

        // Assert
        assertEq(ppp.addressToDepositedTokens(address(0x1)), 1000 ether);
        assertEq(ppp.getPushRequests().length, 1);

        // Check the values of the push request
        PeerPushProtocol.PushRequest memory pushRequest = ppp.getPushRequests()[
            0
        ];
        assertEq(pushRequest.contractAddress, contractAddress);
        assertEq(pushRequest.functionName, functionName);
        assertEq(pushRequest.pushReward, pushReward);
        assertEq(pushRequest.updateInterval, updateInterval);
        assertEq(pushRequest.active, true);
        vm.stopPrank();

        // Act
        vm.startPrank(address(0x2));
        // set the time to 90 seconds after the push request was created
        vm.warp(90);

        ppp.fulfilPushRequest(0);

        // Assert
        assertEq(ppp.addressToDepositedTokens(address(0x2)), 10 ether);
        assertEq(ppp.addressToDepositedTokens(address(0x1)), 990 ether);

        // Act
        ppp.withdrawTokens(10 ether);

        // Assert
        assertEq(ppp.addressToDepositedTokens(address(0x2)), 0 ether);
        assertEq(ppp.balanceOf(address(0x2)), 10 ether);

        vm.stopPrank();
    }
}

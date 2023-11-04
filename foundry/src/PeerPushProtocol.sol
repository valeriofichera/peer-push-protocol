// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract PeerPushProtocol {
    struct Request {
        uint256 id;
        address sender;
        uint256 reward;
    }

    Request[] public requests;


    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}

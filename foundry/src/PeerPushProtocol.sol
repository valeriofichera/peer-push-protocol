// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/*
 * PeerPushProtocol.sol
 * Peer Push Protocol (PPP) is a protocol for incentivizing the pushing of data
 * into an aggregator contract which can then be used as a notification system
 * for on or pff-chain push notificaitons.
 */
contract PeerPushProtocol is ERC20, ERC20Permit {
    constructor()
        ERC20("PeerPushProtocol", "PPP")
        ERC20Permit("PeerPushProtocol")
    {}

    mapping(address => bool) public hasClaimedTokens;
    mapping(address => uint256) public addressToDepositedTokens;
    mapping(address => uint256[]) public addressToPushRequestIds;

    struct PushRequest {
        uint256 id;
        address sender;
        address contractAddress;
        string functionSignature;
        bytes currentState;
        uint256 pushReward;
        uint256 lastRefresh;
        uint256 refreshInterval;
        bool active;
    }

    PushRequest[] public requests;

    /* claim tokens if you have not already */
    function claimTokens() public {
        require(!hasClaimedTokens[msg.sender], "already claimed tokens");

        uint256 claimAmount = 10000 ether; // Set the claim amount per user
        require(
            balanceOf(address(this)) >= claimAmount,
            "Insufficient contract balance"
        );

        // mark the sender as having claimed tokens
        hasClaimedTokens[msg.sender] = true;

        // Transfer tokens to the sender from the contract
        _transfer(address(this), msg.sender, claimAmount);
    }

    /* deposit PPP tokens into the contract
     * @param amount the amount of PPP tokens to deposit
     */
    function deposit(uint256 amount) public {
        transferFrom(msg.sender, address(this), amount);

        addressToDepositedTokens[msg.sender] += amount;
    }

    /* withdraw PPP tokens from the contract
     * @param amount the amount of PPP tokens to withdraw
     */
    function withdraw(uint256 amount) public {
        require(
            addressToDepositedTokens[msg.sender] >= amount,
            "Insufficient balance"
        );

        addressToDepositedTokens[msg.sender] -= amount;

        _transfer(address(this), msg.sender, amount);
    }

    /* create a new PushRequest
     * @param _contractAddress the address of the contract to call
     * @param _functionSignature the name of the function to call i.e "getPrice()"
     * @param _pushReward the amount of PPP to send to the sender when the pushRequest is refreshed
     * @param _refreshInterval the amount of time in seconds between refreshes
     */
    function createPushRequest(
        address _contractAddress,
        string memory _functionSignature,
        uint256 _pushReward,
        uint256 _refreshInterval
    ) public {
        // call the function to get the initial state
        bytes memory returnData = readContract(
            _contractAddress,
            _functionSignature
        );

        PushRequest memory pushRequest = PushRequest({
            id: requests.length,
            sender: msg.sender,
            contractAddress: _contractAddress,
            functionSignature: _functionSignature,
            currentState: returnData,
            pushReward: _pushReward,
            lastRefresh: block.timestamp,
            refreshInterval: _refreshInterval,
            active: true
        });

        // add the pushRequest to the list of requests
        requests.push(pushRequest);

        // add the pushRequest to the list of requests for the sender
        addressToPushRequestIds[msg.sender].push(pushRequest.id);
    }

    /* disable a pushRequest
     * @param _requestId the id of the pushRequest to cancel
     */
    function disableRequest(uint256 _requestId) public {
        PushRequest storage pushRequest = requests[_requestId];

        // check that the pushRequest is active
        require(pushRequest.active, "pushRequest is inactive");

        // check that the sender is the owner of the pushRequest
        require(pushRequest.sender == msg.sender, "sender is not the owner");

        // disable the pushRequest
        pushRequest.active = false;
    }

    /* enable a pushRequest
     * @param _requestId the id of the pushRequest to enable
     */
    function enableRequest(uint256 _requestId) public {
        PushRequest storage pushRequest = requests[_requestId];

        // check that the pushRequest is inactive
        require(!pushRequest.active, "pushRequest is active");

        // check that the sender is the owner of the pushRequest
        require(pushRequest.sender == msg.sender, "sender is not the owner");

        // enable the pushRequest
        pushRequest.active = true;
    }

    /* refresh the state of a pushRequest
     * @param _requestId the id of the pushRequest to refresh
     */
    function refreshRequest(uint256 _requestId) public {
        PushRequest storage pushRequest = requests[_requestId];

        // check that the PushRequest is active
        require(pushRequest.active, "PushRequest is inactive");

        // check that the refresh interval has passed
        require(
            block.timestamp - pushRequest.lastRefresh >=
                pushRequest.refreshInterval,
            "refresh interval has not passed"
        );

        // Check if the PushRequest sender has enough deposited tokens for the reward
        require(
            addressToDepositedTokens[pushRequest.sender] >=
                pushRequest.pushReward,
            "Insufficient balance to reward"
        );

        // call the function to get the initial state
        bytes memory returnData = readContract(
            pushRequest.contractAddress,
            pushRequest.functionSignature
        );

        // update the pushRequest
        pushRequest.currentState = returnData;
        pushRequest.lastRefresh = block.timestamp;

        // Deduct the reward from the sender's deposited balance
        addressToDepositedTokens[pushRequest.sender] -= pushRequest.pushReward;

        // Transfer the reward to the caller of the refreshRequest function
        _transfer(address(this), msg.sender, pushRequest.pushReward);
    }

    /* get the current state of a pushRequest
     * @param _requestId the id of the pushRequest to get the state of
     */
    function getPushRequestState(
        uint256 _requestId
    ) public view returns (bytes memory) {
        PushRequest storage pushRequest = requests[_requestId];

        return pushRequest.currentState;
    }

    /* get all requests
     */
    function getPushRequests() public view returns (PushRequest[] memory) {
        return requests;
    }

    /* read the current state of a function on another contract
     * @param _contractAddress the address of the contract to call
     * @param _functionSignature the name of the function to call
     */
    function readContract(
        address _contractAddress,
        string memory _functionSignature
    ) internal returns (bytes memory) {
        // call the function to get the initial state
        (bool success, bytes memory returnData) = _contractAddress.call(
            abi.encodeWithSignature(_functionSignature)
        );

        require(success, "call failed");

        return returnData;
    }
}

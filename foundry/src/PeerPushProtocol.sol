// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/*
 * PeerPushProtocol.sol
 * Peer Push Protocol (PPP) is a protocol for incentivizing the pushing of data
 * into an aggregator contract which can then be easily used on or off-chain.
 */
contract PeerPushProtocol is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 10000000000 ether;

    constructor() ERC20("PeerPushProtocol", "PPP") {
        // Mint the total supply to the contract itself
        _mint(address(this), INITIAL_SUPPLY);
    }

    mapping(address => bool) public hasClaimedTokens;
    mapping(address => uint256) public addressToDepositedTokens;
    mapping(address => uint256[]) public addressToPushRequestIds;

    struct PushRequest {
        uint256 id;
        address creator;
        address contractAddress;
        string functionName;
        bytes currentState;
        uint256 pushReward;
        uint256 lastUpdate;
        uint256 updateInterval;
        bool active;
    }

    PushRequest[] public pushRequests;

    /* claim tokens if you have not already */
    function claimTokens() public {
        require(!hasClaimedTokens[msg.sender], "already claimed tokens");

        uint256 claimAmount = 10000 ether;
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
    function depositTokens(uint256 amount) public {
        // Check the balance
        require(
            balanceOf(msg.sender) >= amount,
            "Insufficient balance to deposit"
        );

        // Transfer the tokens from the sender to the contract
        require(
            this.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        // Update the deposited balance
        addressToDepositedTokens[msg.sender] += amount;
    }

    /* withdraw PPP tokens from the contract
     * @param amount the amount of PPP tokens to withdraw
     */
    function withdrawTokens(uint256 amount) public {
        require(
            addressToDepositedTokens[msg.sender] >= amount,
            "Insufficient balance"
        );

        addressToDepositedTokens[msg.sender] -= amount;

        _transfer(address(this), msg.sender, amount);
    }

    /* create a new PushRequest
     * @param _contractAddress the address of the contract to call
     * @param _functionName the name of the function to call i.e "getPrice"
     * @param _pushReward the amount of PPP to send to the fulfiller when the pushRequest is updateed
     * @param _updateInterval the amount of time in seconds between updatees
     */
    function createPushRequest(
        address _contractAddress,
        string memory _functionName,
        uint256 _pushReward,
        uint256 _updateInterval
    ) public {
        // Check if the PushRequest creator has enough deposited tokens for the reward
        require(
            addressToDepositedTokens[msg.sender] >= _pushReward,
            "Insufficient depositedToken balance to reward"
        );

        // call the function to get the initial state
        bytes memory returnData = readContract(_contractAddress, _functionName);

        PushRequest memory pushRequest = PushRequest({
            id: pushRequests.length,
            creator: msg.sender,
            contractAddress: _contractAddress,
            functionName: _functionName,
            currentState: returnData,
            pushReward: _pushReward,
            lastUpdate: block.timestamp,
            updateInterval: _updateInterval,
            active: true
        });

        // add the pushRequest to the list of pushRequests
        pushRequests.push(pushRequest);

        // add the pushRequest to the list of pushRequests for the sender
        addressToPushRequestIds[msg.sender].push(pushRequest.id);
    }

    /* disable a pushRequest
     * @param _pushRequestId the id of the pushRequest to cancel
     */
    function disablePushRequest(uint256 _pushRequestId) public {
        PushRequest storage pushRequest = pushRequests[_pushRequestId];

        // check that the pushRequest is active
        require(pushRequest.active, "pushRequest is inactive");

        // check that msg.sender is the owner of the pushRequest
        require(pushRequest.creator == msg.sender, "You are not the owner");

        // disable the pushRequest
        pushRequest.active = false;
    }

    /* enable a pushRequest
     * @param _pushRequestId the id of the pushRequest to enable
     */
    function enablePushRequest(uint256 _pushRequestId) public {
        PushRequest storage pushRequest = pushRequests[_pushRequestId];

        // check that the pushRequest is inactive
        require(!pushRequest.active, "pushRequest is active");

        // check that the sender is the owner of the pushRequest
        require(pushRequest.creator == msg.sender, "sender is not the owner");

        // enable the pushRequest
        pushRequest.active = true;
    }

    /* update the state of a pushRequest
     * @param _pushRequestId the id of the pushRequest to update
     */
    function fulfilPushRequest(uint256 _pushRequestId) public {
        PushRequest storage pushRequest = pushRequests[_pushRequestId];

        // check that the PushRequest is active
        require(pushRequest.active, "PushRequest is inactive");

        // check that the update interval has passed
        require(
            block.timestamp - pushRequest.lastUpdate >=
                pushRequest.updateInterval,
            "update interval has not passed"
        );

        // Check if the PushRequest creator has enough deposited tokens for the reward
        require(
            addressToDepositedTokens[pushRequest.creator] >=
                pushRequest.pushReward,
            "Insufficient balance to reward"
        );

        // call the function to get the initial state
        bytes memory returnData = readContract(
            pushRequest.contractAddress,
            pushRequest.functionName
        );

        // update the pushRequest
        pushRequest.currentState = returnData;
        pushRequest.lastUpdate = block.timestamp;

        // Deduct the reward from the pushRequest creator's deposited balance
        addressToDepositedTokens[pushRequest.creator] -= pushRequest.pushReward;

        // add the reward to msg.sender's deposited balance
        addressToDepositedTokens[msg.sender] += pushRequest.pushReward;
    }

    /* get the current state of a pushRequest
     * @param _pushRequestId the id of the pushRequest to get the state of
     */
    function getPushRequestState(
        uint256 _pushRequestId
    ) public view returns (bytes memory) {
        PushRequest storage pushRequest = pushRequests[_pushRequestId];

        return pushRequest.currentState;
    }

    /* get all pushRequests
     */
    function getPushRequests() public view returns (PushRequest[] memory) {
        return pushRequests;
    }

    /* read the current state of a function on another contract
     * @param _contractAddress the address of the contract to call
     * @param _functionName the name of the function to call
     */
    function readContract(
        address _contractAddress,
        string memory _functionName
    ) internal returns (bytes memory) {
        // call the function to get the initial state
        (bool success, bytes memory returnData) = _contractAddress.call(
            abi.encodeWithSignature(string.concat(_functionName, "()"))
        );

        require(success, "call failed");

        return returnData;
    }
}

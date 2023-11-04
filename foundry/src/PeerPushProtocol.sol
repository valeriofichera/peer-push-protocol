// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/*
 * PeerPushProtocol.sol
 *
 * This contract implements the Peer Push Protocol (PPP) as described in the
 * paper "Peer Push Protocol: Decentralized Data Delivery in the Web3" by
 * Michael Sproul, et al.
 *
 * The PPP is a protocol for pushing data to peers in a decentralized manner.
 * It is designed to be used in conjunction with the Forge framework, but can
 * be used independently.
 */
contract PeerPushProtocol {
    struct Request {
        uint256 id;
        address sender;
        address contractAddress;
        string functionName;
        bytes currentState;
        uint256 pushReward;
        uint256 lastRefresh;
        uint256 refreshInterval;
        bool active;
    }

    Request[] public requests;

    /* create a new request
     * @param _contractAddress the address of the contract to call
     * @param _functionName the name of the function to call
     */
    function createRequest(
        address _contractAddress,
        string memory _functionName,
        uint256 _pushReward,
        uint256 _refreshInterval
    ) public {
        // call the function to get the initial state
        bytes memory returnData = readContract(_contractAddress, _functionName);

        Request memory request = Request({
            id: requests.length,
            sender: msg.sender,
            contractAddress: _contractAddress,
            functionName: _functionName,
            currentState: returnData,
            pushReward: _pushReward,
            lastRefresh: block.timestamp,
            refreshInterval: _refreshInterval,
            active: true
        });

        // add the request to the list of requests
        requests.push(request);
    }

    /* disable a request
     * @param _requestId the id of the request to cancel
     */
    function disableRequest(uint256 _requestId) public {
        Request storage request = requests[_requestId];

        // check that the request is active
        require(request.active, "request is inactive");

        // check that the sender is the owner of the request
        require(request.sender == msg.sender, "sender is not the owner");

        // disable the request
        request.active = false;
    }

    /* refresh the state of a request
     * @param _requestId the id of the request to refresh
     */
    function refreshRequest(uint256 _requestId) public {
        Request storage request = requests[_requestId];

        // check that the request is active
        require(request.active, "request is inactive");

        // check that the refresh interval has passed
        require(
            block.timestamp - request.lastRefresh >= request.refreshInterval,
            "refresh interval has not passed"
        );

        // call the function to get the initial state
        bytes memory returnData = readContract(
            request.contractAddress,
            request.functionName
        );

        // update the request
        request.currentState = returnData;
        request.lastRefresh = block.timestamp;

        //TODO: implement
        // send the reward to the sender
        // payable(request.sender).transfer(request.pushReward);
    }

    /* get the current state of a request
     * @param _requestId the id of the request to get the state of
     */
    function getRequestState(
        uint256 _requestId
    ) public view returns (bytes memory) {
        Request storage request = requests[_requestId];

        return request.currentState;
    }

    /* get all requests
     */
    function getRequests() public view returns (Request[] memory) {
        return requests;
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
            abi.encodeWithSignature(_functionName)
        );

        require(success, "call failed");

        return returnData;
    }
}

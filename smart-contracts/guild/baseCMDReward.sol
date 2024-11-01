//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./party.sol";

contract baseCMDReward is Ownable {
    party partyHub;
    mapping(uint256 => address) public programCall;
    uint256 public startBlock;
    uint256 public endBlock;
    mapping(address => uint256) public cmpow;
    mapping(address => uint256) public baseReward;

    event ConfirmDelegate(uint256 indexed partyIndex, uint256 indexed endBlock, uint256 refuelAt);
    
    constructor(address _party) Ownable(msg.sender) {
        partyHub = party(_party);
    }

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }
    
    function withdrawReward(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    function setEpoch(uint256 _startBlock, uint256 _endBlock) external onlyOwner { 
        startBlock = _startBlock;
        endBlock = _endBlock;
    }

    function confirmDelegate(uint256 _partyIndex) external { 
        (address member1,,,,, uint256 refuelAt) = partyHub.partyBody(_partyIndex);
        require(refuelAt > startBlock && refuelAt <= endBlock, "Plz refuel again");
        require(msg.sender == member1, "No permission");
        emit ConfirmDelegate(_partyIndex, endBlock, refuelAt);
    }

    function setCmpow(address _addr, uint256 _cmpow) external onlyOwner { 
        cmpow[_addr] = _cmpow;
    }

    function setReward(
        uint256 _callIndex,
        address _addr,
        uint256 _amount
    ) external { 
        require(msg.sender == programCall[_callIndex], "No Permission!");
        baseReward[_addr] = _amount;
    }

    function claimReward(address _addr) external {
        payable(_addr).transfer(baseReward[_addr]);
    }

    fallback() external payable {}
    receive() external payable {}
}
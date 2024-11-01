//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract baseCMDStat is Ownable {
    mapping(uint256 => mapping(uint256 => uint256)) public baseReward;
    uint256 public currEpoch;
    
    constructor() Ownable(msg.sender) {}

    function setReward(
        uint256 _partyIndex,
        uint256 _amount,
        uint256 _epoch
    ) external onlyOwner { 
        baseReward[_partyIndex][_epoch] = _amount;
    }

    function setCurrEpoch(uint256 _epoch) external onlyOwner { 
        currEpoch = _epoch;
    }
}
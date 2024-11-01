//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./baseCMDReward.sol";

contract baseCMDClaimer is Ownable {
    baseCMDReward baseCMD;
    mapping(address => uint256) public claimedReward;
    
    constructor(address payable _baseCMD) Ownable(msg.sender) {
        baseCMD = baseCMDReward(_baseCMD);
    }

    function claimReward(address _addr) external {
        require(claimedReward[_addr] < baseCMD.baseReward(_addr), "Reach claim limit");
        uint256 claimAmount = baseCMD.baseReward(_addr) - claimedReward[_addr];
        claimedReward[_addr] += claimAmount;

        payable(_addr).transfer(claimAmount);
    }

    fallback() external payable {}
    receive() external payable {}
}
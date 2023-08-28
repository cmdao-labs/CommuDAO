// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/commudao-labs/CommuDAO/blob/main/smart-contracts/ERC20-labs/BBQ.sol";
import "https://github.com/commudao-labs/CommuDAO/blob/main/smart-contracts/ERC20-labs/BBQ_Factory01.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CMDAO_CoreQuest_BBQ is Ownable, ReentrancyGuard {
    address public bbq;
    address public bbqFactory;
    mapping(uint256=>address) public programCall;
    uint256 public baseReward;
    mapping(address=>uint256) public questComplete;
    mapping(address=>uint256) public questLastStamp;

    constructor(address _bbq, address _bbqFactory, uint256 _reward) {
        bbq = _bbq;
        bbqFactory = _bbqFactory;
        baseReward = _reward;
    }

    function setBaseReward(uint256 _reward) external onlyOwner {
        baseReward = _reward;
    }
    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function claim(uint256 _callIndex, uint256 _factorReward, address _quester) external nonReentrant {
        require(_callIndex == 0 || msg.sender == programCall[_callIndex], "PROGRAM CALL: invalid contract");
        
        if (_callIndex == 0) {
            (,, uint256 laststamp) = BBQ_Factory01(bbqFactory).supplier(msg.sender);
            require(laststamp < block.timestamp + 1 days, "You are not cooking!");
            require(questLastStamp[msg.sender] + 1 days < block.timestamp, "See U TMR!");
            questComplete[msg.sender] += 1;
            questLastStamp[msg.sender] = block.timestamp;
            BBQ(bbq).mint(101, msg.sender, baseReward);
        } else {
            (,, uint256 laststamp) = BBQ_Factory01(bbqFactory).supplier(_quester);
            require(laststamp < block.timestamp + 1 days, "You are not cooking!");
            require(questLastStamp[_quester] + 1 days < block.timestamp, "See U TMR!");
            questComplete[_quester] += 1;
            questLastStamp[_quester] = block.timestamp;
            BBQ(bbq).mint(101, _quester, baseReward * _factorReward);
        }
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./gold.sol";

contract GOLD_Mine01 is ReentrancyGuard, Ownable {
    address public bbq;
    address public goldToken;

    struct Machine {
        uint256 duration;
        uint256 bbqCost;
        uint256 jbcCost;
        uint256 goldReward;
    }
    mapping(uint256=>Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    constructor(address _bbq, address _gold) {
        bbq = _bbq;
        goldToken = _gold;
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _bbqCost,
        uint256 _jbcCost,
        uint256 _goldReward
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].bbqCost = _bbqCost;
        machine[_index].jbcCost = _jbcCost;
        machine[_index].goldReward = _goldReward;
    }

    function mine(uint256 _index) external payable nonReentrant {
        require(machine[_index].goldReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");
        require(machine[_index].jbcCost == msg.value, "Insufficient JBC");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(bbq).transferFrom(msg.sender, address(1), machine[_index].bbqCost);
    }

    function obtain() external nonReentrant {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].goldReward;
        delete supplier[msg.sender].machineRun;

        gold(goldToken).mint(2, msg.sender, reward);
    }

    function withdrawJbc(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount / 2);
        payable(address(0)).transfer(_amount - (_amount / 2));
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BBQ.sol";

contract BBQ_Factory01 is ReentrancyGuard, Ownable {
    address public wood;
    address public bbq;

    struct Machine {
        bool active;
        uint256 duration;
        uint256 woodCost;
        uint256 jbcCost;
        uint256 bbqReward;
    }
    mapping(uint256=>Machine) public machine;

    struct Log {
        bool isCraft;
        uint256 machineIndex;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    constructor(address _wood, address _bbq) {
        wood = _wood;
        bbq = _bbq;
    }

    function setMachine(
        uint256 _index,
        bool _active,
        uint256 _durationInMin,
        uint256 _woodCost,
        uint256 _jbcCost,
        uint256 _bbqReward
    ) external onlyOwner {
        machine[_index].active = _active;
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].woodCost = _woodCost;
        machine[_index].jbcCost = _jbcCost;
        machine[_index].bbqReward = _bbqReward;
    }

    function withdrawJbc(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    function craft(uint256 _machineIndex) external payable nonReentrant {
        require(machine[_machineIndex].active, "Inactive Machine");
        require(!supplier[msg.sender].isCraft, "Under Production");
        require(machine[_machineIndex].jbcCost == msg.value, "Insufficient JBC");

        supplier[msg.sender].isCraft = true;
        supplier[msg.sender].machineIndex = _machineIndex;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(wood).transferFrom(msg.sender, address(1), machine[_machineIndex].woodCost);
    }

    function obtain(uint256 _machineIndex) external nonReentrant {
        require(supplier[msg.sender].machineIndex == _machineIndex, "Mismatch machine");
        require(supplier[msg.sender].isCraft, "No production");
        require(supplier[msg.sender].laststamp + machine[_machineIndex].duration < block.timestamp, "Under Production");

        delete supplier[msg.sender].isCraft;
        delete supplier[msg.sender].machineIndex;

        BBQ(bbq).mint(1, msg.sender, machine[_machineIndex].bbqReward);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./gold.sol";

contract GOLD_Factory02 is ReentrancyGuard, Ownable {
    address public wood;
    address public mt;
    address public goldToken;

    struct Machine {
        uint256 duration;
        uint256 woodCost;
        uint256 mtCost;
        uint256 goldReward;
    }
    mapping(uint256 => Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address => Log) public supplier;

    constructor(
        address _wood,
        address _mt,
        address _gold
    ) {
        wood = _wood;
        mt = _mt;
        goldToken = _gold;
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _woodCost,
        uint256 _mtCost,
        uint256 _goldReward
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].woodCost = _woodCost;
        machine[_index].mtCost = _mtCost;
        machine[_index].goldReward = _goldReward;
    }

    function craft(uint256 _index) external nonReentrant {
        require(machine[_index].goldReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(wood).transferFrom(msg.sender, address(1), machine[_index].woodCost);
        ERC20(mt).transferFrom(msg.sender, address(1), machine[_index].mtCost);
    }

    function obtain() external nonReentrant {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].goldReward;
        delete supplier[msg.sender].machineRun;

        gold(goldToken).mint(5, msg.sender, reward);
    }
}
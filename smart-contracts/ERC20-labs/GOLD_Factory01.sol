// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./gold.sol";

contract GOLD_Factory01 is ReentrancyGuard, Ownable {
    address public sil;
    address public sx31;
    address public goldToken;

    struct Machine {
        uint256 duration;
        uint256 silCost;
        uint256 sx31Cost;
        uint256 goldReward;
    }
    mapping(uint256=>Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    constructor(
        address _sil,
        address _sx31,
        address _gold
    ) {
        sil = _sil;
        sx31 = _sx31;
        goldToken = _gold;
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _silCost,
        uint256 _sx31Cost,
        uint256 _goldReward
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].silCost = _silCost;
        machine[_index].sx31Cost = _sx31Cost;
        machine[_index].goldReward = _goldReward;
    }

    function craft(uint256 _index) external nonReentrant {
        require(machine[_index].goldReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(sil).transferFrom(msg.sender, address(1), machine[_index].silCost);
        ERC20(sx31).transferFrom(msg.sender, address(1), machine[_index].sx31Cost);
    }

    function obtain() external nonReentrant {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].goldReward;
        delete supplier[msg.sender].machineRun;

        gold(goldToken).mint(1, msg.sender, reward);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./silver.sol";

contract SIL_Factory01 is ReentrancyGuard, Ownable {
    address public cu;
    address public cmj;
    address public sil;

    struct Machine {
        uint256 duration;
        uint256 cuCost;
        uint256 cmjCost;
        uint256 silReward;
    }
    mapping(uint256=>Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    constructor(
        address _cu,
        address _cmj,
        address _sil
    ) {
        cu = _cu;
        cmj = _cmj;
        sil = _sil;
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _cuCost,
        uint256 _cmjCost,
        uint256 _silReward
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].cuCost = _cuCost;
        machine[_index].cmjCost = _cmjCost;
        machine[_index].silReward = _silReward;
    }

    function withdrawCmj(uint256 _amount, address _to) external onlyOwner {
        ERC20(cmj).transfer(_to ,_amount);
    }

    function craft(uint256 _index) external nonReentrant {
        require(machine[_index].silReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(cu).transferFrom(msg.sender, address(1), machine[_index].cuCost);
        ERC20(cmj).transferFrom(msg.sender, address(this), machine[_index].cmjCost);
    }

    function obtain() external nonReentrant {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].silReward;
        delete supplier[msg.sender].machineRun;

        silver(sil).mint(1, msg.sender, reward);
    }
}
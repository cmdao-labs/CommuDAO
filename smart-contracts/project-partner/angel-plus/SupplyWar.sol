// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplyWar is ERC20, Ownable {
    address public vabag;
    address public cmj;

    struct Machine {
        uint256 duration;
        uint256 vabagCost;
        uint256 cmjCost;
        uint256 swarReward;
    }
    mapping(uint256=>Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    constructor(address _vabag, address _cmj) ERC20("Supply War", "SWAR") {
        vabag = _vabag;
        cmj = _cmj;
    }

    function withdrawCmj(uint256 _amount, address _to) external onlyOwner {
        ERC20(cmj).transfer(_to, _amount);
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _vabagCost,
        uint256 _cmjCost,
        uint256 _swarReward
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].vabagCost = _vabagCost;
        machine[_index].cmjCost = _cmjCost;
        machine[_index].swarReward = _swarReward;
    }

    function craft(uint256 _index) external {
        require(machine[_index].swarReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(vabag).transferFrom(msg.sender, address(1), machine[_index].vabagCost);
        ERC20(cmj).transferFrom(msg.sender, address(this), machine[_index].cmjCost);
    }

    function obtain() external {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].swarReward;
        delete supplier[msg.sender].machineRun;

        _mint(msg.sender, reward);
    }
}
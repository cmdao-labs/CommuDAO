// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol";

contract INF_GEM_Factory is ERC20, Ownable {
    address public gem;
    address public bbq;

    struct Machine {
        uint256 duration;
        uint256 gemCost;
        uint256 cmdCost;
        uint256 infpowReward;
    }
    mapping(uint256 => Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address => Log) public supplier;

    constructor(address _gem) ERC20("Infinity Power BBQ Chain", "INF-POW-BBQ") Ownable(msg.sender) {
        gem = _gem;
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _gemCost,
        uint256 _cmdCost,
        uint256 _infpowReward
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].gemCost = _gemCost;
        machine[_index].cmdCost = _cmdCost;
        machine[_index].infpowReward = _infpowReward;
    }

    function withdrawCmd(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    function craft(uint256 _index) external payable {
        require(machine[_index].infpowReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");
        require(machine[_index].cmdCost == msg.value, "Insufficient CMD");
        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        ERC20(gem).transferFrom(msg.sender, address(1), machine[_index].gemCost);
    }

    function obtain() external {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");
        uint256 reward = machine[supplier[msg.sender].machineRun].infpowReward;
        delete supplier[msg.sender].machineRun;
        _mint(msg.sender, reward);
    }
}
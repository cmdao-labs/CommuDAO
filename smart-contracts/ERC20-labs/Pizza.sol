// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pizza is ERC20, Ownable {
    address public stOPT;
    address public bbq;

    struct Machine {
        uint256 duration;
        uint256 stOPTCost;
        uint256 bbqCost;
        uint256 pizzaReward;
    }
    mapping(uint256=>Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    constructor(address _stOPT, address _bbq) ERC20("Pizza", "PZA") {
        stOPT = _stOPT;
        bbq = _bbq;
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _stOPTCost,
        uint256 _bbqCost,
        uint256 _pizzaReward
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].stOPTCost = _stOPTCost;
        machine[_index].bbqCost = _bbqCost;
        machine[_index].pizzaReward = _pizzaReward;
    }

    function craft(uint256 _index) external {
        require(machine[_index].pizzaReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(stOPT).transferFrom(msg.sender, address(1), machine[_index].stOPTCost);
        ERC20(bbq).transferFrom(msg.sender, address(1), machine[_index].bbqCost);
    }

    function obtain() external {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].pizzaReward;
        delete supplier[msg.sender].machineRun;

        _mint(msg.sender, reward);
    }
}
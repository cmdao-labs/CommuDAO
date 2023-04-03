// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Sphinx31 is ERC20, ReentrancyGuard {
    address public mice;
    address public cmj;
    address public projectAdmin;
    modifier onlyProjectAdmin() {
        require(msg.sender == projectAdmin, "Not Permission to call");
        _;
    }

    struct Machine {
        bool active;
        uint256 duration;
        uint256 miceCost;
        uint256 cmjCost;
        uint256 sx31Reward;
    }
    mapping(uint256=>Machine) public machine;

    struct Log {
        bool isCraft;
        uint256 machineIndex;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    constructor(address _mice, address _cmj) ERC20("Sphinx31", "SX31") {
        mice = _mice;
        cmj = _cmj;
        projectAdmin = msg.sender;
    }

    function setProjectAdmin(address _addr) external onlyProjectAdmin {
        projectAdmin = _addr;
    }

    function setMachine(
        uint256 _index,
        bool _active,
        uint256 _durationInMin,
        uint256 _miceCost,
        uint256 _cmjCost,
        uint256 _sx31Reward
    ) external onlyProjectAdmin {
        machine[_index].active = _active;
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].miceCost = _miceCost;
        machine[_index].cmjCost = _cmjCost;
        machine[_index].sx31Reward = _sx31Reward;
    }

    function withdrawCmj(uint256 _amount, address _to) external onlyProjectAdmin {
        ERC20(cmj).transfer(_to, _amount);
    }

    function craft(uint256 _machineIndex) external nonReentrant {
        require(machine[_machineIndex].active == true, "Inactive Machine");
        require(supplier[msg.sender].isCraft == false, "Under Production");

        supplier[msg.sender].isCraft = true;
        supplier[msg.sender].machineIndex = _machineIndex;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(mice).transferFrom(msg.sender, address(1), machine[_machineIndex].miceCost);
        ERC20(cmj).transferFrom(msg.sender, address(this), machine[_machineIndex].cmjCost);
    }

    function obtain(uint256 _machineIndex) external nonReentrant {
        require(supplier[msg.sender].isCraft == true, "No production");
        require(supplier[msg.sender].machineIndex == _machineIndex, "Mismatch machine");
        require(supplier[msg.sender].laststamp + machine[_machineIndex].duration < block.timestamp, "Under Production");

        delete supplier[msg.sender].isCraft;
        delete supplier[msg.sender].machineIndex;

        _mint(msg.sender, machine[_machineIndex].sx31Reward);
    }
}
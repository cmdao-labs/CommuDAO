// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Chakra.sol";

contract CMDAO_stakerMachine is ReentrancyGuard, Ownable {
    address public govToken;
    address public rewardToken;
    mapping(uint256=>address) public resources;
    mapping(address=>uint256) public staker;

    struct Machine {
        uint256 level;
        uint256 duration;
        uint256 reso1Index;
        uint256 reso1Cost;
        uint256 reso2Index;
        uint256 reso2Cost;
        uint256 reward;
    }
    mapping(uint256=>Machine) public machine;

    struct Upgrade {
        uint256 newLevel;
        uint256 reso1Index;
        uint256 reso1Req;
        uint256 reso2Index;
        uint256 reso2Req;
    }
    mapping(uint256=>Upgrade) public upgrader;

    struct Log {
        uint256 craftLevel;
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    function setGovToken(address _addr) external onlyOwner {
        govToken = _addr;
    }

    function setRewardToken(address _addr) external onlyOwner {
        rewardToken = _addr;
    }

    function setResource(uint256 _index, address _addr) external onlyOwner {
        resources[_index] = _addr;
    }

    function withdrawResource(
        uint256 _index,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(resources[_index]).transfer(_to, _amount);
    }

    function stake(uint256 _amount) external nonReentrant {
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        IERC20(govToken).transferFrom(msg.sender, address(this), _amount);
        staker[msg.sender] += _amount;
    }

    function unstake(uint256 _amount) external nonReentrant {
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        IERC20(govToken).transfer(msg.sender, _amount);
        staker[msg.sender] -= _amount;
    }

    function setMachine(
        uint256 _index,
        uint256 _level,
        uint256 _durationInMin,
        uint256 _reso1Index,
        uint256 _reso1Cost,
        uint256 _reso2Index,
        uint256 _reso2Cost,
        uint256 _reward
    ) external onlyOwner {
        machine[_index].level = _level;
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].reso1Index = _reso1Index;
        machine[_index].reso1Cost = _reso1Cost;
        machine[_index].reso2Index = _reso2Index;
        machine[_index].reso2Cost = _reso2Cost;
        machine[_index].reward = _reward;
    }

    function setUpgrader(
        uint256 _index,
        uint256 _newLevel,
        uint256 _reso1Index,
        uint256 _reso1Req,
        uint256 _reso2Index,
        uint256 _reso2Req
    ) external onlyOwner {
        upgrader[_index].newLevel = _newLevel;
        upgrader[_index].reso1Index = _reso1Index;
        upgrader[_index].reso1Req = _reso1Req;
        upgrader[_index].reso2Index = _reso2Index;
        upgrader[_index].reso2Req = _reso2Req;
    }

    function upgrade(uint256 _index) external nonReentrant {
        require(supplier[msg.sender].machineRun == 0, "Under Production");
        require(supplier[msg.sender].craftLevel + 1 == upgrader[_index].newLevel, "Level too low");
        
        if (upgrader[_index].reso1Index != 0) {
            IERC20(resources[upgrader[_index].reso1Index]).transferFrom(msg.sender, address(this), upgrader[_index].reso1Req);
        }
        if (upgrader[_index].reso2Index != 0) {
            IERC20(resources[upgrader[_index].reso2Index]).transferFrom(msg.sender, address(this), upgrader[_index].reso2Req);
        }

        supplier[msg.sender].craftLevel = upgrader[_index].newLevel;
    }

    function craft(uint256 _index) external nonReentrant {
        require(machine[_index].reward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");
        require(machine[_index].level == supplier[msg.sender].craftLevel, "Insufficient Level");

        if (machine[_index].reso1Index != 0) {
            IERC20(resources[machine[_index].reso1Index]).transferFrom(msg.sender, address(this), machine[_index].reso1Cost);
        }
        if (machine[_index].reso2Index != 0) {
            IERC20(resources[machine[_index].reso2Index]).transferFrom(msg.sender, address(this), machine[_index].reso2Cost);
        }

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
    }

    function obtain() external nonReentrant {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].reward * (staker[msg.sender] / 1e18);
        delete supplier[msg.sender].machineRun;

        Chakra(rewardToken).mint(1, msg.sender, reward);
    }
}
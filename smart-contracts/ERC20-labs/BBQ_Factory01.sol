// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BBQ.sol";

contract BBQ_Factory01 is ReentrancyGuard, Ownable {
    address public wood;
    address public jasp;
    address public jdao;
    address public cmj;
    address public bbq;

    struct Machine {
        uint256 level;
        uint256 duration;
        uint256 woodCost;
        uint256 jbcCost;
        uint256 bbqReward;
    }
    mapping(uint256=>Machine) public machine;

    struct Upgrade {
        uint256 newLevel;
        uint256 woodReq;
        uint256 jaspReq;
        uint256 jdaoReq;
        uint256 cmjReq;
    }
    mapping(uint256=>Upgrade) public craftUpgrade;

    struct Log {
        uint256 craftLevel;
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    constructor(
        address _wood,
        address _jasp,
        address _jdao,
        address _cmj,
        address _bbq
    ) {
        wood = _wood;
        jasp = _jasp;
        jdao = _jdao;
        cmj = _cmj;
        bbq = _bbq;
    }

    function setMachine(
        uint256 _index,
        uint256 _level,
        uint256 _durationInMin,
        uint256 _woodCost,
        uint256 _jbcCost,
        uint256 _bbqReward
    ) external onlyOwner {
        machine[_index].level = _level;
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].woodCost = _woodCost;
        machine[_index].jbcCost = _jbcCost;
        machine[_index].bbqReward = _bbqReward;
    }

    function setUpgrade(
        uint256 _index,
        uint256 _newLevel,
        uint256 _woodReq,
        uint256 _jaspReq,
        uint256 _jdaoReq,
        uint256 _cmjReq
    ) external onlyOwner {
        craftUpgrade[_index].newLevel = _newLevel;
        craftUpgrade[_index].woodReq = _woodReq;
        craftUpgrade[_index].jaspReq = _jaspReq;
        craftUpgrade[_index].jdaoReq = _jdaoReq;
        craftUpgrade[_index].cmjReq = _cmjReq;
    }

    function upgrade(uint256 _index) external nonReentrant {
        require(supplier[msg.sender].machineRun == 0, "Under Production");
        require(supplier[msg.sender].craftLevel + 1 == craftUpgrade[_index].newLevel, "Level too low");

        supplier[msg.sender].craftLevel = craftUpgrade[_index].newLevel;

        if (craftUpgrade[_index].woodReq > 0) {
            ERC20(wood).transferFrom(msg.sender, address(1), craftUpgrade[_index].woodReq);
        }
        if (craftUpgrade[_index].jaspReq > 0) {
            ERC20(jasp).transferFrom(msg.sender, address(1), craftUpgrade[_index].jaspReq);
        }
        if (craftUpgrade[_index].jdaoReq > 0) {
            ERC20(jdao).transferFrom(msg.sender, address(1), craftUpgrade[_index].jdaoReq);
        }
        if (craftUpgrade[_index].cmjReq > 0) {
            ERC20(cmj).transferFrom(msg.sender, address(this), craftUpgrade[_index].cmjReq);
        }
    }

    function withdrawJbc(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    function withdrawCmj(uint256 _amount, address _to) external onlyOwner {
        ERC20(cmj).transfer(_to ,_amount);
    }

    function craft(uint256 _index) external payable nonReentrant {
        require(machine[_index].bbqReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");
        require(machine[_index].level == supplier[msg.sender].craftLevel, "Insufficient Level");
        require(machine[_index].jbcCost == msg.value, "Insufficient JBC");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(wood).transferFrom(msg.sender, address(1), machine[_index].woodCost);
    }

    function obtain() external nonReentrant {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].bbqReward;
        delete supplier[msg.sender].machineRun;

        BBQ(bbq).mint(1, msg.sender, reward);
    }
}

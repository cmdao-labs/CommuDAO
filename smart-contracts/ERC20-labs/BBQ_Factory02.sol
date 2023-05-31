// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BBQ.sol";

contract BBQ_Factory02 is Ownable {
    address public wood;
    address public jdao;
    address public cmj;
    address public bbq;

    struct Machine {
        uint256 duration;
        uint256 initialQuota;
        uint256 woodCost;
        uint256 jdaoCost;
        uint256 cmjCost;
        uint256 bbqReward;
    }
    Machine public machine;

    struct Log {
        address addr;
        uint256 totalQuota;
        uint256 laststamp;
    }
    mapping(uint256 => Log) public supplier;

    uint256 public totalQueue;
    uint256 public currentQueue;

    constructor(
        address _wood,
        address _jdao,
        address _cmj,
        address _bbq
    ) {
        wood = _wood;
        jdao = _jdao;
        cmj = _cmj;
        bbq = _bbq;
        currentQueue = 1;
    }

    function setMachine(
        uint256 _durationInMin,
        uint256 _initialQuota,
        uint256 _woodCost,
        uint256 _jdaoCost,
        uint256 _cmjCost,
        uint256 _bbqReward
    ) external onlyOwner {
        machine.duration = _durationInMin * 1 minutes;
        machine.initialQuota = _initialQuota;
        machine.woodCost = _woodCost;
        machine.jdaoCost = _jdaoCost;
        machine.cmjCost = _cmjCost;
        machine.bbqReward = _bbqReward;
    }

    function withdrawCmj(uint256 _amount, address _to) external onlyOwner {
        ERC20(cmj).transfer(_to ,_amount);
    }

    function craft() external {
        totalQueue = totalQueue + 1;
        supplier[totalQueue].addr = msg.sender;
        supplier[totalQueue].totalQuota = machine.initialQuota;
        
        ERC20(jdao).transferFrom(msg.sender, address(1), machine.jdaoCost);
        ERC20(wood).transferFrom(msg.sender, address(1), machine.woodCost);
    }

    function obtain() external {
        require(supplier[currentQueue].totalQuota != 0, "Machine was stopped!");
        require(supplier[currentQueue].laststamp + machine.duration < block.timestamp, "Under Production");
        
        uint256 _currentQueue = currentQueue;
        if (supplier[currentQueue].totalQuota == 1) {
            currentQueue = currentQueue + 1;
        } else {
            supplier[currentQueue].totalQuota = supplier[currentQueue].totalQuota - 1;
        }

        ERC20(cmj).transferFrom(msg.sender, address(this), machine.cmjCost);
        BBQ(bbq).mint(2, supplier[_currentQueue].addr, machine.bbqReward / 2);
        BBQ(bbq).mint(2, msg.sender, machine.bbqReward / 2);
    }
}
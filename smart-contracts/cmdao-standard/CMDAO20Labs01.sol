// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/access/Ownable.sol";

contract CMDAO20Labs01 is ERC20, Ownable {
    address public resource1;
    address public resource2;
    address public currency;

    struct Machine {
        uint256 duration;
        uint256 res1Cost;
        uint256 res2Cost;
        uint256 currCost;
        uint256 rewardAmount;
    }
    mapping(uint256 => Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address => Log) public supplier;

    mapping(uint256 => address) public programCall;

    constructor(
        string memory _rewardName,
        string memory _rewardSymbol,
        address _resource1,
        address _resource2,
        address _currency,
        address _labsOwner,
        uint256 _premintAmount
    ) ERC20(_rewardName, _rewardSymbol) Ownable(_labsOwner) {
        resource1 = _resource1;
        resource2 = _resource2;
        currency = _currency;
        _mint(_labsOwner, _premintAmount);
    }

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function cmdao20Mint(uint256 _callIndex, address _to, uint256 _amount) external {
        require(msg.sender == programCall[_callIndex], "No Permission!");
        _mint(_to, _amount);
    }

    function cmdao20Burn(address _from, uint256 _amount) external {
        transferFrom(_from, address(1), _amount);
    }

    function withdrawCurrency(uint256 _amount, address _to) external onlyOwner {
        ERC20(currency).transfer(_to, _amount);
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _res1Cost,
        uint256 _res2Cost,
        uint256 _currCost,
        uint256 _rewardAmount
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].res1Cost = _res1Cost;
        _currCost != 0 && _res2Cost == 0 ?
            machine[_index].currCost = _currCost :
            machine[_index].res2Cost = _res2Cost;
        machine[_index].rewardAmount = _rewardAmount;
    }

    function craft(uint256 _index) external {
        require(machine[_index].rewardAmount > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(resource1).transferFrom(msg.sender, address(1), machine[_index].res1Cost);
        machine[_index].currCost != 0 && machine[_index].res2Cost == 0 ?
            ERC20(currency).transferFrom(msg.sender, address(this), machine[_index].currCost) :
            ERC20(resource2).transferFrom(msg.sender, address(1), machine[_index].res2Cost);
    }

    function obtain() external {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].rewardAmount;
        delete supplier[msg.sender].machineRun;

        _mint(msg.sender, reward);
    }
}
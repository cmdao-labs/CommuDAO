// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./plat.sol";

contract Plat_Factory02 is Ownable {
    address public token1;
    address public token2;
    address public platToken;

    struct Machine {
        uint256 duration;
        uint256 token1Cost;
        uint256 token2Cost;
        uint256 platReward;
    }
    mapping(uint256=>Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address=>Log) public supplier;

    constructor(
        address _token1,
        address _token2,
        address _platToken
    ) {
        token1 = _token1;
        token2 = _token2;
        platToken = _platToken;
    }

    function withdrawCmj(uint256 _amount, address _to) external onlyOwner {
        ERC20(token1).transfer(_to ,_amount);
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _token1Cost,
        uint256 _token2Cost,
        uint256 _platReward
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].token1Cost = _token1Cost;
        machine[_index].token2Cost = _token2Cost;
        machine[_index].platReward = _platReward;
    }

    function craft(uint256 _index) external {
        require(machine[_index].platReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(token1).transferFrom(msg.sender, address(this), machine[_index].token1Cost);
        ERC20(token2).transferFrom(msg.sender, address(1), machine[_index].token2Cost);
    }

    function obtain() external {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].platReward;
        delete supplier[msg.sender].machineRun;

        plat(platToken).mint(2, msg.sender, reward);
    }
}
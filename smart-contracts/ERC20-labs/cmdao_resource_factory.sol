// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "./cmdao_resource.sol";

contract cmdaoResourceFactory01 is Ownable {
    address public substance;
    address public payout;
    address public product;

    struct Machine {
        uint256 duration;
        uint256 substanceCost;
        uint256 payoutCost;
        uint256 productReward;
    }
    mapping(uint256 => Machine) public machine;

    struct Log {
        uint256 machineRun;
        uint256 laststamp;
    }
    mapping(address => Log) public supplier;

    constructor(
        address _substance,
        address _payout,
        address _product
    ) Ownable(msg.sender) {
        substance = _substance;
        payout = _payout;
        product = _product;
    }

    function setMachine(
        uint256 _index,
        uint256 _durationInMin,
        uint256 _substanceCost,
        uint256 _payoutCost,
        uint256 _productReward
    ) external onlyOwner {
        machine[_index].duration = _durationInMin * 1 minutes;
        machine[_index].substanceCost = _substanceCost;
        machine[_index].payoutCost = _payoutCost;
        machine[_index].productReward = _productReward;
    }

    function withdrawPayout(uint256 _amount, address _to) external onlyOwner {
        ERC20(payout).transfer(_to ,_amount);
    }

    function craft(uint256 _index) external {
        require(machine[_index].productReward > 0, "Inactive Machine");
        require(supplier[msg.sender].machineRun == 0, "Under Production");

        supplier[msg.sender].machineRun = _index;
        supplier[msg.sender].laststamp = block.timestamp;
        
        ERC20(substance).transferFrom(msg.sender, address(1), machine[_index].substanceCost);
        ERC20(payout).transferFrom(msg.sender, address(this), machine[_index].payoutCost);
    }

    function obtain() external {
        require(supplier[msg.sender].machineRun > 0, "No production");
        require(supplier[msg.sender].laststamp + machine[supplier[msg.sender].machineRun].duration < block.timestamp, "Under Production");

        uint256 reward = machine[supplier[msg.sender].machineRun].productReward;
        delete supplier[msg.sender].machineRun;

        cmdaoResource(product).mint(1, msg.sender, reward);
    }
}
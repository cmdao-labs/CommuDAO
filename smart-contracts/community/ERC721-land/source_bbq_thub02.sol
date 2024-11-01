// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/access/Ownable.sol";

contract SOURCE_BBQ_THUB02 is Ownable {
    mapping(uint256 => address) public resources;
    uint256 public fee;

    event Send(address indexed from, uint256 indexed to, uint256 indexed index, uint256 value);

    constructor() Ownable(msg.sender) {}

    function setResource(uint256 _index, address _resource) external onlyOwner {
        resources[_index] = _resource;
    }

    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function withdrawFee(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    function sendResource(
        uint256 _index,
        uint256 _to,
        uint256 _amount
    ) external payable {
        require(fee == msg.value, "Insufficient CMD");
        IERC20(resources[_index]).transferFrom(msg.sender, address(this), _amount);
        emit Send(msg.sender, _to, _index, _amount);
    }

    function revertResource(
        uint256 _index,
        address _to,
        uint256 _amount
    ) external onlyOwner {
        IERC20(resources[_index]).transfer(_to, _amount);
    }

    function burnResource(uint256 _index, uint256 _amount) external onlyOwner {
        IERC20(resources[_index]).transfer(address(1), _amount);
    }
}
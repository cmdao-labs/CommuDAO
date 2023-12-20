//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TBridge_CMJ is Ownable {
    IERC20 public cmj;

    constructor(address _cmj) {
        cmj = IERC20(_cmj);
    }

    event SendTokens(address indexed to, uint256 amount);

    function sendTokens(address _to, uint256 _amount) external onlyOwner {
        require(cmj.balanceOf(address(this)) >= _amount, "Insufficient balance of the smart contract!");
        cmj.transfer(msg.sender, 1e19);
        cmj.transfer(_to, _amount - 1e19);
        emit SendTokens(_to, _amount - 1e19);
    }
}
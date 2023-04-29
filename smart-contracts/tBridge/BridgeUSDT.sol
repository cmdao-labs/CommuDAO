//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeUSDT is Ownable {
    IERC20 public usdt;

    constructor(address _usdt) {
        usdt = IERC20(_usdt);
    }

    event SendTokens(address indexed to, uint256 amount);

    function sendTokens(address _to, uint256 _amount) external onlyOwner {
        require(usdt.balanceOf(address(this)) >= _amount, "Insufficient balance of the smart contract!");
        usdt.transfer(msg.sender, 1e17);
        usdt.transfer(_to, _amount - 1e17);
        emit SendTokens(_to, _amount - 1e17);
    }
}
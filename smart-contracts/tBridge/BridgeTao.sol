//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TBridge_Tao is Ownable {
    IERC20 public tao;

    constructor(address _tao) {
        tao = IERC20(_tao);
    }

    event SendTokens(address indexed to, uint256 amount);

    function sendTokens(address _to, uint256 _amount) external onlyOwner {
        require(tao.balanceOf(address(this)) >= _amount, "Insufficient balance of the smart contract!");
        tao.transfer(msg.sender, 888 ether);
        tao.transfer(_to, _amount - 888 ether);
        emit SendTokens(_to, _amount - 888 ether);
    }
}
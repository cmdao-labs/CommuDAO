// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CMDAO_Faucet is ERC20 {
    mapping(address => uint256) public timeLock;

    constructor() ERC20("Merit Token", "MT") {}

    function allowedToWithdraw(address _address) public view returns (bool) {
        if (timeLock[_address] == 0) {
            return true;
        } else if (timeLock[_address] <= block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    function requestTokens() external {
        require(allowedToWithdraw(msg.sender), "Cool Down!");

        payable(msg.sender).transfer(1 ether);
        timeLock[msg.sender] = block.timestamp + 1 weeks;
    }
    
    fallback() external payable {
        _mint(msg.sender, msg.value);
    }
    receive() external payable {
        _mint(msg.sender, msg.value);
    }
}
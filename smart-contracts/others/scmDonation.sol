// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract scmDonation is ERC20, Ownable {
    constructor() ERC20("CMDAO Social Consensus Maintainer Point", "SCM-POINT") Ownable(msg.sender) {}

    function claimDonation(uint256 _amount) external onlyOwner {
        payable(msg.sender).transfer(_amount);
    }
    
    fallback() external payable {
        _mint(msg.sender, msg.value);
    }
    receive() external payable {
        _mint(msg.sender, msg.value);
    }
}
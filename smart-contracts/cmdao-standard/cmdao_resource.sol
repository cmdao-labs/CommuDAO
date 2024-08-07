// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/access/Ownable.sol";

contract cmdaoResource is ERC20, Ownable {
    mapping(uint256=>address) public programCall;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) Ownable(msg.sender) {}

    function setProgramCall(uint256 _index, address _addr) public onlyOwner {
        programCall[_index] = _addr;
    }

    function mint(
        uint256 _index,
        address to,
        uint256 amount
    ) public {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        _mint(to, amount);
    }
}
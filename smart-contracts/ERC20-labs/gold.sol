// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract gold is ERC20, Ownable {
    mapping(uint256=>address) public programCall;

    constructor() ERC20("Gold", "GOLD") {}

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function mint(
        uint256 _index,
        address to,
        uint256 amount
    ) external {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        _mint(to, amount);
    }
}
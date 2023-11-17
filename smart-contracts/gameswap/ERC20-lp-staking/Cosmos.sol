// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Cosmos is ERC20, Ownable {
    mapping(uint256=>address) public programCall;

    constructor() ERC20("Cosmos", "CMOS") {}

    function setProgramCall(uint256 _index, address _addr) public onlyOwner {
        programCall[_index] = _addr;
    }

    function mint(
        uint256 _index,
        address _to,
        uint256 _amount
    ) public {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        _mint(_to, _amount);
    }
}
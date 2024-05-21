// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC20/ERC20.sol";

contract CMDAO20 is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        address _owner,
        uint256 _premintAmount
    ) ERC20(_name, _symbol) {
        _mint(_owner, _premintAmount);
    }

    function cmdao20Burn(address _from, uint256 _amount) external {
        transferFrom(_from, address(1), _amount);
    }
}
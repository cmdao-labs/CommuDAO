//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CMDAO20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/access/Ownable.sol";

contract CMDAO20Factory is Ownable {
    CMDAO20[] public CMDAO20Array;

    constructor() Ownable(msg.sender) {}

    function CreateCMDAO20(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _premintAmount
    ) external {
        CMDAO20 tokenAddr = new CMDAO20(_tokenName, _tokenSymbol, owner(), _premintAmount);
        CMDAO20Array.push(tokenAddr);
    }
}
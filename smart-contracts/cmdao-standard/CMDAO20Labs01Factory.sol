//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CMDAO20Labs01.sol";

contract CMDAO20Labs01Factory is Ownable {
    CMDAO20Labs01[] public CMDAO20Labs01Array;

    constructor() Ownable(msg.sender) {}

    function CreateCMDAO20Labs01(
        string memory _tokenName,
        string memory _tokenSymbol,
        address _resource1,
        address _resource2,
        address _currency,
        uint256 _premintAmount
    ) external {
        CMDAO20Labs01 tokenAddr = new CMDAO20Labs01(_tokenName, _tokenSymbol, _resource1, _resource2, _currency, owner(), _premintAmount);
        CMDAO20Labs01Array.push(tokenAddr);
    }
}
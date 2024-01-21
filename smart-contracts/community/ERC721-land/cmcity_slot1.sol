// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./cmdao_title_indeed.sol";

contract CMCITY_SLOT1 is Ownable {
    mapping(uint256 => address) public programCall;
    address public cmdaoTi; 
    mapping(uint256 => address) public slotOwner;
    mapping(uint256 => uint256) public slotLevel;

    constructor(address _nft) {
        cmdaoTi = _nft;
    }

    function setProgramCall(uint256 _index, address _addr) public onlyOwner {
        programCall[_index] = _addr;
    }

    function delegateOwner(
        uint256 _index,
        address _to,
        uint256 _tokenId
    ) external {
        if (_index == 0) {
            slotOwner[_tokenId] = CMD_TITLE_INDEED(cmdaoTi).ownerOf(_tokenId);
        } else {
            require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
            slotOwner[_tokenId] = _to;
        }
    }

    function upLevel(uint256 _index, uint256 _tokenId) external {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        slotLevel[_tokenId] += 1;
    }
}
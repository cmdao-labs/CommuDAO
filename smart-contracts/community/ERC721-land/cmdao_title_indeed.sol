// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMD_TITLE_INDEED is ERC721URIStorage, Ownable {
    mapping(uint256 => address) public programCall;
    mapping(uint256 => uint256) public expireDate;

    constructor() ERC721("COMMUDAO_TITLE_INDEED", "CMDAO-TI-NFT") {}

    function setProgramCall(uint256 _index, address _addr) public onlyOwner {
        programCall[_index] = _addr;
    }

    function safeMint(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        expireDate[tokenId] = block.timestamp + 366 days;
    }

    function landRenew(uint256 index, uint256 tokenId) external {
        require(msg.sender == programCall[index], "PROGRAM CALL: invalid contract");
        expireDate[tokenId] = block.timestamp + 366 days;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) {
        require(msg.sender == programCall[0] || msg.sender == programCall[1], "PROGRAM CALL: invalid contract");
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) {
       revert();
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(ERC721, IERC721) {
        revert();
    }
}
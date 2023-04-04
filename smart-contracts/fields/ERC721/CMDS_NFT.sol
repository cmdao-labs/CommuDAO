// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMDS_NFT is ERC721URIStorage, Ownable {
    constructor() ERC721("CommuDAO Servant NFT", "CMDS") {}

    mapping(uint256=>address) public programCall;

    function setProgramCall(uint256 _index, address _addr) public onlyOwner {
        programCall[_index] = _addr;
    }

    function manualMint(address to, uint256 tokenId, string memory tokenURI) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function autoMint(uint256 callIndex, address to, uint256 tokenId, string memory tokenURI) public {
        require(msg.sender == programCall[callIndex], "PROGRAM CALL: invalid contract");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function manualBurn(uint256 tokenId) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _burn(tokenId);
    }

    function autoBurn(uint256 callIndex, uint256 tokenId) public {
        require(msg.sender == programCall[callIndex], "PROGRAM CALL: invalid contract");
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _burn(tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(msg.sender == programCall[0], "PROGRAM CALL: invalid contract");
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override {
        require(msg.sender == programCall[0], "PROGRAM CALL: invalid contract");
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _safeTransfer(from, to, tokenId, data);
    }
}
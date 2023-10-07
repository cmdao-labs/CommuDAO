// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CommuDAO_Salon_NFT is ERC721URIStorage, Ownable {
    constructor() ERC721("CommuDAO Salon NFT", "CMDAO-SALON-NFT") {}

    function safeMint(address to, uint256 tokenId, string memory tokenURI) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
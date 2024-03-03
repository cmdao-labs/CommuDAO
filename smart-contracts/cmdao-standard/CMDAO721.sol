// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/access/Ownable.sol";

contract CMDAO721 is ERC721URIStorage, Ownable {
    mapping(uint256 => address) public programCall;

    constructor(string memory _NftName, string memory _NftSymbol, address _facOwner) ERC721(_NftName, _NftSymbol) Ownable(_facOwner) {}

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function mint(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) private {
        _safeMint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }

    function cmdao721Mint(uint256 _callIndex, address _to, uint256 _tokenId, string memory _tokenURI) external {
        require(msg.sender == programCall[_callIndex], "No Permission!");
        mint(_to, _tokenId, _tokenURI);
    }

    function cmdao721Burn(address _from, uint256 _tokenId) external {
        transferFrom(_from, address(1), _tokenId);
    }
}
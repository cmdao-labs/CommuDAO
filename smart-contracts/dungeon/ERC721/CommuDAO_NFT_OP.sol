// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract CommuDAO_NFT is ERC721URIStorage, Ownable {
    mapping(uint256 => address) public programCall;

    constructor() ERC721("CommuDAO NFT", "CMDAO-NFT") Ownable(msg.sender) {}

    function safeMint(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) public onlyOwner {
        _safeMint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }

    function batchMint(
        address _to,
        uint256 _tokenCol,
        uint256 _startId,
        uint256 _endId, 
        uint256 _cmpow,
        string memory _tokenURI
    ) external onlyOwner {
        for (uint256 i = _startId; i <= _endId; i++) {
            uint256 tokenId = _tokenCol + (i * 100000) + _cmpow;
            safeMint(_to, tokenId, _tokenURI);
        }
    }

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function externalMint(
        uint256 _callIndex,
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) external {
        require(msg.sender == programCall[_callIndex]);
        safeMint(_to, _tokenId, _tokenURI);
    }
}
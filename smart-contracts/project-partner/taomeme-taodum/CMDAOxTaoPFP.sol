// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/access/Ownable.sol";
import "./fieldMHZ.sol";

contract CMDAOxTAOpfp is ERC721URIStorage, Ownable {
    struct NftDrop {
        string URI;
        uint256 currentNftId;
        uint256 tokenAmount2Drop;
        uint256 tokenAmount2Eligible;
    }
    mapping(uint256 => NftDrop) public nftDrop;
    mapping(address => mapping(uint256 => bool)) public user;
    address public tokenAddr2Drop;
    address public tokenAddr2Eligible;

    constructor(address _tokenAddr2Drop, address _tokenAddr2Eligible) ERC721("CMDAO x TAO PFP", "CMDAO-TAO-PFP") Ownable(msg.sender) {
        tokenAddr2Drop = _tokenAddr2Drop;
        tokenAddr2Eligible = _tokenAddr2Eligible;
    }

    function mint(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) private {
        _safeMint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }

    function setNftDrop(
        uint256 _index,
        string memory _uri,
        uint256 _currentNftId,
        uint256 _tokenAmount2Drop,
        uint256 _tokenAmount2Eligible
    ) external onlyOwner {
        nftDrop[_index].URI = _uri;
        nftDrop[_index].currentNftId = _currentNftId;
        nftDrop[_index].tokenAmount2Drop = _tokenAmount2Drop;
        nftDrop[_index].tokenAmount2Eligible = _tokenAmount2Eligible;
    }

    function claimRevenue(address _to, uint256 _amount) external onlyOwner {
        IERC20(tokenAddr2Drop).transfer(_to, _amount);
    }

    function claimDrop(uint256 _nftIndex) external {
        (uint256 tokenAmount,,) = FieldMHZ(tokenAddr2Eligible).tokenStake(msg.sender);

        require(tokenAmount >= nftDrop[_nftIndex].tokenAmount2Eligible, "Not Eligible!");
        require(!user[msg.sender][_nftIndex], "You've already claim!");

        IERC20(tokenAddr2Drop).transferFrom(msg.sender, address(this), nftDrop[_nftIndex].tokenAmount2Drop);
        
        user[msg.sender][_nftIndex] = true;
        mint(msg.sender, nftDrop[_nftIndex].currentNftId, nftDrop[_nftIndex].URI);
        nftDrop[_nftIndex].currentNftId += 1;
    }
}
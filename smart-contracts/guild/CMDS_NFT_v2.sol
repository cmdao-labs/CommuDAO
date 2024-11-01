// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract CMDS_NFT_v2 is ERC721URIStorage, Ownable {
    mapping(uint256 => address) public programCall;
    mapping(address => uint256) public mynft;
    struct NftData {
        string name;
        uint256 exp;
    }
    mapping(uint256 => NftData) public nftData;
    struct Incubator {
        uint256 classId;
        string tokenURI;
    } 
    mapping(uint256 => Incubator) public incubator;
    uint256 public idCount;

    constructor() ERC721("CommuDAO Servant NFT", "CMDS") {}

    function setProgramCall(uint256 _index, address _addr) public onlyOwner {
        programCall[_index] = _addr;
    }

    function setIncubator(
        uint256 _index,
        uint256 _classId,
        string memory _tokenURI
    ) external onlyOwner {
        incubator[_index].classId = _classId;
        incubator[_index].tokenURI = _tokenURI;
    }

    function mintServant(uint256 _index, string memory _name) external {
        require(incubator[_index].classId != 0, "Invalid incubator");
        require(mynft[msg.sender] == 0, "You have already minted your servant");
        require(bytes(_name).length <= 32, "Name length limit : 32 chars");
        idCount++;
        uint256 tokenId = (incubator[_index].classId * 1e13) + idCount;
        mynft[msg.sender] = tokenId;
        nftData[tokenId].name = _name;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, incubator[_index].tokenURI);
    }

    function autoBurnAndMint(
        uint256 callIndex,
        address to,
        uint256 oldTokenId,
        uint256 newTokenId,
        string memory tokenURI
    ) public {
        require(msg.sender == programCall[callIndex], "PROGRAM CALL: invalid contract");
        _burn(oldTokenId);
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
    }

    function updateServantData(
        uint256 _index,
        uint256 _tokenId,
        uint256 _newExp,
        bool _isChangeName,
        string memory _name,
        bool _isChangeHolder,
        address _holder
    ) public {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        nftData[_tokenId].exp = _newExp;
        if (_isChangeName) {
            nftData[_tokenId].name = _name;
        }
        if (_isChangeHolder) {
            require(mynft[_holder] == 0, "You have already minted your servant");
            mynft[_holder] = _tokenId;
        }
    }
}
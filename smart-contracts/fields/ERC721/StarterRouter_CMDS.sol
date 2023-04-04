// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CMDS_NFT.sol";

contract StarterRouter_CMDS is Ownable {
    address public cmdaoServant;

    mapping(address=>uint256) public mynft;

    struct NftData {
        string name;
        uint256 exp;
    }
    mapping(uint256=>NftData) public nftData;

    struct Incubator {
        uint256 classId;
        string tokenURI;
    } 
    mapping(uint256=>Incubator) public incubator;

    uint256 public idCount;

    mapping(uint256=>address) public programCall;

    constructor(address _cmdaoServant) {
        cmdaoServant = _cmdaoServant;
    }

    function setCMDS(address _cmdaoServant) external onlyOwner {
        cmdaoServant = _cmdaoServant;
    }

    function setIncubator(uint256 _index, uint256 _classId, string memory _tokenURI) external onlyOwner {
        incubator[_index].classId = _classId;
        incubator[_index].tokenURI = _tokenURI;
    }

    function setProgramCall(uint256 _index, address _addr) public onlyOwner {
        programCall[_index] = _addr;
    }

    function mintServant(uint256 _index, string memory _name) external {
        require(incubator[_index].classId != 0, "Invalid incubator");
        require(mynft[msg.sender] == 0, "You have already minted your servant");
        require(bytes(_name).length <= 32, "Name length limit : 32 chars");
        idCount++;
        uint256 tokenId = (incubator[_index].classId * 1e13) + idCount;
        mynft[msg.sender] = tokenId;
        nftData[tokenId].name = _name;

        CMDS_NFT(cmdaoServant).autoMint(1, msg.sender, tokenId, incubator[_index].tokenURI);
    }

    function updateServantData(
        uint256 _index,
        uint256 _tokenId,
        uint256 _newExp,
        bool _isChangeName,
        string memory _name
    ) public {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        nftData[_tokenId].exp = _newExp;
        if (_isChangeName) {
            nftData[_tokenId].name = _name;
        }
    }

}
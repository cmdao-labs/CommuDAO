// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "./CommuDAO_NFT.sol";

contract CMDAO_NFT_MintHelper {

    address public projectAdmin;
    modifier onlyProjectAdmin() {
        require(msg.sender == projectAdmin, "Not Permission to call"); 
        _;
    }

    address public cmdaoNft;
    mapping(uint256=>address) public programCall;

    constructor(address _cmdaoNft) {
        projectAdmin = msg.sender;
        cmdaoNft = _cmdaoNft;
    }

    function setProjectAdmin(address _addr) external onlyProjectAdmin {
        projectAdmin = _addr;
    }

    function setCmdaoNft(address _addr) external onlyProjectAdmin {
        cmdaoNft = _addr;
    }

    function setNftOwner() external onlyProjectAdmin {
        CommuDAO_NFT(cmdaoNft).transferOwnership(msg.sender);
    }

    function setProgramCall(uint256 _index, address _addr) external onlyProjectAdmin {
        programCall[_index] = _addr;
    }

    function manualMint(address _to, uint256 _tokenId, string memory _tokenURI) external onlyProjectAdmin {
        CommuDAO_NFT(cmdaoNft).safeMint(_to, _tokenId, _tokenURI);
    }

    function externalMint(uint256 _callIndex, address _to, uint256 _tokenId, string memory _tokenURI) external {
        require(msg.sender == programCall[_callIndex], "This is not this program index contract");
        CommuDAO_NFT(cmdaoNft).safeMint(_to, _tokenId, _tokenURI);
    }

}
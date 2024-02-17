// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./adventurer_card.sol";

contract AC_AP_NFT_MintHelper is Ownable {
    address public ac_ap_nft;
    mapping(uint256 => address) public programCall;

    constructor(address _nft) {
        ac_ap_nft = _nft;
    }

    function setNftOwner() external onlyOwner {
        AC_AP_NFT(ac_ap_nft).transferOwnership(msg.sender);
    }

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function manualMint(address _to, uint256 _tokenId, string memory _tokenURI) external onlyOwner {
        AC_AP_NFT(ac_ap_nft).safeMint(_to, _tokenId, _tokenURI);
    }

    function externalMint(uint256 _callIndex, address _to, uint256 _tokenId, string memory _tokenURI) external {
        require(msg.sender == programCall[_callIndex], "No Permission!");
        AC_AP_NFT(ac_ap_nft).safeMint(_to, _tokenId, _tokenURI);
    }
}
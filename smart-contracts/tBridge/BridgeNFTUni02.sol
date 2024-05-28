//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.6.0/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.6.0/contracts/token/ERC721/utils/ERC721Holder.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.6.0/contracts/access/Ownable.sol";

contract TBridge_NFT_Uni02 is ERC721Holder, Ownable {
    IERC721 public nft;
    uint256 public fee; 

    constructor(address _nft, uint256 _fee) {
        nft = IERC721(_nft);
        fee = _fee;
    }

    event ReceiveNFTs(address indexed from, uint256 indexed nftId);
    event SendNFTs(address indexed to, uint256 indexed nftId);

    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function sendNFTs(address _to, uint256 _nftId) external onlyOwner {
        nft.transferFrom(address(this), _to, _nftId);
        emit SendNFTs(_to, _nftId);
    }

    function receiveNFTs(uint256 _nftId) external payable {
        require(msg.value >= fee, "Please pay bridging fee!");
        payable(owner()).transfer(fee);

        nft.transferFrom(msg.sender, address(this), _nftId);
        emit ReceiveNFTs(msg.sender, _nftId);
    }
}
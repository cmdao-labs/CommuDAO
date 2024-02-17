//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TBridge_TAODUM is ERC721Holder, Ownable {
    IERC721 public taodum;

    constructor(address _taodum) {
        taodum = IERC721(_taodum);
    }

    event ReceiveNFTs(address indexed from, uint256 indexed nftId);
    event SendNFTs(address indexed to, uint256 indexed nftId);

    function sendNFTs(address _to, uint256 _nftId) external onlyOwner {
        taodum.safeTransferFrom(address(this), _to, _nftId);
        emit SendNFTs(_to, _nftId);
    }

    function receiveNFTs(uint256 _nftId) external payable {
        require(msg.value >= 10 ether, "Please pay bridging fee!");
        payable(owner()).transfer(10 ether);
        taodum.safeTransferFrom(msg.sender, address(this), _nftId);
        emit ReceiveNFTs(msg.sender, _nftId);
    }
}
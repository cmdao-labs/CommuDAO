//SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/utils/ERC721Holder.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract TBridge_Nft_Uni is ERC721Holder, Ownable {
    mapping (uint256 => IERC721) public nfts;
    uint256 public fee; 

    event SendNfts(uint256 indexed index, address indexed to, uint256 indexed tokenId);
    event ReceiveNfts(uint256 indexed index, address indexed from, uint256 indexed tokenId);

    constructor() Ownable(msg.sender) {}

    function setNfts(uint256 _index, address _addr) external onlyOwner {
        nfts[_index] = IERC721(_addr);
    }

    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function sendNfts(
        uint256 _index,
        address _to,
        uint256 _tokenId
    ) external onlyOwner {
        nfts[_index].transferFrom(address(this), _to, _tokenId);
        emit SendNfts(_index, _to, _tokenId);
    }

    function receiveNfts(uint256 _index, uint256 _tokenId) external payable {
        require(msg.value >= fee, "Please pay bridging fee!");
        payable(owner()).transfer(fee);
        nfts[_index].transferFrom(msg.sender, address(this), _tokenId);
        emit ReceiveNfts(_index, msg.sender, _tokenId);
    }
}
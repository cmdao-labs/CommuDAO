// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMDAO_WL_Merchant is ERC721Holder, Ownable {
    mapping(uint256 => address) public programCall;
    mapping(address => mapping(uint256 => bool)) public wl;
    mapping(address => mapping(uint256 => uint256)) public boughtLimit;
    mapping(uint256 => address) public tokens;
    mapping(uint256 => address) public nfts;

    struct Sell {
        uint256 boughtLimit;
        uint256 tokenIndex;
        uint256 price;
        uint256 nftIndex;
        uint256 sellId;
        uint256 endId;
    }
    mapping(uint256 => Sell) public sellList;
    
    constructor() Ownable(msg.sender) {}

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function setWL(
        uint256 _callIndex,
        uint256 _sellIndex,
        address _addr,
        bool _isWL
    ) external {
        require(msg.sender == programCall[_callIndex], "PROGRAM CALL: invalid contract");
        wl[_addr][_sellIndex] = _isWL;
    }

    function setToken(uint256 _index, address _addr) external onlyOwner {
        tokens[_index] = _addr;
    }

    function withdrawToken(
        uint256 _tokenindex,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(tokens[_tokenindex]).transfer(_to, _amount);
    }

    function setNfts(uint256 _index, address _addr) external onlyOwner {
        nfts[_index] = _addr;
    }

    function withdrawNFT(
        uint256 _nftIndex,
        uint256 _nftId,
        address _to
    ) external onlyOwner {
        IERC721(nfts[_nftIndex]).transferFrom(address(this), _to, _nftId);
    }

    function setSell(
        uint256 _boughtLimit,
        uint256 _sellindex,
        uint256 _tokenIndex,
        uint256 _price,
        uint256 _nftIndex,
        uint256 _sellId,
        uint256 _endId
    ) external onlyOwner {
        sellList[_sellindex].boughtLimit = _boughtLimit;
        sellList[_sellindex].tokenIndex = _tokenIndex;
        sellList[_sellindex].price = _price;
        sellList[_sellindex].nftIndex = _nftIndex;
        sellList[_sellindex].sellId = _sellId;
        sellList[_sellindex].endId = _endId;
    }

    function buy(uint256 _sellindex) external {
        require(
            wl[msg.sender][_sellindex] &&
            boughtLimit[msg.sender][_sellindex] < sellList[_sellindex].boughtLimit,
        "Not Eligible!");  
        require(sellList[_sellindex].sellId <= sellList[_sellindex].endId, "Sold Out!"); 

        IERC20(tokens[sellList[_sellindex].tokenIndex]).transferFrom(msg.sender, address(this), sellList[_sellindex].price);

        IERC721(nfts[sellList[_sellindex].nftIndex]).transferFrom(address(this), msg.sender, sellList[_sellindex].sellId);
        boughtLimit[msg.sender][_sellindex] += 1;
        sellList[_sellindex].sellId += 100000;
    }
}
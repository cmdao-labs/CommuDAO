// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CMDAO_Gashapon is ERC721Holder, ReentrancyGuard {

    address public projectAdmin;
    modifier onlyProjectAdmin() {
        require(msg.sender == projectAdmin, "NP"); // NP : Not Permission to call
        _;
    }
    
    mapping(uint256=>address) public tokens;
    mapping(uint256=>address) public nfts;

    struct Col {
        uint256 tokenIndex;
        uint256 price;
        uint256 nftIndex;
        uint256[] id;
    }
    mapping(uint256=>Col) public colList;

    constructor() {
        projectAdmin = msg.sender;
    }

    function setProjectAdmin(address _addr) external onlyProjectAdmin {
        projectAdmin = _addr;
    }

    function setToken(uint256 _index, address _addr) external onlyProjectAdmin {
        tokens[_index] = _addr;
    }

    function setNft(uint256 _index, address _addr) external onlyProjectAdmin {
        nfts[_index] = _addr;
    }

    function withdrawToken(
        uint256 _tokenindex,
        uint256 _amount,
        address _to
    ) external onlyProjectAdmin {
        IERC20(tokens[_tokenindex]).transfer(_to, _amount);
    }

    function withdrawNFT(
        uint256 _nftIndex,
        uint256 _nftId,
        address _to
    ) external onlyProjectAdmin {
        IERC721(nfts[_nftIndex]).transferFrom(address(this), _to, _nftId);
    }

    function setCol(
        uint256 _colindex,
        uint256 _tokenIndex,
        uint256 _nftIndex,
        uint256 _price,
        uint256[] memory _id
    ) external onlyProjectAdmin {
        colList[_colindex].tokenIndex = _tokenIndex;
        colList[_colindex].price = _price;
        colList[_colindex].nftIndex = _nftIndex;
        colList[_colindex].id = _id;
    }

    function roll(uint256 _colindex) external nonReentrant {
        require(colList[_colindex].id.length > 0, "SO"); // SO : Sold Out

        IERC20(tokens[colList[_colindex].tokenIndex]).transferFrom(msg.sender, address(this), colList[_colindex].price);

        uint256 random = (uint256(blockhash(block.number - 1)) % colList[_colindex].id.length);
        IERC721(nfts[colList[_colindex].nftIndex]).transferFrom(address(this), msg.sender, colList[_colindex].id[random]);

        colList[_colindex].id[random] = colList[_colindex].id[colList[_colindex].id.length - 1];
        colList[_colindex].id.pop();
    }

}
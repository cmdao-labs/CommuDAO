// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMDAO_Gashapon_02 is ERC721Holder, ReentrancyGuard, Ownable {    
    mapping(uint256=>address) public tokens;
    mapping(uint256=>address) public nfts;

    struct Col {
        uint256 nftIndex;
        uint nftCount;
        uint256[] id;
        uint256 tokenIndex;
        uint256 price;
    }
    mapping(uint256=>Col) public colList;

    function setToken(uint256 _index, address _addr) external onlyOwner {
        tokens[_index] = _addr;
    }

    function setNft(uint256 _index, address _addr) external onlyOwner {
        nfts[_index] = _addr;
    }

    function withdrawToken(
        uint256 _tokenindex,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(tokens[_tokenindex]).transfer(_to, _amount);
    }

    function withdrawNFT(
        uint256 _nftIndex,
        uint256 _nftId,
        address _to
    ) external onlyOwner {
        IERC721(nfts[_nftIndex]).transferFrom(address(this), _to, _nftId);
    }

    function setCol(
        uint256 _colindex,
        uint256 _nftIndex,
        uint256[] memory _id,
        uint256 _tokenIndex,
        uint256 _price
    ) external onlyOwner {
        colList[_colindex].nftIndex = _nftIndex;
        colList[_colindex].nftCount = _id.length;
        colList[_colindex].id = _id;
        colList[_colindex].tokenIndex = _tokenIndex;
        colList[_colindex].price = _price;
    }

    function roll(uint256 _colindex) external nonReentrant {
        require(colList[_colindex].id.length > 0, "Sold Out!");

        IERC20(tokens[colList[_colindex].tokenIndex]).transferFrom(msg.sender, address(this), colList[_colindex].price);

        uint256 random = (uint256(blockhash(block.number - 1)) % colList[_colindex].id.length);
        IERC721(nfts[colList[_colindex].nftIndex]).transferFrom(address(this), msg.sender, colList[_colindex].id[random]);

        colList[_colindex].id[random] = colList[_colindex].id[colList[_colindex].id.length - 1];
        colList[_colindex].id.pop();
        colList[_colindex].nftCount -= 1; 
    }
}
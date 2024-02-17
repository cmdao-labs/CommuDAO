// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract COMMUDAO_WL_MKP is ERC721Holder, ReentrancyGuard, Ownable {
    mapping(uint256=>address) public nftCol;
    mapping(uint256=>address) public currency;

    struct Item {
        address seller;
	    address buyer;
        uint256 nftIndex;
        uint256 nftId;
        uint256 currencyIndex;
	    uint256 price;
	    bool sold;
    }

    mapping(uint256=>Item) public items;
    uint256 public itemCount;

    function setNft(uint256 _index, address _addr) external onlyOwner {
        nftCol[_index] = _addr;
    }

    function setCurrency(uint256 _index, address _addr) external onlyOwner {
        currency[_index] = _addr;
    }
    
    function withdrawRev(
        uint256 _tokenIndex,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(currency[_tokenIndex]).transfer(_to, _amount);
    }

    function migrateNFT(
        uint256 _nftIndex,
        uint256 _nftId,
        address _to
    ) external onlyOwner {
        IERC721(nftCol[_nftIndex]).safeTransferFrom(address(this), _to, _nftId);
    }

    function addItem(
        uint256 _nftIndex,
        uint256 _nftId,
        uint256 _currencyIndex,
        uint256 _price,
        address _wl
    ) external nonReentrant {
	    itemCount++;
	    items[itemCount].seller = msg.sender;
        items[itemCount].nftIndex = _nftIndex;
        items[itemCount].nftId = _nftId;
        items[itemCount].currencyIndex = _currencyIndex;
	    items[itemCount].price = _price;
        items[itemCount].buyer = _wl;

        IERC721(nftCol[_nftIndex]).safeTransferFrom(msg.sender, address(this), _nftId);
    }

    function removeItem(uint _index) external nonReentrant {
	    Item storage i = items[_index];
	    require(i.seller != address(0), "no such item");
	    require(i.seller == msg.sender, "only seller can remove item");
	    require(!i.sold, "item sold already");

        IERC721(nftCol[i.nftIndex]).safeTransferFrom(address(this), msg.sender, i.nftId);
	    delete items[_index];
    }

    function buyItem(uint _index) external nonReentrant {
	    Item storage i = items[_index];
	    require(i.seller != address(0), "no such item");
	    require(!i.sold, "item sold already");
        require(i.buyer == msg.sender, "you are not WL");

	    i.sold = true;

	    IERC20(currency[i.currencyIndex]).transferFrom(msg.sender, address(this), i.price);
        IERC721(nftCol[i.nftIndex]).safeTransferFrom(address(this), msg.sender, i.nftId);
    }
}
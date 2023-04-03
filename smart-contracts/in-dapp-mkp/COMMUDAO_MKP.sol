// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract COMMUDAO_MKP is ERC721Holder, ReentrancyGuard {
	address public projectAdmin;
	
	modifier onlyProjectAdmin() {
		require(msg.sender == projectAdmin, "Not Permission to call");
		_;
	}

	mapping(uint256=>address) public nftCol;
	mapping(uint256=>address) public currency;

	uint256 public fee;
	mapping(uint256=>uint256) public royalty;
	mapping(uint256=>address) public nftOwner;

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

	event AddItem(address indexed seller, uint256 indexed nftIndex, uint256 nftId, uint256 indexed currencyIndex, uint256 price, uint256 itemCount);
	event RemoveItem(address indexed seller, uint256 indexed nftIndex, uint256 currencyIndex, uint256 itemCount);
	event BuyItem(address indexed seller, address indexed buyer, uint256 indexed nftIndex, uint256 currencyIndex, uint256 itemCount);

	constructor() {
		projectAdmin = msg.sender;
		fee = 1000;
	}

	function setProjectAdmin(address _addr) external onlyProjectAdmin {
		projectAdmin = _addr;
	}

	function setNft(uint256 _index, address _addr) external onlyProjectAdmin {
		nftCol[_index] = _addr;
	}

	function setCurrency(uint256 _index, address _addr) external onlyProjectAdmin {
		currency[_index] = _addr;
	}

	function setFee(uint256 _fee) external onlyProjectAdmin {
		fee = _fee;
	}

	function setRoyalty(uint256 _nftIndex, uint256 _royaltyFee, address _ownerAddr) external onlyProjectAdmin {
		nftOwner[_nftIndex] = _ownerAddr;
		royalty[_nftIndex] = _royaltyFee;
	}

	function withdrawFee(uint256 _tokenIndex, uint256 _amount, address _to) external onlyProjectAdmin {
		IERC20(currency[_tokenIndex]).transfer(_to, _amount);
	}

	function migrateNFT(uint256 _nftIndex, uint256 _nftId, address _to) external onlyProjectAdmin {
		IERC721(nftCol[_nftIndex]).safeTransferFrom(address(this), _to, _nftId);
	}

	function addItem(
		uint256 _nftIndex,
		uint256 _nftId,
		uint256 _currencyIndex,
		uint256 _price
	) external nonReentrant {
		itemCount++;
		items[itemCount].seller = msg.sender;
		items[itemCount].nftIndex = _nftIndex;
		items[itemCount].nftId = _nftId;
		items[itemCount].currencyIndex = _currencyIndex;
		items[itemCount].price = _price;

		IERC721(nftCol[_nftIndex]).safeTransferFrom(msg.sender, address(this), _nftId);
		emit AddItem(msg.sender, _nftIndex, _nftId, _currencyIndex, _price, itemCount);
	}

	function removeItem(uint _index) external nonReentrant {
		Item storage i = items[_index];
		require(i.seller != address(0), "no such item");
		require(i.seller == msg.sender, "only seller can remove item");
		require(!i.sold, "item sold already");

		IERC721(nftCol[i.nftIndex]).safeTransferFrom(address(this), msg.sender, i.nftId);
		emit RemoveItem(msg.sender, i.nftIndex, i.currencyIndex, _index);
		delete items[_index];
	}

	function buyItem(uint _index) external nonReentrant {
		Item storage i = items[_index];
		require(i.seller != address(0), "no such item");
		require(!i.sold, "item sold already");

		i.buyer = msg.sender;
		i.sold = true;
		uint256 platformFee = (i.price/10000) * fee;
		uint256 royaltyFee = (i.price/10000) * royalty[i.currencyIndex];

		IERC20(currency[i.currencyIndex]).transferFrom(msg.sender, i.seller, i.price - (platformFee + royaltyFee));
		IERC20(currency[i.currencyIndex]).transferFrom(msg.sender, address(this), platformFee);
		IERC20(currency[i.currencyIndex]).transferFrom(msg.sender, nftOwner[i.nftIndex], royaltyFee);
		IERC721(nftCol[i.nftIndex]).safeTransferFrom(address(this), msg.sender, i.nftId);
		emit BuyItem(i.seller, msg.sender, i.nftIndex, i.currencyIndex, _index);
	}

}

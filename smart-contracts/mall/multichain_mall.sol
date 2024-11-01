// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/utils/ERC721Holder.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract multichainMall is ERC721URIStorage, ERC721Holder, Ownable {
    uint256 public listFee;
    uint256 public removeFee; 
    uint256 public royaltyFee;
    address public colOwner;
    struct Item {
        address seller;
	    address buyer;
        uint256 nftId;
        uint256 price;
        bool sold;
    }
    mapping(uint256 => Item) public items;
    uint256 public itemCount;

    event MintItem(uint256 indexed itemCount, uint256 indexed nftId, address indexed seller);
    event ListItem(uint256 indexed itemCount, uint256 indexed nftId, address indexed seller, uint256 price);
    event RemoveItem(uint256 indexed itemCount, uint256 indexed nftId, address indexed seller);
    event BuyItem(uint256 indexed itemCount, uint256 indexed nftId, address seller, address indexed buyer);

    constructor(string memory _nftName, string memory _nftSymbol) ERC721(_nftName, _nftSymbol) Ownable(msg.sender) {}

    function setFee(uint256 _listFee, uint256 _removeFee) external onlyOwner {
        listFee = _listFee;
        removeFee = _removeFee;
    }

    function withdrawFee(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    function setRoyalty(uint256 _royaltyFee, address _colOwner) external onlyOwner {
        colOwner = _colOwner;
        royaltyFee = _royaltyFee;
    }

    function mintNfts(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) external onlyOwner {
        _safeMint(address(this), _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        itemCount++;
	    items[itemCount].seller = _to;
        items[itemCount].nftId = _tokenId;
        items[itemCount].price = 999999999 ether;
        emit MintItem(itemCount, _tokenId, _to);
    }

    function listItem(uint256 _itemCount, uint256 _price) external {
	    require(items[_itemCount].seller == msg.sender, "only seller can add item");
	    items[_itemCount].price = _price;
        emit ListItem(_itemCount, items[_itemCount].nftId, msg.sender, _price);
    }

    function removeItem(uint256 _itemCount) external payable {
        require(msg.value == removeFee, "pls pay remove fee");
	    require(items[_itemCount].seller == msg.sender, "only seller can remove item");
	    require(!items[_itemCount].sold, "item sold already");
        _transfer(address(this), msg.sender, items[_itemCount].nftId);
        emit RemoveItem(_itemCount, items[_itemCount].nftId, msg.sender);
	    delete items[_itemCount];
    }

    function buyItem(uint256 _itemCount) external payable {
        require(msg.value == items[_itemCount].price, "pls pay nft price");
	    require(!items[_itemCount].sold, "item sold already");
        items[_itemCount].sold = true;
	    items[_itemCount].buyer = msg.sender;
        payable(items[_itemCount].seller).transfer(items[_itemCount].price - (((items[_itemCount].price / 10000) * listFee) + ((items[_itemCount].price / 10000) * royaltyFee)));
        payable(colOwner).transfer((items[_itemCount].price / 10000) * royaltyFee);
        _transfer(address(this), msg.sender, items[_itemCount].nftId);
        emit BuyItem(_itemCount, items[_itemCount].nftId, items[_itemCount].seller, msg.sender);
    }

    function migrateNFT(uint256 _tokenId, address _to) external onlyOwner {
        _transfer(address(this), _to, _tokenId);
    }
}
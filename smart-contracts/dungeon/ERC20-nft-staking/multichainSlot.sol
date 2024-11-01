// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/IERC20.sol";

contract multichainSlot is Ownable {
    mapping(uint256 => address) public nfts;
    struct NftToken {
        uint256 nftId;
        uint256 colIndex;
    }
    mapping(address => mapping(uint256 => NftToken)) public nftStake;
    mapping(address => uint256) public slotLevel;
    mapping(address => uint256) public nftStatus;
    mapping(address => uint256) public nonTransferSCM;
    mapping(uint256 => address) public resources;
    struct UpLevel {
        uint256 newLevel;
        uint256 resourceIndex;
        uint256 resourceReq;
    }
    mapping(uint256 => UpLevel) public upLevel;

    event ItemStaked(uint256 indexed tokenCol, uint256 indexed tokenId, address indexed owner);
    event ItemUnstaked(uint256 indexed tokenCol, uint256 indexed tokenId, address indexed owner);

    constructor() Ownable(msg.sender) {}

    function setNfts(uint256 _index, address _addr) external onlyOwner {
        nfts[_index] = _addr;
    }

    function stake(
        uint256 _slotIndex,
        uint256 _colIndex,
        uint256 _nftId
    ) external payable {
        require(msg.value >= 0.00005 ether);
        require(nftStake[msg.sender][_slotIndex].nftId == 0, "Slot is using");
        require(_slotIndex <= slotLevel[msg.sender] + 4, "Unavailable slot");
        nonTransferSCM[msg.sender] += msg.value;
        IERC721(nfts[_colIndex]).transferFrom(msg.sender, address(this), _nftId);
        nftStake[msg.sender][_slotIndex].colIndex = _colIndex;
        nftStake[msg.sender][_slotIndex].nftId = _nftId;
        nftStatus[msg.sender] += (_nftId % 100000);
        emit ItemStaked(_colIndex, _nftId, msg.sender);
    }

    function unstake(uint256 _slotIndex) external {
        IERC721(nfts[nftStake[msg.sender][_slotIndex].colIndex]).transferFrom(address(this), msg.sender, nftStake[msg.sender][_slotIndex].nftId);
        nftStatus[msg.sender] -= (nftStake[msg.sender][_slotIndex].nftId % 100000);
        emit ItemUnstaked(nftStake[msg.sender][_slotIndex].colIndex, nftStake[msg.sender][_slotIndex].nftId, msg.sender);
        delete nftStake[msg.sender][_slotIndex];
    }

    function migrateNFT(
        uint256 _colIndex,
        uint256 _nftId,
        address _to
    ) external onlyOwner {
        IERC721(nfts[_colIndex]).transferFrom(address(this), _to, _nftId);
    }

    function setResource(uint256 _index, address _resource) external onlyOwner {
        resources[_index] = _resource;
    }

    function setUplevel(
        uint256 _index,
        uint256 _newLevel,
        uint256 _resourceIndex,
        uint256 _resourceReq
    ) external onlyOwner {
        upLevel[_index].newLevel = _newLevel;
        upLevel[_index].resourceIndex = _resourceIndex;
        upLevel[_index].resourceReq = _resourceReq;
    }

    function upgrade(uint256 _index) external {
        require(slotLevel[msg.sender] + 1 == upLevel[_index].newLevel, "Level too low");
        IERC20(resources[upLevel[_index].resourceIndex]).transferFrom(msg.sender, address(1), upLevel[_index].resourceReq);
        slotLevel[msg.sender] += 1;
    }
}
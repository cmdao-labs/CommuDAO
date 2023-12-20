// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "https://github.com/coshi-labs/CommuDAO/blob/main/smart-contracts/ERC20-labs/gold.sol";

contract FieldTHL_V2 is ERC721Holder, ReentrancyGuard, Ownable {
    address public nftAddr;
    address public rewardToken1;

    struct NftToken {
        address tokenOwnerOf;
        uint256 tokenStakedAt;
        bool isJbcOut;
    }
    mapping(uint256 => NftToken) public nftStake;

    event ItemStaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event ItemUnstaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event Claimed(uint256 reward1, uint256 reward2, uint256 indexed tokenId, address indexed owner, uint256 timestamp);

    constructor(address _nftAddr, address _rewardToken1) {
        nftAddr = _nftAddr;
        rewardToken1 = _rewardToken1;
    }

    function calculateRewards1(uint256 _tokenId) public view returns (uint256) {
        require(nftStake[_tokenId].tokenStakedAt != 0, "This nft was never staked");

        uint256 timeElapsed = block.timestamp - nftStake[_tokenId].tokenStakedAt;

        return timeElapsed * 1e14;
    }

    function calculateRewards2(uint256 _tokenId) public view returns (uint256) {
        require(nftStake[_tokenId].tokenStakedAt != 0, "This nft was never staked");

        uint256 timeElapsed = block.timestamp - nftStake[_tokenId].tokenStakedAt;

        return timeElapsed;
    }

    function stake(uint256 _tokenId) external nonReentrant {
        IERC721(nftAddr).transferFrom(msg.sender, address(this), _tokenId);

        nftStake[_tokenId].tokenOwnerOf = msg.sender;
        nftStake[_tokenId].tokenStakedAt = block.timestamp;

        emit ItemStaked(_tokenId, msg.sender, block.timestamp);
    }

    function unstake(uint256 _tokenId, bool _unstake) external nonReentrant {
        require(nftStake[_tokenId].tokenOwnerOf == msg.sender, "You are not the owner");

        uint256 reward = calculateRewards1(_tokenId);
        nftStake[_tokenId].tokenStakedAt = block.timestamp;

        gold(rewardToken1).mint(4, msg.sender, reward);

        emit Claimed(reward, 0, _tokenId, msg.sender, block.timestamp);

        if (_unstake) {
            IERC721(nftAddr).transferFrom(address(this), msg.sender, _tokenId);

            delete nftStake[_tokenId].tokenOwnerOf;
            delete nftStake[_tokenId].tokenStakedAt;

            emit ItemUnstaked(_tokenId, msg.sender, block.timestamp);
        }
    }

    function claimJBC(uint256 _tokenId) external nonReentrant {
        require(nftStake[_tokenId].tokenOwnerOf == msg.sender, "You are not the owner");
        require(!nftStake[_tokenId].isJbcOut, "JBC OUT!");
        require(calculateRewards2(_tokenId) >= 1 days, "AWAIT FOR 1 DAY!");

        nftStake[_tokenId].isJbcOut = true;
        payable(msg.sender).transfer(500 ether);

        emit Claimed(0, 500 ether, _tokenId, msg.sender, block.timestamp);
    }

    function setIsJBCOut(uint256 _tokenId, bool _isOut) external onlyOwner {
        nftStake[_tokenId].isJbcOut = _isOut;
    }

    function emergencyUnstakeNFT(uint256 _tokenId, address _to) external onlyOwner {
        IERC721(nftAddr).transferFrom(address(this), _to, _tokenId);

        delete nftStake[_tokenId].tokenOwnerOf;
        delete nftStake[_tokenId].tokenStakedAt;

        emit ItemUnstaked(_tokenId, _to, block.timestamp);
    }

    function migrateReward(uint256 _amount) external onlyOwner {
        payable(msg.sender).transfer(_amount);
    }

    fallback() external payable {}
    receive() external payable {}
}
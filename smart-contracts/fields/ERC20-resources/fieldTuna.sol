// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract fieldTuna is ERC20, ERC721Holder, ReentrancyGuard {

    IERC721 public nft;
    struct NftToken {
        address tokenOwnerOf;
        uint256 tokenStakedAt;
        bool isStaked;
    }
    mapping(uint256 => NftToken) public nftStake;

    event ItemStaked(uint256 tokenId, address owner, uint256 timestamp);
    event ItemUnstaked(uint256 tokenId, address owner, uint256 timestamp);
    event Claimed(uint256 reward, address owner, uint256 timestamp);

    constructor(address _nft) ERC20("Tuna", "TUNA") {
        nft = IERC721(_nft);
    }

    function stake(uint256 _tokenId) external nonReentrant {
        nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        nftStake[_tokenId].tokenOwnerOf = msg.sender;
        nftStake[_tokenId].tokenStakedAt = block.timestamp;
        nftStake[_tokenId].isStaked = true;

        emit ItemStaked(_tokenId, msg.sender, block.timestamp);
    }

    function calculateRewards(uint256 tokenId) public view returns (uint256) {
        require(nftStake[tokenId].isStaked, "This nft was never staked");

        uint256 bonus;
        if (tokenId >= 61) {
            bonus = 2;
        } else if (tokenId >= 31 && tokenId <= 59) {
            bonus = 5;
        } else if (tokenId >= 11 && tokenId <= 29) {
            bonus = 10;
        } else if (tokenId <= 10) {
            bonus = 25;
        }

        uint256 timeElapsed = block.timestamp - nftStake[tokenId].tokenStakedAt;

        return bonus * timeElapsed * 1e14;
    }

    function unstake(uint256 _tokenId, bool _unstake) external nonReentrant {
        require(nftStake[_tokenId].tokenOwnerOf == msg.sender, "You are not the owner");

        _mint(msg.sender, calculateRewards(_tokenId));
        nftStake[_tokenId].tokenStakedAt = block.timestamp;
        emit Claimed(calculateRewards(_tokenId), msg.sender, block.timestamp);

        if (_unstake) {
            nft.transferFrom(address(this), msg.sender, _tokenId);
            delete nftStake[_tokenId];
            emit ItemUnstaked(_tokenId, msg.sender, block.timestamp);
        }
    }
    
}
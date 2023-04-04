// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract fieldMice is ERC20, ERC721Holder, ReentrancyGuard {

    address public nft;
    struct NftToken {
        address tokenOwnerOf;
        uint256 tokenStakedAt;
        bool isStaked;
    }
    mapping(uint256 => NftToken) public nftStake;

    event ItemStaked(uint256 tokenId, address owner, uint256 timestamp);
    event ItemUnstaked(uint256 tokenId, address owner, uint256 timestamp);
    event Claimed(uint256 reward, address owner, uint256 timestamp);

    constructor(address _nft) ERC20("Mice", "MICE") {
        nft = _nft;
    }

    function stake(uint256 _tokenId) external nonReentrant {
        IERC721(nft).safeTransferFrom(msg.sender, address(this), _tokenId);

        nftStake[_tokenId].tokenOwnerOf = msg.sender;
        nftStake[_tokenId].tokenStakedAt = block.timestamp;
        nftStake[_tokenId].isStaked = true;

        emit ItemStaked(_tokenId, msg.sender, block.timestamp);
    }

    function calculateRewards(uint256 tokenId) public view returns (uint256) {
        require(nftStake[tokenId].isStaked, "This nft was never staked");

        uint256 bonus;
        if (tokenId >= 400) {
            bonus = 4;
        } else if (tokenId >= 180 && tokenId <= 399) {
            bonus = 10;
        } else if (tokenId >= 60 && tokenId <= 179) {
            bonus = 20;
        } else if (tokenId >= 20 && tokenId <= 59) {
            bonus = 50;
        } else if (tokenId >= 2 && tokenId <= 19) {
            bonus = 100;
        } else if (tokenId == 1) {
            bonus = 400;
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
            IERC721(nft).transferFrom(address(this), msg.sender, _tokenId);
            delete nftStake[_tokenId];
            emit ItemUnstaked(_tokenId, msg.sender, block.timestamp);
        }
    }
    
}
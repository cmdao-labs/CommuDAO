// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FieldVaBag is ERC20, ERC721Holder, ReentrancyGuard, Ownable {
    address public acNft;

    mapping(uint256=>uint256) public power;

    struct NftToken {
        address tokenOwnerOf;
        uint256 tokenStakedAt;
        uint256 power;
    }
    mapping(uint256=>NftToken) public nftStake;

    event ItemStaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event ItemUnstaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event Claimed(uint256 reward, uint256 indexed tokenId, address indexed owner, uint256 timestamp);

    constructor(address _acNft) ERC20("Valuables Bag", "VABAG") {
        acNft = _acNft;
    }

    function setPower(
        uint256 _nftClass,
        uint256 _power
    ) external onlyOwner {
        power[_nftClass] = _power;
    }

    function calculateRewards(uint256 _tokenId) public view returns (uint256) {
        NftToken storage stakednft = nftStake[_tokenId];
        require(stakednft.tokenStakedAt != 0, "This nft was never staked");

        uint256 timeElapsed = block.timestamp - stakednft.tokenStakedAt;

        return timeElapsed * stakednft.power * 3171296000;
    }

    function stake(uint256 _tokenId) external nonReentrant {
        NftToken storage stakednft = nftStake[_tokenId];

        IERC721(acNft).transferFrom(msg.sender, address(this), _tokenId);

        stakednft.tokenOwnerOf = msg.sender;
        stakednft.tokenStakedAt = block.timestamp;
        stakednft.power = power[_tokenId / 1e6];

        emit ItemStaked(_tokenId, msg.sender, block.timestamp);
    }

    function unstake(
        uint256 _tokenId,
        bool _unstake
    ) external nonReentrant {
        NftToken storage stakednft = nftStake[_tokenId];

        require(stakednft.tokenOwnerOf == msg.sender, "You are not the owner");

        _mint(msg.sender, calculateRewards(_tokenId));
        stakednft.tokenStakedAt = block.timestamp;

        emit Claimed(calculateRewards(_tokenId), _tokenId, msg.sender, block.timestamp);

        if (_unstake) {
            IERC721(acNft).transferFrom(address(this), msg.sender, _tokenId);

            delete nftStake[_tokenId];
            emit ItemUnstaked(_tokenId, msg.sender, block.timestamp);
        }
    }
}
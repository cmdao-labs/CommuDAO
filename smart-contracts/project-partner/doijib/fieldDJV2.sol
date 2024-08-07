// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/IERC20.sol";

contract FieldDJV2 is Ownable {
    address public nftAddr;
    address public rewardToken;

    struct NftToken {
        address tokenOwnerOf;
        uint256 tokenStakedAt;
    }
    mapping(uint256 => NftToken) public nftStake;

    constructor(address _nftAddr, address _rewardToken) Ownable(msg.sender) {
        nftAddr = _nftAddr;
        rewardToken = _rewardToken;
    }

    function calculateRewards(uint256 _tokenId) public view returns (uint256) {
        require(nftStake[_tokenId].tokenStakedAt != 0, "This nft was never staked");
        uint256 timeElapsed = block.timestamp - nftStake[_tokenId].tokenStakedAt;
        return timeElapsed;
    }

    function stake(uint256 _tokenId) external {
        IERC721(nftAddr).transferFrom(msg.sender, address(this), _tokenId);
        nftStake[_tokenId].tokenOwnerOf = msg.sender;
        nftStake[_tokenId].tokenStakedAt = block.timestamp;
    }

    function unstake(uint256 _tokenId, bool _isNeedHarvest) external {
        require(nftStake[_tokenId].tokenOwnerOf == msg.sender, "You are not the owner");
        IERC721(nftAddr).transferFrom(address(this), address(1), _tokenId);
        IERC20(rewardToken).transfer(msg.sender, 500000 ether);

        if (_isNeedHarvest) {
            require(calculateRewards(_tokenId) >= 30 days, "AWAIT FOR 30 DAY!");
            IERC20(rewardToken).transfer(msg.sender, 500000 ether);
        }

        delete nftStake[_tokenId].tokenOwnerOf;
        delete nftStake[_tokenId].tokenStakedAt;
    }

    function emergencyUnstakeNFT(uint256 _tokenId, address _to) external onlyOwner {
        IERC721(nftAddr).transferFrom(address(this), _to, _tokenId);
    }

    function migrateReward(uint256 _amount, address _to) external onlyOwner {
        IERC20(rewardToken).transfer(_to, _amount);
    }

    function migrateFromV1(
        uint256 _tokenId, 
        uint256 _tokenStakedAt,
        address _to
    ) external onlyOwner {
        nftStake[_tokenId].tokenOwnerOf = _to;
        nftStake[_tokenId].tokenStakedAt = _tokenStakedAt;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/utils/ERC721Holder.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract FieldTheInnovatesPlant is ERC721Holder, Ownable {
    address public rewardToken;
    address public nftEligible;
    mapping(uint256 => address) public nftOwner;
    struct UserState {
        uint256 stakedAt;
        uint256 power;
    }
    mapping(address => UserState) public userState;
    mapping(uint256 => uint256) public powerState;

    event ItemStaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event ItemUnstaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event Claimed(uint256 reward, address indexed owner, uint256 timestamp);

    constructor(address _rewardToken, address _nftEligible) {
        rewardToken = _rewardToken;
        nftEligible = _nftEligible;
    }

    function calculateRewards(address _addr) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - userState[_addr].stakedAt;
        return timeElapsed * userState[_addr].power * 2 * 1e11;
    }

    function harvest() public {
        uint256 pending = calculateRewards(msg.sender);
        userState[msg.sender].stakedAt = block.timestamp;
        IERC20(rewardToken).transfer(msg.sender, pending);
        emit Claimed(pending, msg.sender, block.timestamp);
    }

    function stake(uint256 _tokenId) external {
        IERC721(nftEligible).transferFrom(msg.sender, address(this), _tokenId);
        nftOwner[_tokenId] = msg.sender;
        if (calculateRewards(msg.sender) != 0) {
            harvest();
        } else {
            userState[msg.sender].stakedAt = block.timestamp;
        }
        userState[msg.sender].power += powerState[_tokenId % 1e18];
        emit ItemStaked(_tokenId, msg.sender, block.timestamp);
    }

    function unstake(uint256 _tokenId) external {
        require(nftOwner[_tokenId] == msg.sender, "You are not the owner");        
        IERC721(nftEligible).transferFrom(address(this), msg.sender, _tokenId);
        if (calculateRewards(msg.sender) != 0) {
            harvest();
        }
        userState[msg.sender].power -= powerState[_tokenId % 1e18];
        delete nftOwner[_tokenId];
        emit ItemUnstaked(_tokenId, msg.sender, block.timestamp);
    }

    function setPowerState(uint256 _tokenCol, uint256 _tokenPower) external onlyOwner {
        powerState[_tokenCol] = _tokenPower;
    }

    function migrateNFT(uint256 _tokenId, address _to) external onlyOwner {
        IERC721(nftEligible).transferFrom(address(this), _to, _tokenId);
    }

    function migrateReward(uint256 _amount) external onlyOwner {
        IERC20(rewardToken).transfer(msg.sender, _amount);
    }
}
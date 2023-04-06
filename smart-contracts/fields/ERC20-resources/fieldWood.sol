// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "https://github.com/demontocoshi/CommuDAO/blob/main/smart-contracts/fields/ERC721/StarterRouter_CMDS.sol";

contract fieldWood is ERC20, ERC721Holder, ReentrancyGuard, Ownable {
    mapping(uint256=>address) public programCall;

    address public cmdsNft;

    address public nftData;

    address public tokensReward; 

    mapping(uint256=>uint256) public hashRate;

    struct NftStake {
        address tokenOwnerOf;
        uint256 tokenStakedAt;
        uint256 startExp;
        bool isStaked;
    }
    mapping(uint256 => NftStake) public nftStake;

    event ItemStaked(uint256 tokenId, address owner, uint256 timestamp);
    event ItemUnstaked(uint256 tokenId, address owner, uint256 timestamp);
    event Claimed(uint256 reward, address owner, uint256 timestamp);

    constructor(address _cmdsNft, address _nftData, address _tokensReward) ERC20("Wood", "WOOD") {
        cmdsNft = _cmdsNft;
        nftData = _nftData;
        tokensReward = _tokensReward;
    }

    function setProgramCall(uint256 _index, address _addr) public onlyOwner {
        programCall[_index] = _addr;
    }

    function setCmdsNft(address _cmdsNft, address _nftData) external onlyOwner {
        cmdsNft = _cmdsNft;
        nftData = _nftData;
    }

    function setTokenReward(address _addr) external onlyOwner {
        tokensReward = _addr;
    }

    function setHashRate(uint256 _classId, uint256 _hashRate) external onlyOwner {
        hashRate[_classId] = _hashRate;
    }

    function stake(uint256 _tokenId) external nonReentrant {
        IERC721(cmdsNft).safeTransferFrom(msg.sender, address(this), _tokenId);

        nftStake[_tokenId].tokenOwnerOf = msg.sender;
        nftStake[_tokenId].tokenStakedAt = block.timestamp;
        (, uint256 exp) = StarterRouter_CMDS(nftData).nftData((1000000 * 1e13) + (_tokenId % 1e13));
        nftStake[_tokenId].startExp = exp;
        nftStake[_tokenId].isStaked = true;

        emit ItemStaked(_tokenId, msg.sender, block.timestamp);
    }

    function calculateRewards(uint256 _tokenId) public view returns (uint256) {
        require(nftStake[_tokenId].isStaked, "This nft was never staked");

        uint256 hashrate = hashRate[_tokenId / 1e13];
        uint256 timeElapsed = block.timestamp - nftStake[_tokenId].tokenStakedAt;

        return hashrate * timeElapsed * 1e16;
    }

    function unstake(uint256 _tokenId, bool _unstake) external nonReentrant {
        require(nftStake[_tokenId].tokenOwnerOf == msg.sender, "You are not the owner");

        StarterRouter_CMDS(nftData).updateServantData(1, (1000000 * 1e13) + (_tokenId % 1e13), nftStake[_tokenId].startExp + calculateRewards(_tokenId), false, "");
        _mint(msg.sender, calculateRewards(_tokenId));
        IERC20(tokensReward).transfer(msg.sender, calculateRewards(_tokenId) / 1e12);
        nftStake[_tokenId].tokenStakedAt = block.timestamp;

        emit Claimed(calculateRewards(_tokenId), msg.sender, block.timestamp);

        if (_unstake) {
            IERC721(cmdsNft).transferFrom(address(this), msg.sender, _tokenId);
            delete nftStake[_tokenId];

            emit ItemUnstaked(_tokenId, msg.sender, block.timestamp);
        }
    }

    function transferFrom_CMDS(
        uint256 _index,
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        IERC721(cmdsNft).transferFrom(_from, _to, _tokenId);
    }
    
    function safeTransferFrom_CMDS(
        uint256 _index,
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        IERC721(cmdsNft).safeTransferFrom(_from, _to, _tokenId);
    }

}
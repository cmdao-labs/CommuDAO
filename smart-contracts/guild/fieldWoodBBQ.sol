// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol";
import "./CMDS_NFT_v2.sol";

contract fieldWoodBBQ is ERC20, Ownable {
    address public cmdsNft;
    mapping(uint256 => address) public programCall;
    mapping(uint256 => uint256) public hashRate;
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

    constructor(address _cmdsNft) ERC20("Wood", "WOOD") {
        cmdsNft = _cmdsNft;
    }

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function setHashRate(uint256 _classId, uint256 _hashRate) external onlyOwner {
        hashRate[_classId] = _hashRate;
    }

    function stake(uint256 _tokenId) external {
        CMDS_NFT_v2(cmdsNft).transferFrom(msg.sender, address(this), _tokenId);

        nftStake[_tokenId].tokenOwnerOf = msg.sender;
        nftStake[_tokenId].tokenStakedAt = block.timestamp;
        (, uint256 exp) = CMDS_NFT_v2(cmdsNft).nftData((1000000 * 1e13) + (_tokenId % 1e13));
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

    function unstake(uint256 _tokenId, bool _unstake) external {
        require(nftStake[_tokenId].tokenOwnerOf == msg.sender, "You are not the owner");

        _mint(msg.sender, calculateRewards(_tokenId));
        CMDS_NFT_v2(cmdsNft).updateServantData(2, (1000000 * 1e13) + (_tokenId % 1e13), nftStake[_tokenId].startExp + calculateRewards(_tokenId), false, "", false, address(0));
        nftStake[_tokenId].tokenStakedAt = block.timestamp;

        emit Claimed(calculateRewards(_tokenId), msg.sender, block.timestamp);

        if (_unstake) {
            CMDS_NFT_v2(cmdsNft).transferFrom(address(this), msg.sender, _tokenId);
            delete nftStake[_tokenId];

            emit ItemUnstaked(_tokenId, msg.sender, block.timestamp);
        }
    }

    function unstakeByProgramCall(
        uint256 _index,
        uint256 _tokenId,
        address _to,
        uint256 _amount,
        bool _unstake
    ) public {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        require(nftStake[_tokenId].tokenOwnerOf == _to, "You are not the owner");

        _mint(_to, _amount);
        CMDS_NFT_v2(cmdsNft).updateServantData(2, (1000000 * 1e13) + (_tokenId % 1e13), nftStake[_tokenId].startExp + _amount, false, "", false, address(0));
        nftStake[_tokenId].tokenStakedAt = block.timestamp;

        emit Claimed(_amount, _to, block.timestamp);

        if (_unstake) {
            CMDS_NFT_v2(cmdsNft).transferFrom(address(this), msg.sender, _tokenId);
            delete nftStake[_tokenId];

            emit ItemUnstaked(_tokenId, msg.sender, block.timestamp);
        }
    }

    function migrateCMDS(
        address _from,
        address _to,
        uint256 _tokenId
    ) external onlyOwner {
        CMDS_NFT_v2(cmdsNft).transferFrom(_from, _to, _tokenId);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FieldSalmon is ERC20, ERC721Holder, ReentrancyGuard, Ownable {
    address public rewardToken;

    struct PoolInfo {
        address nftAddr;
        uint256 powerAll;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accRewardPerShare;
    }
    PoolInfo[] public poolInfo;

    uint256 public rewardPerBlock;
    uint256 public BONUS_MULTIPLIER = 1;
    uint256 public totalAllocPoint;
    uint256 public startBlock;

    mapping(uint256=>address) public programCall;
    mapping(uint256=>uint256) public power;

    struct NftToken {
        address tokenOwnerOf;
        uint256 tokenStakedAt;
        uint256 power;
        uint256 rewardDebt;
    }
    mapping(uint256=>mapping(uint256=>NftToken)) public nftStake;

    event ItemStaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event ItemUnstaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event Claimed(uint256 reward1, uint256 reward2, uint256 indexed tokenId, address indexed owner, uint256 timestamp);

    constructor(
        address _rewardToken,
        uint256 _rewardPerBlock,
        uint256 _startBlock
    ) ERC20("Salmon", "SALM") {
        rewardToken = _rewardToken;
        rewardPerBlock = _rewardPerBlock;
        startBlock = _startBlock;
        poolInfo.push(PoolInfo({nftAddr: address(0), powerAll: 0, allocPoint: 0, lastRewardBlock: startBlock, accRewardPerShare: 0}));
        totalAllocPoint = 0;
    }

    function setProgramCall(uint256 _index, address _addr) public onlyOwner {
        programCall[_index] = _addr;
    }

    function setPower(
        uint256 _index,
        uint256 _nftId,
        uint256 _power
    ) external {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");
        power[_nftId] = _power;
    }

    function updateMultiplier(uint256 _multiplierNumber) external onlyOwner {
        BONUS_MULTIPLIER = _multiplierNumber;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    function add(
        address _addr,
        uint256 _allocPoint,
        bool _withUpdate
    ) external onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 _lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint += _allocPoint;
        poolInfo.push(PoolInfo({nftAddr: _addr, powerAll: 0, allocPoint: _allocPoint, lastRewardBlock: _lastRewardBlock, accRewardPerShare: 0}));
        updateStakingPool();
    }

    function set(
        uint256 _pid,
        uint256 _allocPoint,
        bool _withUpdate
    ) external onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 _prevAllocPoint = poolInfo[_pid].allocPoint;
        poolInfo[_pid].allocPoint = _allocPoint;
        if (_prevAllocPoint != _allocPoint) {
            totalAllocPoint = (totalAllocPoint - _prevAllocPoint) + _allocPoint;
            updateStakingPool();
        }
    }

    function updateStakingPool() internal {
        uint256 length = poolInfo.length;
        uint256 points = 0;
        for (uint256 pid = 1; pid < length; ++pid) {
            points += poolInfo[pid].allocPoint;
        }
        if (points != 0) {
            points /= 3;
            totalAllocPoint = (totalAllocPoint - poolInfo[0].allocPoint) + points;
            poolInfo[0].allocPoint = points;
        }
    }

    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        return (_to - _from) * BONUS_MULTIPLIER;
    }

    function pendingReward(uint256 _pid, uint256 _tokenId) public view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        NftToken storage stakednft = nftStake[_pid][_tokenId];
        uint256 _accRewardPerShare = pool.accRewardPerShare;
        if (block.number > pool.lastRewardBlock && pool.powerAll != 0) {
            uint256 _multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 _reward = (_multiplier * rewardPerBlock * pool.allocPoint) / totalAllocPoint;
            _accRewardPerShare += (_reward * 1e12) / pool.powerAll;
        }
        return ((stakednft.power * _accRewardPerShare) / 1e12) - stakednft.rewardDebt;
    }

    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        if (pool.powerAll == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 _multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 _reward = (_multiplier * rewardPerBlock * pool.allocPoint) / totalAllocPoint;
        pool.accRewardPerShare += (_reward * 1e12) / pool.powerAll;
        pool.lastRewardBlock = block.number;
    }

    function calculateRewards(uint256 _pid, uint256 _tokenId) public view returns (uint256) {
        NftToken storage stakednft = nftStake[_pid][_tokenId];
        require(stakednft.tokenStakedAt != 0, "This nft was never staked");

        uint256 timeElapsed = block.timestamp - stakednft.tokenStakedAt;

        return timeElapsed * 1e14;
    }

    function stake(uint256 _pid, uint256 _tokenId) external nonReentrant {
        PoolInfo storage pool = poolInfo[_pid];
        NftToken storage stakednft = nftStake[_pid][_tokenId];

        updatePool(_pid);

        IERC721(pool.nftAddr).transferFrom(msg.sender, address(this), _tokenId);

        stakednft.tokenOwnerOf = msg.sender;
        stakednft.tokenStakedAt = block.timestamp;
        stakednft.power += power[_tokenId];
        pool.powerAll += power[_tokenId];
        stakednft.rewardDebt = (stakednft.power * pool.accRewardPerShare) / 1e12;

        emit ItemStaked(_tokenId, msg.sender, block.timestamp);
    }

    function unstake(
        uint256 _pid,
        uint256 _tokenId,
        bool _unstake
    ) external nonReentrant {
        PoolInfo storage pool = poolInfo[_pid];
        NftToken storage stakednft = nftStake[_pid][_tokenId];

        require(stakednft.tokenOwnerOf == msg.sender, "You are not the owner");
        updatePool(_pid);

        _mint(msg.sender, calculateRewards(_pid, _tokenId));
        stakednft.tokenStakedAt = block.timestamp;

        uint256 _pending = pendingReward(_pid, _tokenId);
        if (_pending > 0) {
            _pending < ERC20(rewardToken).balanceOf(address(this)) ?
                ERC20(rewardToken).transfer(msg.sender, _pending) :
                ERC20(rewardToken).transfer(msg.sender, ERC20(rewardToken).balanceOf(address(this)));
        }
        stakednft.rewardDebt = (stakednft.power * pool.accRewardPerShare) / 1e12;
        emit Claimed(calculateRewards(_pid, _tokenId), pendingReward(_pid, _tokenId), _tokenId, msg.sender, block.timestamp);

        if (_unstake) {
            IERC721(pool.nftAddr).transferFrom(address(this), msg.sender, _tokenId);

            pool.powerAll -= stakednft.power;
            delete nftStake[_pid][_tokenId];
            emit ItemUnstaked(_tokenId, msg.sender, block.timestamp);
        }
    }

    function migrateNFT(
        uint256 _pid,
        uint256 _tokenId,
        address _to
    ) external onlyOwner {
        PoolInfo storage pool = poolInfo[_pid];
        IERC721(pool.nftAddr).transferFrom(address(this), _to, _tokenId);
    }

    function migrateReward(uint256 _amount) external onlyOwner {
        ERC20(rewardToken).transfer(msg.sender, _amount);
    }
}
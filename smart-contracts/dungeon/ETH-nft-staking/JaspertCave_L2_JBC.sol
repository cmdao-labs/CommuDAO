// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "https://github.com/demontocoshi/CommuDAO/blob/main/smart-contracts/dungeon/ERC20-nft-staking/dungeonJasper.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JasperCave_L2_JBC is ERC721Holder, ReentrancyGuard, Ownable {
    struct UserInfo {
        uint256 followerId;
        uint256 servantId;
        uint256 cmpow;
        uint256 rewardDebt;
    }
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;

    struct PoolInfo {
        dungeonJasper mainDungeon;
        IERC721 follower;
        IERC721 servant;
        uint256 cmpowAll;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accRewardPerShare;
    }
    PoolInfo[] public poolInfo;

    uint256 public rewardPerBlock;
    uint256 public BONUS_MULTIPLIER = 1;
    uint256 public totalAllocPoint = 0;
    uint256 public startBlock;

    mapping(uint256 => uint256) public bonusCMPOW;

    constructor(uint256 _rewardPerBlock, uint256 _startBlock) {
        rewardPerBlock = _rewardPerBlock;
        startBlock = _startBlock;
        poolInfo.push(PoolInfo({mainDungeon: dungeonJasper(address(0)), follower: IERC721(address(0)), servant: IERC721(address(0)), cmpowAll: 0, allocPoint: 0, lastRewardBlock: startBlock, accRewardPerShare: 0}));
        totalAllocPoint = 0;
    }

    function setBonusCMPOW(uint256 _classId, uint256 _bonus) external onlyOwner {
        bonusCMPOW[_classId] = _bonus;
    }

    function updateMultiplier(uint256 _multiplierNumber) external onlyOwner {
        BONUS_MULTIPLIER = _multiplierNumber;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    function add(
        address _mainDungeon,
        address _follower,
        address _servant,
        uint256 _allocPoint,
        bool _withUpdate
    ) external onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 _lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint += _allocPoint;
        poolInfo.push(PoolInfo({mainDungeon: dungeonJasper(_mainDungeon), follower: IERC721(_follower), servant: IERC721(_servant), cmpowAll: 0, allocPoint: _allocPoint, lastRewardBlock: _lastRewardBlock, accRewardPerShare: 0}));
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

    function pendingReward(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 _accRewardPerShare = pool.accRewardPerShare;
        if (block.number > pool.lastRewardBlock && pool.cmpowAll != 0) {
            uint256 _multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 _reward = (_multiplier * rewardPerBlock * pool.allocPoint) / totalAllocPoint;
            _accRewardPerShare += (_reward * 1e12) / pool.cmpowAll;
        }
        return ((user.cmpow * _accRewardPerShare) / 1e12) - user.rewardDebt;
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
        if (pool.cmpowAll == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 _multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 _reward = (_multiplier * rewardPerBlock * pool.allocPoint) / totalAllocPoint;
        pool.accRewardPerShare += (_reward * 1e12) / pool.cmpowAll;
        pool.lastRewardBlock = block.number;
    }

    function stakeL2(
        uint256 _pid,
        uint256 _followerId,
        uint256 _servantId
    ) external {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        (,,,,,,, uint256 cmpow,, bool isStaked) = pool.mainDungeon.nftEquip(msg.sender);

        require(address(this).balance > 0, "Reward run out!");
        require(isStaked, "Stake in main dungeon first");
        require(user.cmpow == 0, "Must unstake on this layer");
        updatePool(_pid);

        if (user.followerId == 0) {
            pool.follower.transferFrom(msg.sender, address(this), _followerId);
            user.followerId = _followerId;
        }
        if (_servantId != 0) {
            pool.servant.transferFrom(msg.sender, address(this), _servantId);
            user.servantId = _servantId;
        }

        user.cmpow = cmpow;
        pool.cmpowAll += cmpow;
        if (user.servantId != 0) {
            user.cmpow += bonusCMPOW[_servantId / 1e13];
            pool.cmpowAll += bonusCMPOW[_servantId / 1e13];
        }
        user.rewardDebt = (user.cmpow * pool.accRewardPerShare) / 1e12;
    }

    function unstakeL2(
        uint256 _pid,
        bool _followerBack,
        bool _servantBack
    ) external nonReentrant {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.cmpow != 0, "Must stake on this layer");
        updatePool(_pid);

        uint256 _cmpow = user.cmpow;
        delete user.cmpow;

        uint256 pending = ((_cmpow * pool.accRewardPerShare) / 1e12) - user.rewardDebt;
        if (pending > 0) {
            pending < address(this).balance ?
                payable(msg.sender).transfer(pending) :
                payable(msg.sender).transfer(address(this).balance);
        }
        pool.cmpowAll -= _cmpow;
        user.rewardDebt = (_cmpow * pool.accRewardPerShare) / 1e12;

        if (_followerBack) {
            pool.follower.transferFrom(address(this), msg.sender, user.followerId);
            delete user.followerId;
        }
        if (_servantBack) {
            pool.servant.transferFrom(address(this), msg.sender, user.servantId);
            delete user.servantId;
        }
    }

    function emergencyUnstakeNFT(
        uint256 _pid,
        uint256 _tokenId,
        address _to,
        bool _isFollower
    ) external onlyOwner {
        if (_isFollower) {
            poolInfo[_pid].follower.transferFrom(address(this), _to, _tokenId);
            delete userInfo[_pid][_to].followerId;
        } else {
            poolInfo[_pid].servant.transferFrom(address(this), _to, _tokenId);
            delete userInfo[_pid][_to].servantId;
        }
        delete userInfo[_pid][_to].cmpow;
    }

    function migrateReward(uint256 _amount) external onlyOwner {
        payable(msg.sender).transfer(_amount);
    }

    fallback() external payable {}
    receive() external payable {}
}
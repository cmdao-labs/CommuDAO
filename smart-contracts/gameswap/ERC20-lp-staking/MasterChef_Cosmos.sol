// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Cosmos.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MasterChef_CMOS is Ownable, ReentrancyGuard {
    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
    }
    mapping(uint256=>mapping(address=>UserInfo)) public userInfo;

    struct PoolInfo {
        address token;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accRewardPerShare;
    }
    PoolInfo[] public poolInfo;
    
    address public reward;
    uint256 public rewardPerBlock;
    uint256 public BONUS_MULTIPLIER = 1;
    uint256 public totalAllocPoint;
    uint256 public startBlock;

    constructor(
        address _reward,
        uint256 _rewardPerBlock,
        uint256 _startBlock
    ) {
        reward = _reward;
        rewardPerBlock = _rewardPerBlock;
        startBlock = _startBlock;
        poolInfo.push(PoolInfo({token: _reward, allocPoint: 1000, lastRewardBlock: startBlock, accRewardPerShare: 0}));
        totalAllocPoint = 1000;
    }

    function updateMultiplier(uint256 multiplierNumber) external onlyOwner {
        BONUS_MULTIPLIER = multiplierNumber;
    }

    function add(
        uint256 _allocPoint,
        address _token,
        bool _withUpdate
    ) external onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint += _allocPoint;
        poolInfo.push(PoolInfo({token: _token, allocPoint: _allocPoint, lastRewardBlock: lastRewardBlock, accRewardPerShare: 0}));
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
        uint256 prevAllocPoint = poolInfo[_pid].allocPoint;
        poolInfo[_pid].allocPoint = _allocPoint;
        if (prevAllocPoint != _allocPoint) {
            totalAllocPoint = (totalAllocPoint - prevAllocPoint) + _allocPoint;
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
        uint256 lpSupply = IERC20(pool.token).balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 rewardAmount = (multiplier * rewardPerBlock * pool.allocPoint) / totalAllocPoint;
        pool.accRewardPerShare += (rewardAmount * 1e12) / lpSupply;
        pool.lastRewardBlock = block.number;
    }

    function deposit(uint256 _pid, uint256 _amount) external nonReentrant {
        require(_pid != 0, "deposit by staking");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (user.amount > 0) {
            uint256 pending = ((user.amount * pool.accRewardPerShare) / 1e12) - user.rewardDebt;
            if (pending > 0) {
                Cosmos(reward).mint(1, msg.sender, pending);
            }
        }
        if (_amount > 0) {
            IERC20(pool.token).transferFrom(msg.sender, address(this), _amount);
            user.amount += _amount;
        }
        user.rewardDebt = (user.amount * pool.accRewardPerShare) / 1e12;
    }

    function withdraw(uint256 _pid, uint256 _amount) external nonReentrant {
        require(_pid != 0, "withdraw by unstaking");
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");

        updatePool(_pid);
        uint256 pending = ((user.amount * pool.accRewardPerShare) / 1e12) - user.rewardDebt;
        if (pending > 0) {
            Cosmos(reward).mint(1, msg.sender, pending);
        }
        if (_amount > 0) {
            user.amount -= _amount;
            IERC20(pool.token).transfer(msg.sender, _amount);
        }
        user.rewardDebt = (user.amount * pool.accRewardPerShare) / 1e12;
    }

    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        return (_to - _from) * BONUS_MULTIPLIER;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    function pendingReward(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accRewardPerShare = pool.accRewardPerShare;
        uint256 lpSupply = IERC20(pool.token).balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 rewardAmount = (multiplier * rewardPerBlock * pool.allocPoint) / totalAllocPoint;
            accRewardPerShare += (rewardAmount * 1e12) / lpSupply;
        }
        return ((user.amount * accRewardPerShare) / 1e12) - user.rewardDebt;
    }
}
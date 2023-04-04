// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./Mytoken_JDAO.sol"; 
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MasterChefV105 is Ownable {
    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
    }

    struct PoolInfo {
        ERC20 lpToken;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accCakePerShare;
    }

    MyToken public cake;
    uint256 public cakePerBlock;
    uint256 public BONUS_MULTIPLIER = 1;

    PoolInfo[] public poolInfo;
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;
    uint256 public totalAllocPoint = 0;
    uint256 public startBlock;

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);

    constructor(
        MyToken _cake,
        uint256 _cakePerBlock,
        uint256 _startBlock
    ) {
        cake = _cake;
        cakePerBlock = _cakePerBlock;
        startBlock = _startBlock;

        // staking pool
        poolInfo.push(PoolInfo({lpToken: _cake, allocPoint: 1000, lastRewardBlock: startBlock, accCakePerShare: 0}));

        totalAllocPoint = 1000;
    }

    function updateMultiplier(uint256 multiplierNumber) public onlyOwner {
        BONUS_MULTIPLIER = multiplierNumber;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    function add(
        uint256 _allocPoint,
        ERC20 _lpToken,
        bool _withUpdate
    ) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint += _allocPoint;
        poolInfo.push(PoolInfo({lpToken: _lpToken, allocPoint: _allocPoint, lastRewardBlock: lastRewardBlock, accCakePerShare: 0}));
        updateStakingPool();
    }

    function set(
        uint256 _pid,
        uint256 _allocPoint,
        bool _withUpdate
    ) public onlyOwner {
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

    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        return (_to - _from) * BONUS_MULTIPLIER;
    }

    function pendingCake(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accCakePerShare = pool.accCakePerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 cakeReward = (multiplier * cakePerBlock * pool.allocPoint) / totalAllocPoint;
            accCakePerShare += (cakeReward * 1e12) /lpSupply;
        }
        return ((user.amount * accCakePerShare) / 1e12) - user.rewardDebt;
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
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 cakeReward = (multiplier * cakePerBlock * pool.allocPoint) / totalAllocPoint;
        cake.mint(address(this), cakeReward);
        pool.accCakePerShare += (cakeReward * 1e12) / lpSupply;
        pool.lastRewardBlock = block.number;
    }

    function deposit(uint256 _pid, uint256 _amount) public {
        require(_pid != 0, "deposit CAKE by staking");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (user.amount > 0) {
            uint256 pending = ((user.amount * pool.accCakePerShare) / 1e12) - user.rewardDebt;
            if (pending > 0) {
                safeCakeTransfer(msg.sender, pending);
            }
        }
        if (_amount > 0) {
            pool.lpToken.transferFrom(address(msg.sender), address(this), _amount);
            user.amount += _amount;
        }
        user.rewardDebt = (user.amount * pool.accCakePerShare) / 1e12;
        emit Deposit(msg.sender, _pid, _amount);
    }

    function withdraw(uint256 _pid, uint256 _amount) public {
        require(_pid != 0, "withdraw CAKE by unstaking");
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");

        updatePool(_pid);
        uint256 pending = ((user.amount * pool.accCakePerShare) / 1e12) - user.rewardDebt;
        if (pending > 0) {
            safeCakeTransfer(msg.sender, pending);
        }
        if (_amount > 0) {
            user.amount -= _amount;
            pool.lpToken.transfer(address(msg.sender), _amount);
        }
        user.rewardDebt = (user.amount * pool.accCakePerShare) / 1e12;
        emit Withdraw(msg.sender, _pid, _amount);
    }

    function safeCakeTransfer(address _to, uint256 _amount) internal {
        cake.transfer(_to, _amount);
    }

}
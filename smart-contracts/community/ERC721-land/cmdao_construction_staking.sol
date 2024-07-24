// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "./cmcity_construction.sol";

contract CMDAO_CONSTRUCTION_STAKING_V3 is Ownable {
    address public cmcitySlot1;
    address public cmcityConstruction; 
    address public rewardToken;
    uint256 public eligibleIndex;

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

    struct NftToken {
        address tokenOwnerOf;
        uint256 tokenStakedAt;
        uint256 power;
        uint256 rewardDebt;
        uint256 constructionId;
    }
    mapping(uint256=>mapping(uint256=>NftToken)) public nftStake;
    mapping(uint256=>mapping(uint256=>uint256)) public slotUsage;

    event ItemStaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event ItemUnstaked(uint256 indexed tokenId, address indexed owner, uint256 timestamp);
    event Claimed(uint256 reward, uint256 indexed tokenId, address indexed owner, uint256 timestamp);

    constructor(
        address _cmcitySlot1,
        address _cmcityConstruction,
        uint256 _eligibleIndex,
        address _rewardToken,
        uint256 _rewardPerBlock,
        uint256 _startBlock
    ) {
        cmcitySlot1 = _cmcitySlot1;
        cmcityConstruction = _cmcityConstruction;
        eligibleIndex = _eligibleIndex;
        rewardToken = _rewardToken;
        rewardPerBlock = _rewardPerBlock;
        startBlock = _startBlock;
        poolInfo.push(PoolInfo({nftAddr: address(0), powerAll: 0, allocPoint: 0, lastRewardBlock: startBlock, accRewardPerShare: 0}));
        totalAllocPoint = 0;
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

    function stake(
        uint256 _pid,
        uint256 _tokenId,
        uint256 _constructionId
    ) external {
        PoolInfo storage pool = poolInfo[_pid];
        NftToken storage stakednft = nftStake[_pid][_tokenId]; 
        uint256 slot = _tokenId / 100000000000;

        require(slot == eligibleIndex, "Not Eligible NFT Type");
        require(CMCITY_SLOT1(cmcitySlot1).slotOwner(_constructionId) == msg.sender, "No Permission");
        require(slotUsage[_pid][_constructionId] < CMCITY_CONSTRUCTION(cmcityConstruction).constructionLevel(_constructionId), "Unavailable Slot");

        updatePool(_pid);
        IERC721(pool.nftAddr).transferFrom(msg.sender, address(this), _tokenId);
        
        stakednft.tokenOwnerOf = msg.sender;
        stakednft.tokenStakedAt = block.timestamp;
        stakednft.power += _tokenId % 100000;
        stakednft.rewardDebt = (stakednft.power * pool.accRewardPerShare) / 1e12;
        stakednft.constructionId = _constructionId;
        slotUsage[_pid][_constructionId] += 1;
        pool.powerAll += _tokenId % 100000;

        emit ItemStaked(_tokenId, msg.sender, block.timestamp);
    }

    function unstake(
        uint256 _pid,
        uint256 _tokenId,
        bool _unstake
    ) external {
        PoolInfo storage pool = poolInfo[_pid];
        NftToken storage stakednft = nftStake[_pid][_tokenId];

        require(stakednft.tokenOwnerOf == msg.sender, "You are not the owner");
        
        updatePool(_pid);
        stakednft.tokenStakedAt = block.timestamp;

        uint256 _pending = pendingReward(_pid, _tokenId);
        if (_pending > 0) {
            IERC20(rewardToken).transfer(msg.sender, _pending * CMCITY_CONSTRUCTION(cmcityConstruction).landBonus(stakednft.constructionId));
        }
        stakednft.rewardDebt = (stakednft.power * pool.accRewardPerShare) / 1e12;
        emit Claimed(pendingReward(_pid, _tokenId), _tokenId, msg.sender, block.timestamp);

        if (_unstake) {
            IERC721(pool.nftAddr).transferFrom(address(this), msg.sender, _tokenId);

            slotUsage[_pid][stakednft.constructionId] -= 1;
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
        IERC20(rewardToken).transfer(msg.sender, _amount);
    }
}
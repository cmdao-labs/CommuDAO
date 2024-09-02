// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/utils/ReentrancyGuard.sol";

contract stCMDLP is ERC20, Ownable, ReentrancyGuard {
    address public lpAddr;
    mapping(uint256 => address) public rewardToken;
    mapping(uint256 => address) public programCall;
    struct LpStake {
        uint256 tokenStakedAmount;
        uint256 tokenStakedAt;
        bool isStaker;
    }
    mapping(address => LpStake) public lpStake;
    mapping(address => mapping(uint256 => mapping(uint256 => uint256))) public stakedRewards;

    constructor(address _lpAddr) ERC20("Staked CMD-LP", "stCMD-LP") Ownable(msg.sender) {
        lpAddr = _lpAddr;
    }

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function setRewardToken(uint256 _index, address _addr) external onlyOwner { 
        rewardToken[_index] = _addr;
    }

    function setReward(
        uint256 _callIndex,
        address _addr,
        uint256 _epoch,
        uint256 _rewardIndex,
        uint256 _amount
    ) external {
        require(msg.sender == programCall[_callIndex], "no permission!");
        stakedRewards[_addr][_epoch][_rewardIndex] = _amount;
    }

    function stake(uint256 _amount) external {
        IERC20(lpAddr).transferFrom(msg.sender, address(this), _amount);
        if (!lpStake[msg.sender].isStaker) {
            lpStake[msg.sender].tokenStakedAt = block.timestamp;
            lpStake[msg.sender].isStaker = true;
        }
        lpStake[msg.sender].tokenStakedAmount += _amount;
        _mint(msg.sender, _amount);
    }

    function unstake() external {
        require(lpStake[msg.sender].isStaker, "you are not staker!");
        require(block.timestamp - lpStake[msg.sender].tokenStakedAt > 28 days, "await for 28 day!");
        IERC20(lpAddr).transfer(msg.sender, lpStake[msg.sender].tokenStakedAmount);
        _burn(msg.sender, lpStake[msg.sender].tokenStakedAmount);
        delete lpStake[msg.sender].tokenStakedAmount;
        delete lpStake[msg.sender].isStaker;
    }

    function claimReward(uint256 _index, uint256 _epoch) external nonReentrant {
        IERC20(rewardToken[_index]).transfer(msg.sender, stakedRewards[msg.sender][_epoch][_index]);
        delete stakedRewards[msg.sender][_epoch][_index];
    }

    function migrateReward(
        uint256 _index,
        uint256 _amount,
        address _to
    ) external nonReentrant onlyOwner {
        IERC20(rewardToken[_index]).transfer(_to, _amount);
    }
}
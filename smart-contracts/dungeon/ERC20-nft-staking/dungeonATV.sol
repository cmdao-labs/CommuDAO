// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol";
interface IPOWER {
    function nftStatus(address addr) external view returns (uint256 power);
}

contract dungeonATV is ERC20 {
    address public cmdaonftslot;
    address public multichainnftslot;
    struct Stake {
        uint256 allPow;
        uint256 refuelAt;
    }
    mapping(address => Stake) public nftStake;

    event Claimed(address indexed staker, uint256 reward);
    event Sync(address indexed staker, uint256 allpow);
    
    constructor(address _cmdaonftslot, address _multichainnftslot) ERC20("Infinity Power", "INF.POW") {
        cmdaonftslot = _cmdaonftslot;
        multichainnftslot = _multichainnftslot;
    }

    function sync() external {
        require(nftStake[msg.sender].refuelAt + 1 days < block.timestamp, "Sync cooldown!");
        if (nftStake[msg.sender].refuelAt != 0) {
            _mint(msg.sender, calculateRewards(msg.sender));
            emit Claimed(msg.sender, calculateRewards(msg.sender));
        }
        uint256 cmpowCmdaoNftSlot = IPOWER(cmdaonftslot).nftStatus(msg.sender);
        uint256 cmpowMultichainNftSlot = IPOWER(multichainnftslot).nftStatus(msg.sender);
        nftStake[msg.sender].allPow = cmpowCmdaoNftSlot + cmpowMultichainNftSlot;
        nftStake[msg.sender].refuelAt = block.timestamp;
        emit Sync(msg.sender, nftStake[msg.sender].allPow);
    }

    function calculateRewards(address _staker) public view returns (uint256) {
        return nftStake[_staker].allPow * (block.timestamp - nftStake[_staker].refuelAt) * 1 gwei;
    }
}
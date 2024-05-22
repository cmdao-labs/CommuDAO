// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "https://github.com/cmdao-labs/CommuDAO/blob/main/smart-contracts/dungeon/ERC20-nft-staking/dungeonJasper.sol";
import "https://github.com/cmdao-labs/CommuDAO/blob/main/smart-contracts/dungeon/ERC20-nft-staking/dungeonCopper.sol";
import "./stOPT.sol";

contract stOPT_Claimer01_V2 {
    address public mainCopperMine;
    address public mainJasperCave;
    address public mainStOPT;
    mapping(address => mapping(uint256 => uint256)) public userTimeStamp;

    constructor(
        address _mainCopperMine,
        address _mainJasperCave,
        address _mainStOPT
    ) {
        mainCopperMine = _mainCopperMine;
        mainJasperCave = _mainJasperCave;
        mainStOPT = _mainStOPT;
    }

    function mintST(uint256 _index) external {
        require(_index == 1 || _index == 2, "Invalid Dungeon Index!");
        uint256 duration;
        uint256 characterId;
        uint256 refuelAt;
        bool isStaked;
        uint256 rewardMultiplier;
        if (_index == 1) {
            duration = 1 hours;
            (characterId,,,, refuelAt, isStaked) = dungeonCopper(mainCopperMine).nftEquip(msg.sender);
            rewardMultiplier = 1;
        } else {
            duration = 1 days;
            (characterId,,,,,,,, refuelAt, isStaked) = dungeonJasper(mainJasperCave).nftEquip(msg.sender);
            rewardMultiplier = 24;
        }
        require(characterId / 10000000000 == 13, "Reserved for Optimistic NFT!");
        require(isStaked, "Stake in Main Dungeon First!");
        require(userTimeStamp[msg.sender][_index] != refuelAt && refuelAt + duration < block.timestamp, "Reentrancy is Not Allow!");

        userTimeStamp[msg.sender][_index] = refuelAt;

        uint256 reward = (characterId % 100000) * rewardMultiplier * 1e15;
        stOPT(mainStOPT).mint(1, msg.sender, reward);
    }
}
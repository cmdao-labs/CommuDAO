// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "https://github.com/demontocoshi/CommuDAO/blob/main/smart-contracts/dungeon/ERC20-nft-staking/dungeonJasper.sol";
import "./stOPT.sol";

contract stOPT_Jasper_Cave {
    address public mainDungeon;
    address public mainStOPT;
    mapping(address => uint256) public userTimeStamp;

    constructor(address _mainDungeon, address _mainStOPT) {
        mainDungeon = _mainDungeon;
        mainStOPT = _mainStOPT;
    }

    function mintST() external {
        (uint256 characterId,,,,,,,, uint256 refuelAt, bool isStaked) = dungeonJasper(mainDungeon).nftEquip(msg.sender);
        require(isStaked, "Stake in Main Dungeon First!");
        require(characterId / 10000000000 == 13, "Reserved for Optimistic NFT!");
        require(userTimeStamp[msg.sender] != refuelAt, "Reentrancy is Not Allow!");

        userTimeStamp[msg.sender] = refuelAt;

        uint256 reward = (characterId % 100000) * 1e15;
        stOPT(mainStOPT).mint(1, msg.sender, reward);
    }
}
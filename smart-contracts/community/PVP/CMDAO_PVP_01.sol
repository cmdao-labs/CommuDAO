// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/demontocoshi/CommuDAO/blob/main/smart-contracts/dungeon/ERC20-nft-staking/dungeonJasper.sol";

contract CMDAO_PVP_01 {
    struct UserInfo {
        uint256 bountyAmount;
        uint256 win;
    }
    mapping(address => UserInfo) public userInfo;

    dungeonJasper mainDungeon;
    IERC20 bountyToken;

    event Fight(address indexed challenger1, address indexed challenger2, uint256 cmpow1, uint256 cmpow2, uint256 random1, uint256 random2);

    constructor(address _mainDungeon, address _bountyToken) {
        mainDungeon = dungeonJasper(_mainDungeon);
        bountyToken = IERC20(_bountyToken);
    }

    function challenge(uint256 _bountyAmount) external {
        bountyToken.transferFrom(msg.sender, address(this), 10 * 1e18 * _bountyAmount);

        userInfo[msg.sender].bountyAmount = userInfo[msg.sender].bountyAmount + _bountyAmount;
    }

    function fight(address _challenger) external {
        (,,,,,,, uint256 cmpow1,, bool isStaked1) = mainDungeon.nftEquip(msg.sender);
        require(isStaked1, "Stake in main dungeon first");

        (,,,,,,, uint256 cmpow2,, bool isStaked2) = mainDungeon.nftEquip(_challenger);
        require(isStaked2, "Challenger is not staking in main dungeon");
        require(userInfo[_challenger].bountyAmount > 0, "Challenger's bet was run out");

        bountyToken.transferFrom(msg.sender, address(this), 10 * 1e18);
        
        uint256 random1 = (uint256(blockhash(block.number - 1)) % 10);
        uint256 random2 = (uint256(blockhash(block.number - 2)) % 10);

        if (cmpow1 * random1 < cmpow2 * random2) {
            bountyToken.transfer(_challenger, 10 * 1e18 * 2);

            userInfo[_challenger].bountyAmount -= 1;
            userInfo[_challenger].win = userInfo[_challenger].win + 1;
        } else if (cmpow1 * random1 > cmpow2 * random2) {
            bountyToken.transfer(msg.sender, 10 * 1e18 * 2);

            userInfo[_challenger].bountyAmount -= 1;
            userInfo[msg.sender].win = userInfo[msg.sender].win + 1;
        } else if (cmpow1 * random1 == cmpow2 * random2) {
            bountyToken.transfer(msg.sender, 10 * 1e18);
        }

        emit Fight(msg.sender, _challenger, cmpow1, cmpow2, random1, random2);
    }
}
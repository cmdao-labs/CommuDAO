// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/coshi-labs/CommuDAO/blob/main/smart-contracts/fields/ERC20-resources/fieldWood.sol";

contract Monster_FieldAF01 is Ownable {
    fieldWood mainField;

    struct UserInfo {
        uint256 win;
        uint256 hp;
    }
    mapping(address => UserInfo) public userInfo;

    mapping(uint256 => address) public tokens;
    struct MonData {
        uint256 spawnAmount;
        uint256 hashRate;
        uint256 staminaUsage;
        uint256 rewardIndex;
        uint256 rewardAmount;
        uint256 respawnAmount;
        uint256 respawnFee;
    }
    mapping(uint256 => MonData) public monData;

    event Fight(address indexed challenger, uint256 indexed monIndex, uint256 hrate1, uint256 hrate2, uint256 random1, uint256 random2);

    constructor(address _mainField) {
        mainField = fieldWood(_mainField);
    }

    function setTokens(uint256 _index, address _addr) external onlyOwner {
        tokens[_index] = _addr;
    }

    function setMonData(
        uint256 _index,
        uint256 _hashRate,
        uint256 _staminaUsage,
        uint256 _rewardIndex,
        uint256 _rewardAmount,
        uint256 _respawnAmount,
        uint256 _respawnFee
    ) external onlyOwner {
        monData[_index].hashRate = _hashRate;
        monData[_index].staminaUsage = _staminaUsage;
        monData[_index].rewardIndex = _rewardIndex;
        monData[_index].rewardAmount = _rewardAmount;
        monData[_index].respawnAmount = _respawnAmount;
        monData[_index].respawnFee = _respawnFee;
    }

    function respawn(uint256 _index) external {
        IERC20(tokens[0]).transferFrom(msg.sender, address(this), monData[_index].respawnFee);

        monData[_index].hashRate += monData[_index].respawnFee / 1e18;
        monData[_index].spawnAmount = monData[_index].respawnAmount;
    }

    function healthPotion() external {
        IERC20(tokens[1]).transferFrom(msg.sender, address(this), 1 ether);

        userInfo[msg.sender].hp += 1;
    }

    function fight(uint256 _nftIdStake, uint256 _monIndex) external {
        (address tokenOwnerOf,,,) = mainField.nftStake(_nftIdStake);
        require(tokenOwnerOf == msg.sender, "You are not owner of this servant");
        require(userInfo[msg.sender].hp > 0, "You are dead");
        require(monData[_monIndex].spawnAmount > 0, "All mons are dead");

        IERC20(tokens[2]).transferFrom(msg.sender, address(this), monData[_monIndex].staminaUsage);

        uint256 hrate1 = mainField.hashRate(_nftIdStake / 1e13);
        uint256 hrate2 = monData[_monIndex].hashRate;
        
        uint256 random1 = (uint256(blockhash(block.number - 1)) % 10);
        uint256 random2 = (uint256(blockhash(block.number - 2)) % 10);

        if (hrate1 * random1 < hrate2 * random2) {
            userInfo[msg.sender].hp -= 1;
        } else if (hrate1 * random1 > hrate2 * random2) {
            IERC20(tokens[monData[_monIndex].rewardIndex]).transfer(msg.sender, monData[_monIndex].rewardAmount);

            monData[_monIndex].spawnAmount -= 1;
            userInfo[msg.sender].win += 1;
        }

        emit Fight(msg.sender, _monIndex, hrate1, hrate2, random1, random2);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/commudao-labs/CommuDAO/blob/main/smart-contracts/ERC20-labs/silver.sol";
import "https://github.com/commudao-labs/CommuDAO/blob/main/smart-contracts/community/PVP/CMDAO_PVP_01.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CMDAO_Quest_SIL01_V1 is ReentrancyGuard {
    address public pvp01; 
    address public sil;
    address public jasp;
    mapping(address=>uint256) public questComplete;

    constructor(
        address _sil,
        address _jasp,
        address _pvp01
    ) {
        sil = _sil;
        jasp = _jasp;
        pvp01 = _pvp01;
    }

    function claim() external nonReentrant {
        (, uint256 win) = CMDAO_PVP_01(pvp01).userInfo(msg.sender);
        uint256 claimAmount = win - questComplete[msg.sender];
        require(claimAmount > 0, "You are not eligible to claim");

        IERC20(jasp).transferFrom(msg.sender, address(1), 100000000);
        questComplete[msg.sender] += 1;
        silver(sil).mint(101, msg.sender, 1500 * 1e18);
    }
}
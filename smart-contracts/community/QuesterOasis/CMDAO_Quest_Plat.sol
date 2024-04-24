// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/commudao-labs/CommuDAO/blob/main/smart-contracts/ERC20-labs/plat.sol";
import "https://github.com/commudao-labs/CommuDAO/blob/main/smart-contracts/community/PVP/CMDAO_PVP_01.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CMDAO_Quest_PLAT01_V1 {
    address public pvp01; 
    address public platinum;
    address public jasp;
    mapping(address => uint256) public questComplete;

    constructor(
        address _platinum,
        address _jasp,
        address _pvp01
    ) {
        platinum = _platinum;
        jasp = _jasp;
        pvp01 = _pvp01;
    }

    function claim() external {
        (uint256 bountyAmount,) = CMDAO_PVP_01(pvp01).userInfo(msg.sender);
        require(bountyAmount >= 2, "You are not eligible to claim");

        IERC20(jasp).transferFrom(msg.sender, address(1), 1 gwei);
        questComplete[msg.sender] += 1;
        plat(platinum).mint(101, msg.sender, 1000 * 1e18);
    }
}
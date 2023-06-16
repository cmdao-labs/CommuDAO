// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CommuDAO_NFT.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Oversoul is ERC20, ReentrancyGuard {
    address public cmdaoNft;

    constructor(address _cmdaoNft) ERC20("Oversoul", "OS") {
        cmdaoNft = _cmdaoNft;
    }

    function extract(uint256 _nftId) external nonReentrant {
        IERC721(cmdaoNft).transferFrom(msg.sender, address(1), _nftId);
        _mint(msg.sender, (_nftId % 100000) * 1e18);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/commudao-labs/CommuDAO/blob/main/smart-contracts/dungeon/ERC20-stOPT/stOPT.sol";

contract dumpsterHill1 is Ownable {
    address public stOptRouter;
    mapping(uint256=>address) public programCall;
    mapping(uint256=>address) public tokens;
    mapping(uint256=>uint256) public rewardNumerator;
    mapping(uint256=>uint256) public rewardDenominator;

    constructor(address _stOptRouter) {
        stOptRouter = _stOptRouter;
    }

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function setToken(
        uint256 _index,
        address _addr,
        uint256 _rewardNumerator,
        uint256 _rewardDenominator
    ) external onlyOwner {
        tokens[_index] = _addr;
        rewardNumerator[_index] = _rewardNumerator;
        rewardDenominator[_index] = _rewardDenominator;
    }

    function dump(uint256 _tokenIndex, uint256 _amount) external {
        IERC20(tokens[_tokenIndex]).transferFrom(msg.sender, address(this), _amount);

        uint256 reward = (_amount / rewardDenominator[_tokenIndex]) * rewardNumerator[_tokenIndex];
        stOPT(stOptRouter).mint(3, msg.sender, reward);
    }

    function rescue(
        uint256 _index,
        uint256 _tokenIndex,
        uint256 _amount,
        address _to
    ) external {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");

        IERC20(tokens[_tokenIndex]).transfer(_to, _amount);
    }
}
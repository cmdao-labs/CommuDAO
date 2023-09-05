// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "https://github.com/commudao-labs/CommuDAO/blob/main/smart-contracts/dungeon/ERC20-stOPT/stOPT.sol";

contract dumpsterHill2 is Ownable, ERC721Holder {
    address public stOptRouter;
    mapping(uint256=>address) public programCall;
    struct Tokens {
        address addr;
        uint256 minId;
        uint256 maxId;
        uint256 reward;
    }
    mapping(uint256=>Tokens) public tokens;

    constructor(address _stOptRouter) {
        stOptRouter = _stOptRouter;
    }

    function setProgramCall(uint256 _index, address _addr) external onlyOwner {
        programCall[_index] = _addr;
    }

    function setToken(
        uint256 _index,
        address _addr,
        uint256 _minId,
        uint256 _maxId,
        uint256 _reward
    ) external onlyOwner {
        tokens[_index].addr = _addr;
        tokens[_index].minId = _minId;
        tokens[_index].maxId = _maxId;
        tokens[_index].reward = _reward;
    }

    function dump(uint256 _index, uint256 _tokenId) external {
        require(_tokenId >= tokens[_index].minId && _tokenId <= tokens[_index].maxId, "nftId is not eligible");

        IERC721(tokens[_index].addr).transferFrom(msg.sender, address(this), _tokenId);

        uint256 reward = tokens[_index].reward;
        stOPT(stOptRouter).mint(4, msg.sender, reward);
    }

    function rescue(
        uint256 _index,
        uint256 _tokenIndex,
        uint256 _amount,
        address _to
    ) external {
        require(msg.sender == programCall[_index], "PROGRAM CALL: invalid contract");

        IERC721(tokens[_tokenIndex].addr).transferFrom(address(this), _to, _amount);
    }
}
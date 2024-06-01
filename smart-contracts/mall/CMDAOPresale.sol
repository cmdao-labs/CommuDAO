// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract CMDAOPresale is Ownable {
    mapping(uint256 => address) public tokens;
    struct Sell {
        uint256 tokenAIndex;
        uint256 tokenBIndex;
        uint256 price;
        uint256 tokenBRemain;
    }
    mapping(uint256 => Sell) public sellList;

    function setToken(uint256 _index, address _addr) external onlyOwner {
        tokens[_index] = _addr;
    }

    function withdrawToken(
        uint256 _tokenindex,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(tokens[_tokenindex]).transfer(_to, _amount);
    }

    function setSell(
        uint256 _sellIndex,
        uint256 _tokenAIndex,
        uint256 _tokenBIndex,
        uint256 _price,
        uint256 _tokenBRemain
    ) external onlyOwner {
        sellList[_sellIndex].tokenAIndex = _tokenAIndex;
        sellList[_sellIndex].tokenBIndex = _tokenBIndex;
        sellList[_sellIndex].price = _price;
        sellList[_sellIndex].tokenBRemain = _tokenBRemain;
    }

    function buy(uint256 _sellindex, uint256 _tokenAamount) external {
        uint256 _tokenBamount = (sellList[_sellindex].price / 1e18) * _tokenAamount;
        require(sellList[_sellindex].tokenBRemain >= 0 && sellList[_sellindex].tokenBRemain >= _tokenBamount, "Insufficient Token B"); 

        IERC20(tokens[sellList[_sellindex].tokenAIndex]).transferFrom(msg.sender, address(this), _tokenAamount);
        sellList[_sellindex].tokenBRemain -= _tokenBamount;
        IERC20(tokens[sellList[_sellindex].tokenBIndex]).transfer(msg.sender, _tokenBamount);
    }
}
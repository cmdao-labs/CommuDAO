//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.6.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.6.0/contracts/access/Ownable.sol";

contract TBridge_Token_Uni is Ownable {
    mapping (uint256 => IERC20) public tokens;
    uint256 public fee; 

    event SendTokens(uint256 indexed index, address indexed to, uint256 amount);
    event ReceiveTokens(uint256 indexed index, address indexed from, uint256 indexed amount);

    function setTokens(uint256 _index, address _addr) external onlyOwner {
        tokens[_index] = IERC20(_addr);
    }

    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function sendTokens(
        uint256 _index,
        address _to,
        uint256 _amount
    ) external onlyOwner {
        tokens[_index].transfer(_to, _amount);
        emit SendTokens(_index, _to, _amount);
    }

    function receiveTokens(uint256 _index, uint256 _amount) external payable {
        require(msg.value >= fee, "Please pay bridging fee!");
        payable(owner()).transfer(fee);

        tokens[_index].transferFrom(msg.sender, address(this), _amount);
        emit ReceiveTokens(_index, msg.sender, _amount);
    }
}
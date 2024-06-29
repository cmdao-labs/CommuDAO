// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/access/Ownable.sol";

contract SOURCE_BBQ_THUB01 is Ownable {
    address public bbq;
    uint256 public fee;

    event Send(address indexed from, uint256 indexed to, uint256 value);

    constructor(address _bbq) Ownable(msg.sender) {
        bbq = _bbq;
    }

    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function withdrawFee(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    function sendBBQ(uint256 _to, uint256 _amount) external payable {
        require(fee == msg.value, "Insufficient CMD");
        IERC20(bbq).transferFrom(msg.sender, address(this), _amount);
        emit Send(msg.sender, _to, _amount);
    }

    function revertBBQ(address _to, uint256 _amount) external onlyOwner {
        IERC20(bbq).transfer(_to, _amount);
    }

    function burnBBQ(uint256 _amount) external onlyOwner {
        IERC20(bbq).transfer(address(1), _amount);
    }
}
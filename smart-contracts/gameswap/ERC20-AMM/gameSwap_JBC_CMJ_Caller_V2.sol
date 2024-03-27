// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Exchange.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/access/Ownable.sol";

contract gameswapJbcCMJCallerV2 is Ownable {
    address public mainExchange;
    address public cmjToken;
    uint256 public fee;
    
    event ProjectAdminChange(address indexed oldAdmin, address indexed newAdmin);
    event ChangeFee(uint256 indexed oldRate, uint256 indexed newRate);
    event WithdrawFee(address indexed to, uint256 indexed _amount);
    event CallJbcToCmj(address indexed caller, uint256 jbcAmount, uint256 cmjAmount, uint256 platformfee);
    event CallCmjToJbc(address indexed caller, uint256 cmjAmount, uint256 jbcAmount, uint256 platformfee);

    constructor(address _exchange, address _cmjToken) {
        mainExchange = _exchange;
        cmjToken = _cmjToken;
        fee = 30;
        ERC20(cmjToken).approve(mainExchange, 2**256 - 1);
    }

    function setFee(uint256 _rate) external onlyOwner {
        emit ChangeFee(fee, _rate);
        fee = _rate;
    }

    function withdrawFee(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
        emit WithdrawFee(_to, _amount);
    }

    function callJbcToCmj(uint256 _minTokens) external payable {
        require(msg.value >= 10000, "Not Adequate for pay fee");
        uint256 tokenwithoutFee = msg.value - ((msg.value/10000) * fee);
        Exchange(mainExchange).jbcToCmj{value: tokenwithoutFee}(_minTokens);
        ERC20(cmjToken).transfer(msg.sender, _minTokens);

        emit CallJbcToCmj(msg.sender, msg.value, _minTokens, (msg.value/10000) * fee);
    }

    function callCmjToJbc(uint256 _cmjAmount, uint256 _minJbc) external {
        require(_minJbc >= 10000, "Not Adequate for pay fee");
        ERC20(cmjToken).transferFrom(msg.sender, address(this), _cmjAmount);
        Exchange(mainExchange).cmjToJbc(_cmjAmount, _minJbc);
        payable(msg.sender).transfer(_minJbc - ((_minJbc/10000) * fee));

        emit CallCmjToJbc(msg.sender, _cmjAmount, _minJbc, (_minJbc/10000) * fee);
    }

    fallback() external payable {}
    receive() external payable {}   
}
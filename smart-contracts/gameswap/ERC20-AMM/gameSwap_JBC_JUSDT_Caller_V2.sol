// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ExchangeJbcJUSDT.sol";

contract gameswapJbcJUSDTCallerV2 is Ownable {
    address public mainExchange;
    address public jusdtToken;
    uint256 public fee;
    
    event ProjectAdminChange(address indexed oldAdmin, address indexed newAdmin);
    event ChangeFee(uint256 indexed oldRate, uint256 indexed newRate);
    event WithdrawFee(address indexed to, uint256 indexed _amount);
    event CallJbcToJusdt(address indexed caller, uint256 jbcAmount, uint256 jusdtAmount, uint256 platformfee);
    event CallJusdtToJbc(address indexed caller, uint256 jusdtAmount, uint256 jbcAmount, uint256 platformfee);

    constructor(address _exchange, address _jusdtToken) {
        mainExchange = _exchange;
        jusdtToken = _jusdtToken;
        fee = 30;
        ERC20(jusdtToken).approve(mainExchange, 2**256 - 1);
    }

    function setFee(uint256 _rate) external onlyOwner {
        emit ChangeFee(fee, _rate);
        fee = _rate;
    }

    function withdrawFee(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
        emit WithdrawFee(_to, _amount);
    }

    function callJbcToJusdt(uint256 _minTokens) external payable {
        require(msg.value >= 10000, "Not Adequate for pay fee");
        uint256 tokenwithoutFee = msg.value - ((msg.value/10000) * fee);
        ExchangeJbcJUSDT(mainExchange).jbcToJusdt{value: tokenwithoutFee}(_minTokens);
        ERC20(jusdtToken).transfer(msg.sender, _minTokens);

        emit CallJbcToJusdt(msg.sender, msg.value, _minTokens, (msg.value/10000) * fee);
    }

    function callJusdtToJbc(uint256 _jusdtAmount, uint256 _minJbc) external {
        require(_minJbc >= 10000, "Not Adequate for pay fee");
        ERC20(jusdtToken).transferFrom(msg.sender, address(this), _jusdtAmount);
        ExchangeJbcJUSDT(mainExchange).jusdtToJbc(_jusdtAmount, _minJbc);
        payable(msg.sender).transfer(_minJbc - ((_minJbc/10000) * fee));

        emit CallJusdtToJbc(msg.sender, _jusdtAmount, _minJbc, (_minJbc/10000) * fee);
    }

    fallback() external payable {}
    receive() external payable {}
}
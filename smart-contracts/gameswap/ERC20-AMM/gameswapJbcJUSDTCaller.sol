// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "./ExchangeJbcJUSDT.sol";

contract gameswapJbcJUSDTCaller {

    address public mainExchange;
    address public projectAdmin;
    modifier onlyProjectAdmin() {
        require(msg.sender == projectAdmin, "NP"); // NP : Not Permission to call
        _;
    }

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
        projectAdmin = msg.sender;
        fee = 30;
    }

    function setProjectAdmin(address _addr) external onlyProjectAdmin {
        emit ProjectAdminChange(projectAdmin, _addr);
        projectAdmin = _addr;
    }

    function setFee(uint256 _rate) external onlyProjectAdmin {
        emit ChangeFee(fee, _rate);
        fee = _rate;
    }

    function withdrawFee(uint256 _amount, address _to) external onlyProjectAdmin {
        payable(_to).transfer(_amount);
        emit WithdrawFee(_to, _amount);
    }

    function callJbcToJusdt() external payable {
        require(msg.value >= 10000, "NA"); // NA : Not Adequate for pay fee
        uint256 tokenwithoutFee = msg.value - ((msg.value/10000) * fee);
        uint256 minTokens = ExchangeJbcJUSDT(mainExchange).getAmountOfTokens(
            tokenwithoutFee,
            mainExchange.balance,
            ExchangeJbcJUSDT(mainExchange).getReserve()
        );
        ExchangeJbcJUSDT(mainExchange).jbcToJusdt{value: tokenwithoutFee}(minTokens);
        ERC20(jusdtToken).transfer(msg.sender, minTokens);

        emit CallJbcToJusdt(msg.sender, msg.value, minTokens, (msg.value/10000) * fee);
    }

    function approveMrGame() external onlyProjectAdmin {
        ERC20(jusdtToken).approve(mainExchange, 2**256 - 1);
    }

    function callJusdtToJbc(uint256 _jusdtAmount) external {
        uint256 minJbc = ExchangeJbcJUSDT(mainExchange).getAmountOfTokens(
            _jusdtAmount,
            ExchangeJbcJUSDT(mainExchange).getReserve(),
            mainExchange.balance
        );
        require(minJbc >= 10000, "NA"); // NA : Not Adequate for pay fee
        ERC20(jusdtToken).transferFrom(msg.sender, address(this), _jusdtAmount);
        ExchangeJbcJUSDT(mainExchange).jusdtToJbc(_jusdtAmount, minJbc);
        payable(msg.sender).transfer(minJbc - ((minJbc/10000) * fee));

        emit CallJusdtToJbc(msg.sender, _jusdtAmount, minJbc, (minJbc/10000) * fee);
    }

    fallback() external payable {}
    receive() external payable {}
    
}
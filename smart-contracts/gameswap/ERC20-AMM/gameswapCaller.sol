// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "./Exchange.sol";

contract gameswapCaller {

    address public mainExchange;
    address public projectAdmin;
    modifier onlyProjectAdmin() {
        require(msg.sender == projectAdmin, "NP"); // NP : Not Permission to call
        _;
    }

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

    function callJbcToCmj() external payable {
        require(msg.value >= 10000, "NA"); // NA : Not Adequate for pay fee
        uint256 tokenwithoutFee = msg.value - ((msg.value/10000) * fee);
        uint256 minTokens = Exchange(mainExchange).getAmountOfTokens(
            tokenwithoutFee,
            mainExchange.balance,
            Exchange(mainExchange).getReserve()
        );
        Exchange(mainExchange).jbcToCmj{value: tokenwithoutFee}(minTokens);
        ERC20(cmjToken).transfer(msg.sender, minTokens);

        emit CallJbcToCmj(msg.sender, msg.value, minTokens, (msg.value/10000) * fee);
    }

    function approveMrGame() external onlyProjectAdmin {
        ERC20(cmjToken).approve(mainExchange, 2**256 - 1);
    }

    function callCmjToJbc(uint256 _cmjAmount) external {
        uint256 minJbc = Exchange(mainExchange).getAmountOfTokens(
            _cmjAmount,
            Exchange(mainExchange).getReserve(),
            mainExchange.balance
        );
        require(minJbc >= 10000, "NA"); // NA : Not Adequate for pay fee
        ERC20(cmjToken).transferFrom(msg.sender, address(this), _cmjAmount);
        Exchange(mainExchange).cmjToJbc(_cmjAmount, minJbc);
        payable(msg.sender).transfer(minJbc - ((minJbc/10000) * fee));

        emit CallCmjToJbc(msg.sender, _cmjAmount, minJbc, (minJbc/10000) * fee);
    }

    fallback() external payable {}
    receive() external payable {}
    
}
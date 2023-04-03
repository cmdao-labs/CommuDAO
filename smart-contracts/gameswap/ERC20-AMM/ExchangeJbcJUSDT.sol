// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ExchangeJbcJUSDT is ERC20, Ownable, ReentrancyGuard {

    address public JUSDTAddress;
    bool public jusdtWithdrawLock;

    constructor(address _jusdtToken) ERC20("jbc-jusdt LP Token", "JULP") {
        JUSDTAddress = _jusdtToken;
    }

    function setJusdtWithdrawLock(bool _set) external onlyOwner {
        jusdtWithdrawLock = _set;
    }

    function getReserve() public view returns (uint256) {
        return ERC20(JUSDTAddress).balanceOf(address(this));
    }

    function addLiquidity(uint256 _amount) external payable nonReentrant returns (uint256) {
        uint256 liquidity;
        uint256 jbcBalance = address(this).balance;
        uint256 jusdtReserve = getReserve();
        ERC20 jusdtToken = ERC20(JUSDTAddress);

        if (jusdtReserve == 0) {
            jusdtToken.transferFrom(msg.sender, address(this), _amount);
            
            liquidity = jbcBalance;
            _mint(msg.sender, liquidity);
        } else {
            uint256 jbcReserve =  jbcBalance - msg.value;
            uint256 jusdtAmount = (jusdtReserve * msg.value)/ jbcReserve;
            require(_amount >= jusdtAmount, "Amount of tokens sent is less than the minimum tokens required");
            jusdtToken.transferFrom(msg.sender, address(this), jusdtAmount);
            
            liquidity = (totalSupply() * msg.value)/ jbcReserve;
            _mint(msg.sender, liquidity);
        }
        return liquidity;
    }

    function removeLiquidity(uint256 _amount) external nonReentrant returns (uint256, uint256) {
        require(_amount > 0, "_amount should be greater than zero");
        uint256 jbcReserve = address(this).balance;
        uint256 jbcAmount = (jbcReserve * _amount)/ totalSupply();
        uint256 jusdtAmount = (getReserve() * _amount)/ totalSupply();

        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(jbcAmount);
        ERC20(JUSDTAddress).transfer(msg.sender, jusdtAmount);

        return (jbcAmount, jusdtAmount);
    }

    function getAmountOfTokens(
        uint256 _inputAmount,
        uint256 _inputReserve,
        uint256 _outputReserve
    ) public pure returns (uint256) {
        require(_inputReserve > 0 && _outputReserve > 0, "invalid reserves");
        uint256 inputAmountWithFee = _inputAmount * 99;
        uint256 numerator = _outputReserve * inputAmountWithFee;
        uint256 denominator = (_inputReserve * 100) + inputAmountWithFee;

        return numerator / denominator;
    }

    function jbcToJusdt(uint256 _minTokens) external payable nonReentrant {
        require(jusdtWithdrawLock == false, "Withdraw lock for prevent price dumping");
        uint256 tokensBought = getAmountOfTokens(
            msg.value,
            address(this).balance - msg.value,
            getReserve()
        );

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(JUSDTAddress).transfer(msg.sender, tokensBought);
    }

    function jusdtToJbc(uint256 _tokensSold, uint256 _minJbc) external nonReentrant {
        uint256 jbcBought = getAmountOfTokens(
            _tokensSold,
            getReserve(),
            address(this).balance
        );

        require(jbcBought >= _minJbc, "insufficient output amount");
        ERC20(JUSDTAddress).transferFrom(
            msg.sender,
            address(this),
            _tokensSold
        );
        payable(msg.sender).transfer(jbcBought);
    }
}
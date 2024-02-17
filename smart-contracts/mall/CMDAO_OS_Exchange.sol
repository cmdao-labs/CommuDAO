// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CMDAO_OS_Exchange is ERC20, ReentrancyGuard {
    address public token;
    address public cmj;

    constructor(address _token, address _cmj) ERC20("os-cmj LP Token", "OS-LP") {
        token = _token;
        cmj = _cmj;
    }

    function getReserveToken() public view returns (uint256) {
        return ERC20(token).balanceOf(address(this));
    }

    function getReserveCMJ() public view returns (uint256) {
        return ERC20(cmj).balanceOf(address(this));
    }

    function addLiquidity(uint256 _amountToken, uint256 _amountCMJ) external nonReentrant {
        uint256 liquidity;
        uint256 tokenReserve = getReserveToken();
        uint256 cmjReserve = getReserveCMJ();

        if (tokenReserve == 0) {
            ERC20(cmj).transferFrom(msg.sender, address(this), _amountCMJ);
            ERC20(token).transferFrom(msg.sender, address(this), _amountToken);
            
            liquidity = getReserveCMJ();
            _mint(msg.sender, liquidity);
        } else {
            uint256 tokenAmount = (tokenReserve * _amountCMJ)/ cmjReserve;
            require(_amountToken >= tokenAmount, "Amount of tokens sent is less than the minimum tokens required");
            ERC20(cmj).transferFrom(msg.sender, address(this), _amountCMJ);
            ERC20(token).transferFrom(msg.sender, address(this), tokenAmount);
            
            liquidity = (totalSupply() * _amountCMJ)/ getReserveCMJ();
            _mint(msg.sender, liquidity);
        }
    }

    function removeLiquidity(uint256 _amount) external nonReentrant {
        require(_amount > 0, "_amount should be greater than zero");
        uint256 cmjAmount = (getReserveCMJ() * _amount)/ totalSupply();
        uint256 tokenAmount = (getReserveToken() * _amount)/ totalSupply();

        _burn(msg.sender, _amount);
        ERC20(cmj).transfer(msg.sender, cmjAmount);
        ERC20(token).transfer(msg.sender, tokenAmount);
    }

    function getAmountOfTokens(
        uint256 _inputAmount,
        uint256 _inputReserve,
        uint256 _outputReserve
    ) public pure returns (uint256) {
        require(_inputReserve > 0 && _outputReserve > 0, "invalid reserves");
        uint256 inputAmountWithFee = _inputAmount * 95;
        uint256 numerator = _outputReserve * inputAmountWithFee;
        uint256 denominator = (_inputReserve * 100) + inputAmountWithFee;

        return numerator / denominator;
    }

    function cmjTOtoken(uint256 _tokensSold, uint256 _minTokens) external nonReentrant {
        uint256 tokensBought = getAmountOfTokens(_tokensSold, getReserveCMJ(), getReserveToken());

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(cmj).transferFrom(msg.sender, address(this), _tokensSold);
        ERC20(token).transfer(msg.sender, tokensBought);
    }

    function tokenTOcmj(uint256 _tokensSold, uint256 _minTokens) external nonReentrant {
        uint256 tokensBought = getAmountOfTokens(_tokensSold, getReserveToken(), getReserveCMJ());

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(token).transferFrom(msg.sender, address(this), _tokensSold);
        ERC20(cmj).transfer(msg.sender, tokensBought);
    }
}
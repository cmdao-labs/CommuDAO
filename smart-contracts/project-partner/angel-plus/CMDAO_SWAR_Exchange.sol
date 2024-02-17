// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CMDAO_SWAR_Exchange is ERC20, ReentrancyGuard {
    address public token;
    address public wjbc;
    address public merchant;

    constructor(address _token, address _wjbc, address _merchant) ERC20("swar-wjbc LP Token", "SWAR-LP") {
        token = _token;
        wjbc = _wjbc;
        merchant = _merchant;
    }

    function getReserveToken() public view returns (uint256) {
        return ERC20(token).balanceOf(address(this));
    }

    function getReserveWJBC() public view returns (uint256) {
        return ERC20(wjbc).balanceOf(address(this));
    }

    function addLiquidity(uint256 _amountToken, uint256 _amountWJBC) external nonReentrant {
        uint256 liquidity;
        uint256 tokenReserve = getReserveToken();
        uint256 wjbcReserve = getReserveWJBC();

        if (tokenReserve == 0) {
            ERC20(wjbc).transferFrom(msg.sender, address(this), _amountWJBC);
            ERC20(token).transferFrom(msg.sender, address(this), _amountToken);
            
            liquidity = getReserveWJBC();
            _mint(msg.sender, liquidity);
        } else {
            uint256 tokenAmount = (tokenReserve * _amountWJBC)/ wjbcReserve;
            require(_amountToken >= tokenAmount, "Amount of tokens sent is less than the minimum tokens required");
            ERC20(wjbc).transferFrom(msg.sender, address(this), _amountWJBC);
            ERC20(token).transferFrom(msg.sender, address(this), tokenAmount);
            
            liquidity = (totalSupply() * _amountWJBC)/ getReserveWJBC();
            _mint(msg.sender, liquidity);
        }
    }

    function removeLiquidity(uint256 _amount) external nonReentrant {
        require(_amount > 0, "_amount should be greater than zero");
        uint256 wjbcAmount = (getReserveWJBC() * _amount)/ totalSupply();
        uint256 tokenAmount = (getReserveToken() * _amount)/ totalSupply();

        _burn(msg.sender, _amount);
        ERC20(wjbc).transfer(msg.sender, wjbcAmount);
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

    function wjbcTOtoken(uint256 _tokensSold, uint256 _minTokens) external nonReentrant {
        uint256 tokensBought = getAmountOfTokens(_tokensSold, getReserveWJBC(), getReserveToken());

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(wjbc).transferFrom(msg.sender, address(this), _tokensSold);
        ERC20(wjbc).transfer(merchant, (_tokensSold/100) * 4);
        ERC20(token).transfer(msg.sender, tokensBought);
    }

    function tokenTOwjbc(uint256 _tokensSold, uint256 _minTokens) external nonReentrant {
        uint256 tokensBought = getAmountOfTokens(_tokensSold, getReserveToken(), getReserveWJBC());

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(token).transferFrom(msg.sender, address(this), _tokensSold);
        ERC20(token).transfer(merchant, (_tokensSold/100) * 4);
        ERC20(wjbc).transfer(msg.sender, tokensBought);
    }
}
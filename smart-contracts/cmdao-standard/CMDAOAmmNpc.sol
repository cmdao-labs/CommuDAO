// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol";

contract CMDAOAmmNpc is ERC20 {
    address public token;
    address public currency;
    address public merchant;
    uint256 public merchantFee;
    uint256 public lpFee;

    constructor(
        string memory _lpName,
        string memory _lpSymbol,
        address _token,
        address _currency,
        address _merchant,
        uint256 _merchantFee,
        uint256 _lpFee
    ) ERC20(_lpName, _lpSymbol) {
        token = _token;
        currency = _currency;
        merchant = _merchant;
        merchantFee = _merchantFee;
        lpFee = _lpFee;
    }

    function getReserveToken() public view returns (uint256) {
        return ERC20(token).balanceOf(address(this));
    }

    function getReserveCurrency() public view returns (uint256) {
        return ERC20(currency).balanceOf(address(this));
    }

    function addLiquidity(uint256 _amountToken, uint256 _amountCurrency) external {
        uint256 liquidity;
        uint256 tokenReserve = getReserveToken();
        uint256 currencyReserve = getReserveCurrency();

        if (tokenReserve == 0) {
            ERC20(currency).transferFrom(msg.sender, address(this), _amountCurrency);
            ERC20(token).transferFrom(msg.sender, address(this), _amountToken);
            
            liquidity = getReserveCurrency();
            _mint(msg.sender, liquidity);
        } else {
            uint256 tokenAmount = (tokenReserve * _amountCurrency) / currencyReserve;
            require(_amountToken >= tokenAmount, "Amount of tokens sent is less than the minimum tokens required");
            ERC20(currency).transferFrom(msg.sender, address(this), _amountCurrency);
            ERC20(token).transferFrom(msg.sender, address(this), tokenAmount);
            
            liquidity = (totalSupply() * _amountCurrency) / getReserveCurrency();
            _mint(msg.sender, liquidity);
        }
    }

    function removeLiquidity(uint256 _amount) external {
        require(_amount > 0, "_amount should be greater than zero");
        uint256 currencyAmount = (getReserveCurrency() * _amount) / totalSupply();
        uint256 tokenAmount = (getReserveToken() * _amount) / totalSupply();

        _burn(msg.sender, _amount);
        ERC20(currency).transfer(msg.sender, currencyAmount);
        ERC20(token).transfer(msg.sender, tokenAmount);
    }

    function getAmountOfTokens(
        uint256 _inputAmount,
        uint256 _inputReserve,
        uint256 _outputReserve
    ) public view returns (uint256) {
        require(_inputReserve > 0 && _outputReserve > 0, "invalid reserves");
        uint256 inputAmountWithFee = _inputAmount * lpFee;
        uint256 numerator = _outputReserve * inputAmountWithFee;
        uint256 denominator = (_inputReserve * 100) + inputAmountWithFee;

        return numerator / denominator;
    }

    function currencyTOtoken(uint256 _tokensSold, uint256 _minTokens) external {
        uint256 tokensBought = getAmountOfTokens(_tokensSold, getReserveCurrency(), getReserveToken());

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(currency).transferFrom(msg.sender, address(this), _tokensSold);
        ERC20(currency).transfer(merchant, (_tokensSold / 100) * merchantFee);
        ERC20(token).transfer(msg.sender, tokensBought);
    }

    function tokenTOcurrency(uint256 _tokensSold, uint256 _minTokens) external {
        uint256 tokensBought = getAmountOfTokens(_tokensSold, getReserveToken(), getReserveCurrency());

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(token).transferFrom(msg.sender, address(this), _tokensSold);
        ERC20(token).transfer(merchant, (_tokensSold / 100) * merchantFee);
        ERC20(currency).transfer(msg.sender, tokensBought);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Exchange is ERC20, ReentrancyGuard {

    address public cmjTokenAddress;

    constructor(address _cmjToken) ERC20("jbc-cmj LP Token", "JCLP") {
        cmjTokenAddress = _cmjToken;
    }

    function getReserve() public view returns (uint256) {
        return ERC20(cmjTokenAddress).balanceOf(address(this));
    }

    function addLiquidity(uint256 _amount) external payable nonReentrant returns (uint256) {
        uint256 liquidity;
        uint256 jbcBalance = address(this).balance;
        uint256 cmjTokenReserve = getReserve();
        ERC20 cmjToken = ERC20(cmjTokenAddress);

        if (cmjTokenReserve == 0) {
            cmjToken.transferFrom(msg.sender, address(this), _amount);
            
            liquidity = jbcBalance;
            _mint(msg.sender, liquidity);
        } else {
            uint256 jbcReserve =  jbcBalance - msg.value;
            // Ratio should always be maintained so that there are no major price impacts when adding liquidity
            uint256 cmjTokenAmount = (cmjTokenReserve * msg.value)/ jbcReserve;
            require(_amount >= cmjTokenAmount, "Amount of tokens sent is less than the minimum tokens required");
            cmjToken.transferFrom(msg.sender, address(this), cmjTokenAmount);
            
            liquidity = (totalSupply() * msg.value)/ jbcReserve;
            _mint(msg.sender, liquidity);
        }
        return liquidity;
    }

    function removeLiquidity(uint256 _amount) external nonReentrant returns (uint256, uint256) {
        require(_amount > 0, "_amount should be greater than zero");
        uint256 jbcReserve = address(this).balance;
        uint256 jbcAmount = (jbcReserve * _amount)/ totalSupply();
        uint256 cmjTokenAmount = (getReserve() * _amount)/ totalSupply();

        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(jbcAmount);
        ERC20(cmjTokenAddress).transfer(msg.sender, cmjTokenAmount);

        return (jbcAmount, cmjTokenAmount);
    }

    function getAmountOfTokens(
        uint256 _inputAmount,
        uint256 _inputReserve,
        uint256 _outputReserve
    ) public pure returns (uint256) {
        require(_inputReserve > 0 && _outputReserve > 0, "invalid reserves");
        // We are charging a fee of `1%` Input amount with fee = (input amount - (1*(input amount)/100)) = ((input amount)*99)/100
        uint256 inputAmountWithFee = _inputAmount * 99;
        // Because we need to follow the concept of `XY = K` curve
        // We need to make sure (x + Δx) * (y - Δy) = x * y
        // So the final formula is Δy = (y * Δx) / (x + Δx)
        // Δy in our case is `tokens to be received`
        uint256 numerator = _outputReserve * inputAmountWithFee;
        uint256 denominator = (_inputReserve * 100) + inputAmountWithFee;

        return numerator / denominator;
    }

    function jbcToCmj(uint256 _minTokens) external payable nonReentrant {
        uint256 tokensBought = getAmountOfTokens(
            msg.value,
            address(this).balance - msg.value,
            getReserve()
        );

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(cmjTokenAddress).transfer(msg.sender, tokensBought);
    }

    function cmjToJbc(uint256 _tokensSold, uint256 _minJbc) external nonReentrant {
        uint256 jbcBought = getAmountOfTokens(
            _tokensSold,
            getReserve(),
            address(this).balance
        );

        require(jbcBought >= _minJbc, "insufficient output amount");
        ERC20(cmjTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokensSold
        );
        payable(msg.sender).transfer(jbcBought);
    }
}
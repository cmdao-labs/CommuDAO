// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CMDAO_CTUNA_Exchange is ERC20, Ownable, ReentrancyGuard {

    address public ctuna;
    address public cmj;

    constructor(address _ctuna, address _cmj) ERC20("ctuna-cmj LP Token", "CTUNA-LP") {
        ctuna = _ctuna;
        cmj = _cmj;
    }

    function getReserveCTUNA() public view returns (uint256) {
        return ERC20(ctuna).balanceOf(address(this));
    }

    function getReserveCMJ() public view returns (uint256) {
        return ERC20(cmj).balanceOf(address(this));
    }

    function addLiquidity(uint256 _amountCTUNA, uint256 _amountCMJ) external nonReentrant returns (uint256) {
        uint256 liquidity;
        uint256 ctunaReserve = getReserveCTUNA();
        uint256 cmjReserve = getReserveCMJ();

        if (ctunaReserve == 0) {
            ERC20(cmj).transferFrom(msg.sender, address(this), _amountCMJ);
            ERC20(ctuna).transferFrom(msg.sender, address(this), _amountCTUNA);
            
            liquidity = getReserveCMJ();
            _mint(msg.sender, liquidity);
        } else {
            uint256 ctunaAmount = (ctunaReserve * _amountCMJ)/ cmjReserve;
            require(_amountCTUNA >= ctunaAmount, "Amount of tokens sent is less than the minimum tokens required");
            ERC20(cmj).transferFrom(msg.sender, address(this), _amountCMJ);
            ERC20(ctuna).transferFrom(msg.sender, address(this), ctunaAmount);
            
            liquidity = (totalSupply() * _amountCMJ)/ getReserveCMJ();
            _mint(msg.sender, liquidity);
        }
        return liquidity;
    }

    function removeLiquidity(uint256 _amount) external nonReentrant returns (uint256, uint256) {
        require(_amount > 0, "_amount should be greater than zero");
        uint256 cmjAmount = (getReserveCMJ() * _amount)/ totalSupply();
        uint256 ctunaAmount = (getReserveCTUNA() * _amount)/ totalSupply();

        _burn(msg.sender, _amount);
        ERC20(cmj).transfer(msg.sender, cmjAmount);
        ERC20(ctuna).transfer(msg.sender, ctunaAmount);

        return (cmjAmount, ctunaAmount);
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

    function cmjTOctuna(uint256 _tokensSold, uint256 _minTokens) external nonReentrant {
        uint256 tokensBought = getAmountOfTokens(_tokensSold, getReserveCMJ(), getReserveCTUNA());

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(cmj).transferFrom(msg.sender, address(this), _tokensSold);
        ERC20(ctuna).transfer(msg.sender, tokensBought);
    }

    function ctunaTOcmj(uint256 _tokensSold, uint256 _minTokens) external nonReentrant {
        uint256 tokensBought = getAmountOfTokens(_tokensSold, getReserveCTUNA(), getReserveCMJ());

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(ctuna).transferFrom(msg.sender, address(this), _tokensSold);
        ERC20(cmj).transfer(msg.sender, tokensBought);
    }
}
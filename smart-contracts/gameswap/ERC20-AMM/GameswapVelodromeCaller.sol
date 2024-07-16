// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IRouter.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/access/Ownable.sol";

contract gameswapVelodromeCaller is Ownable {
    address public constant router = 0xa062aE8A9c5e11aaA026fc2670B0D65cCc8B2858;
    address public constant token = 0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142;
    uint256 public fee;
    
    event ChangeFee(uint256 indexed oldRate, uint256 indexed newRate);
    event WithdrawFee(address indexed to, uint256 _amount0, uint256 _amount1);
    event CallForToken(address indexed caller, uint256 tokenAmountOut, uint256 platformFee);
    event CallForETH(address indexed caller, uint256 ethAmountOut, uint256 platformFee);

    constructor() {
        fee = 30;
        IERC20(token).approve(router, 2**256 - 1);
    }

    function setFee(uint256 _rate) external onlyOwner {
        fee = _rate;
        emit ChangeFee(fee, _rate);
    }

    function withdrawFee(
        uint256 _tokenamount,
        uint256 _ethamount,
        address _to
    ) external onlyOwner {
        payable(_to).transfer(_ethamount);
        IERC20(token).transfer(_to, _tokenamount);
        emit WithdrawFee(_to, _tokenamount, _ethamount);
    }

    function callForToken(
        uint256 _amountOutMin,
        IRouter.Route[] memory _route0,
        uint256 _deadline
    ) external payable {
        require(msg.value >= 10000, "Not Adequate for pay fee");
        uint256 amountInWithoutFee = msg.value - ((msg.value/10000) * fee);

        IRouter(router).swapExactETHForTokens{value: amountInWithoutFee}(_amountOutMin, _route0, msg.sender, _deadline);

        emit CallForToken(msg.sender, _amountOutMin, (_amountOutMin/10000) * fee);
    }

    function callForETH(
        uint256 _amountIn,
        uint256 _amountOutMin, 
        IRouter.Route[] memory _route1,
        uint256 _deadline
    ) external {
        require(_amountIn >= 10000, "Not Adequate for pay fee");
        uint256 amountInWithoutFee = _amountIn - ((_amountIn/10000) * fee);
        
        IERC20(token).transferFrom(msg.sender, address(this), _amountIn);
        IRouter(router).swapExactTokensForETH(amountInWithoutFee, _amountOutMin, _route1, msg.sender, _deadline);

        emit CallForETH(msg.sender, _amountOutMin, (_amountOutMin/10000) * fee);
    }
}
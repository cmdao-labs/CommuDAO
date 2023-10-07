// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CommuDAO_Salon_NFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMDAO_Salon is ERC721Holder, Ownable {
    mapping(address => mapping(uint256 => uint256)) public skin;
    address public salon;
    address public cmj;
    address public os;

    constructor(
        address _salon,
        address _cmj,
        address _os
    ) {
        salon = _salon;
        cmj = _cmj;
        os = _os;
    }

    function change(uint256 _salonId) external {
        uint256 salontype = _salonId / 1e11;

        require(skin[msg.sender][salontype] == 0, "Unchange skin first!");

        IERC20(cmj).transferFrom(msg.sender, address(this), 10 * 1e18);
        IERC721(salon).transferFrom(msg.sender, address(this), _salonId);
        skin[msg.sender][salontype] = _salonId;
    }

    function unchange(uint256 _salonType) external {
        require(skin[msg.sender][_salonType] != 0, "Change skin first!");

        IERC20(os).transferFrom(msg.sender, address(1), 10 * 1e18);
        IERC721(salon).transferFrom(address(this), msg.sender, skin[msg.sender][_salonType]);
        delete skin[msg.sender][_salonType];
    }

    function withdrawCMJ(uint256 _amount, address _to) external onlyOwner {
        IERC20(cmj).transfer(_to, _amount);
    }
}
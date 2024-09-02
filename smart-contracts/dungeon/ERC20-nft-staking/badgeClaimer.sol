//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./dungeonMO.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/utils/ERC721Holder.sol";

contract badgeClaimer is ERC721Holder, Ownable {
    address public nft;
    address public dunMO;
    mapping(uint256 => uint256) public badgeReward;
    mapping(address => mapping(uint256 => bool)) public isClaimed;
    
    constructor(address _nft, address _dunMO) {
        nft = _nft;
        dunMO = _dunMO;
    }

    function setBadgeReward(uint256 _epoch, uint256 _badgeStartId) external onlyOwner { 
        badgeReward[_epoch] = _badgeStartId;
    }

    function claimBadge(uint256 _epoch) external {
        (uint256 characterId, uint256 hatId, uint256 clothId, uint256 accId, uint256 backId, uint256 shoesId, uint256 weaponId) = dungeonMO(dunMO).nftEquipMeme(msg.sender, _epoch);
        require(characterId != 0 && hatId != 0 && clothId != 0 && accId != 0 && backId != 0 && shoesId != 0 && weaponId != 0, "you are not eligible"); 
        require(!isClaimed[msg.sender][_epoch], "you are already claimed");
        isClaimed[msg.sender][_epoch] = true;
        IERC721(nft).transferFrom(address(this), msg.sender, badgeReward[_epoch]);
        badgeReward[_epoch] += 100000;
    }

    function migrateNFT(uint256 _tokenId, address _to) external onlyOwner {
        IERC721(nft).transferFrom(address(this), _to, _tokenId);
    }
}
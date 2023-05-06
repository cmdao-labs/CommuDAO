// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract dungeonCopper is ERC20, ERC721Holder, ReentrancyGuard, Ownable {
    mapping(uint256=>address) public gas;
    address public nft;
    struct Equipment {
        uint256 characterId;
        uint256 hatId;
        uint256 clothId;
        uint256 allPow;
        uint256 refuelAt;
        bool isStaked;
    }
    mapping(address => Equipment) public nftEquip;

    event Equiped(uint256 tokenId, address staker, uint256 timestamp);
    event Unequiped(uint256 tokenId, address staker, uint256 timestamp);
    event Refuel(address staker, uint256 timestamp);
    event Claimed(uint256 reward, address staker, uint256 timestamp);

    constructor() ERC20("Copper", "CU") {}

    function setNft(address _nft) external onlyOwner {
        nft = _nft;
    }

    function setGas(uint256 _index, address _addr) external onlyOwner {
        gas[_index] = _addr;
    }

    function withdrawGas(
        uint256 _index,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(gas[_index]).transfer(_to, _amount);
    }

    function migrateNFT(uint256 _tokenId, address _to) external onlyOwner {
        IERC721(nft).transferFrom(address(this), _to, _tokenId);
    }

    function equip(uint256 _tokenId) external nonReentrant {
        IERC721(nft).safeTransferFrom(msg.sender, address(this), _tokenId);

        uint256 slot = _tokenId / 100000000000;
        if (slot == 1) {
            require(nftEquip[msg.sender].characterId == 0, "Slot is not empty");
            nftEquip[msg.sender].characterId = _tokenId;
        } else {
            require(nftEquip[msg.sender].characterId != 0, "No main character");

            if (slot == 2) {
                require(nftEquip[msg.sender].hatId == 0, "Slot is not empty");
                nftEquip[msg.sender].hatId = _tokenId;
            } else if (slot == 3) {
                require(nftEquip[msg.sender].clothId == 0, "Slot is not empty");
                nftEquip[msg.sender].clothId = _tokenId;
            }
        }

        nftEquip[msg.sender].allPow += _tokenId % 100000;
        emit Equiped(_tokenId, msg.sender, block.timestamp);
    }

    function refuel(uint256 _index) external {
        IERC20(gas[_index]).transferFrom(msg.sender, address(this), 500 * 1e18);
        unstake(0);
        nftEquip[msg.sender].refuelAt = block.timestamp;
        nftEquip[msg.sender].isStaked = true;
        emit Refuel(msg.sender, block.timestamp);
    }

    function calculateRewards(address _staker) public view returns (uint256) {
        uint256 timeElapsed = nftEquip[_staker].refuelAt + 1 hours >= block.timestamp ?
            block.timestamp - nftEquip[_staker].refuelAt :
            1 hours;
        return nftEquip[_staker].allPow * timeElapsed * 1e14;
    }

    function unstake(uint256 _slot) public nonReentrant {
        require(_slot >= 0 && _slot <= 3, "Slot is not available");

        if (nftEquip[msg.sender].isStaked) {
            _mint(msg.sender, calculateRewards(msg.sender));
            delete nftEquip[msg.sender].isStaked;
            emit Claimed(calculateRewards(msg.sender), msg.sender, block.timestamp);
        }

        if (_slot != 0) {
            uint256 tokenId;
            if (_slot == 1) {
                require(nftEquip[msg.sender].characterId != 0, "Slot is empty");
                require(nftEquip[msg.sender].hatId == 0 && nftEquip[msg.sender].clothId == 0, "Pls unequip all equipment");
                tokenId = nftEquip[msg.sender].characterId;
                delete nftEquip[msg.sender].characterId;
            } else if (_slot == 2) {
                require(nftEquip[msg.sender].hatId != 0, "Slot is empty");
                tokenId = nftEquip[msg.sender].hatId;
                delete nftEquip[msg.sender].hatId;
            } else if (_slot == 3) {
                require(nftEquip[msg.sender].clothId != 0, "Slot is empty");
                tokenId = nftEquip[msg.sender].clothId;
                delete nftEquip[msg.sender].clothId;
            }

            IERC721(nft).transferFrom(address(this), msg.sender, tokenId);
            nftEquip[msg.sender].allPow -= tokenId % 100000;
            emit Unequiped(tokenId, msg.sender, block.timestamp);
        }
    }
}
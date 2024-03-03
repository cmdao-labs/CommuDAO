// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/utils/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC721/utils/ERC721Holder.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC721/IERC721.sol";

contract dungeonANGB is ERC20, Ownable, ReentrancyGuard, ERC721Holder {
    address public nft;
    uint256 public bonus;

    struct Gas {
        address addr;
        uint256 usage;
    }
    mapping(uint256 => Gas) public gas;

    struct Equipment {
        uint256 characterId;
        uint256 helmetId;
        uint256 armorId;
        uint256 ringId;
        uint256 shieldId;
        uint256 bootsId;
        uint256 swordId;
        uint256 fairyId;
        uint256 allPow;
        uint256 refuelAt;
        bool isStaked;
    }
    mapping(address => Equipment) public nftEquip;

    event Equiped(address indexed staker, uint256 indexed tokenId,  uint256 timestamp);
    event Unequiped(address indexed staker, uint256 indexed tokenId, uint256 timestamp);
    event Refuel(address indexed staker, uint256 gasIndex, uint256 timestamp);
    event Claimed(address indexed staker, uint256 rewardAmount, uint256 timestamp);

    constructor() ERC20("Angel Blessing", "ANGB") Ownable(msg.sender) {
        _mint(msg.sender, 1e6 ether);
    }

    function setGas(
        uint256 _index,
        address _addr,
        uint256 _usage
    ) external onlyOwner {
        gas[_index].addr = _addr;
        gas[_index].usage = _usage;
    }

    function withdrawGas(
        uint256 _index,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(gas[_index].addr).transfer(_to, _amount);
    }

    function setNft(address _nft) external onlyOwner {
        nft = _nft;
    }

    function migrateNFT(uint256 _tokenId, address _to) external onlyOwner {
        IERC721(nft).transferFrom(address(this), _to, _tokenId);
    }

    function setBonus(uint256 _bonus) external onlyOwner {
        require(_bonus <= 10, "Bonus Overflow!");
        bonus = _bonus;
    }

    function equip(uint256 _tokenId) external nonReentrant {
        IERC721(nft).transferFrom(msg.sender, address(this), _tokenId);

        uint256 slot = _tokenId / 100000000000;
        require(slot >= 1 && slot <= 8, "Slot is not available");

        if (slot == 1) {
            require(nftEquip[msg.sender].characterId == 0, "Slot is not empty");
            nftEquip[msg.sender].characterId = _tokenId;
        } else {
            require(nftEquip[msg.sender].characterId != 0, "No main character");

            if (slot == 2) {
                require(nftEquip[msg.sender].helmetId == 0, "Slot is not empty");
                nftEquip[msg.sender].helmetId = _tokenId;
            } else if (slot == 3) {
                require(nftEquip[msg.sender].armorId == 0, "Slot is not empty");
                nftEquip[msg.sender].armorId = _tokenId;
            } else if (slot == 4) {
                require(nftEquip[msg.sender].ringId == 0, "Slot is not empty");
                nftEquip[msg.sender].ringId = _tokenId;
            } else if (slot == 5) {
                require(nftEquip[msg.sender].shieldId == 0, "Slot is not empty");
                nftEquip[msg.sender].shieldId = _tokenId;
            } else if (slot == 6) {
                require(nftEquip[msg.sender].bootsId == 0, "Slot is not empty");
                nftEquip[msg.sender].bootsId = _tokenId;
            } else if (slot == 7) {
                require(nftEquip[msg.sender].swordId == 0, "Slot is not empty");
                nftEquip[msg.sender].swordId = _tokenId;
            } else if (slot == 8) {
                require(nftEquip[msg.sender].fairyId == 0, "Slot is not empty");
                nftEquip[msg.sender].fairyId = _tokenId;
            }
        }

        nftEquip[msg.sender].allPow += _tokenId % 100000;
        emit Equiped(msg.sender, _tokenId, block.timestamp);
    }

    function refuel(uint256 _index) external {
        IERC20(gas[_index].addr).transferFrom(msg.sender, address(this), gas[_index].usage);
        unstake(0);
        nftEquip[msg.sender].refuelAt = block.timestamp;
        nftEquip[msg.sender].isStaked = true;
        emit Refuel(msg.sender, _index, block.timestamp);
    }

    function calculateRewards(address _staker) public view returns (uint256) {
        uint256 timeElapsed = nftEquip[_staker].refuelAt + 1 days >= block.timestamp ?
            block.timestamp - nftEquip[_staker].refuelAt :
            1 days;

        return nftEquip[_staker].allPow * 14000000 * timeElapsed * bonus;
    }

    function unstake(uint256 _slot) public nonReentrant {
        require(_slot <= 8, "Slot is not available");

        if (nftEquip[msg.sender].isStaked) {
            _mint(msg.sender, calculateRewards(msg.sender));
            delete nftEquip[msg.sender].isStaked;
            emit Claimed(msg.sender, calculateRewards(msg.sender), block.timestamp);
        }

        if (_slot != 0) {
            uint256 tokenId;
            if (_slot == 1) {
                require(nftEquip[msg.sender].characterId != 0, "Slot is empty");
                require(nftEquip[msg.sender].helmetId == 0 && nftEquip[msg.sender].armorId == 0 && nftEquip[msg.sender].ringId == 0 && nftEquip[msg.sender].shieldId == 0 && nftEquip[msg.sender].bootsId == 0 && nftEquip[msg.sender].swordId == 0 && nftEquip[msg.sender].fairyId == 0, "Pls unequip all equipment");
                tokenId = nftEquip[msg.sender].characterId;
                delete nftEquip[msg.sender].characterId;
            } else if (_slot == 2) {
                require(nftEquip[msg.sender].helmetId != 0, "Slot is empty");
                tokenId = nftEquip[msg.sender].helmetId;
                delete nftEquip[msg.sender].helmetId;
            } else if (_slot == 3) {
                require(nftEquip[msg.sender].armorId != 0, "Slot is empty");
                tokenId = nftEquip[msg.sender].armorId;
                delete nftEquip[msg.sender].armorId;
            } else if (_slot == 4) {
                require(nftEquip[msg.sender].ringId != 0, "Slot is empty");
                tokenId = nftEquip[msg.sender].ringId;
                delete nftEquip[msg.sender].ringId;
            } else if (_slot == 5) {
                require(nftEquip[msg.sender].shieldId != 0, "Slot is empty");
                tokenId = nftEquip[msg.sender].shieldId;
                delete nftEquip[msg.sender].shieldId;
            } else if (_slot == 6) {
                require(nftEquip[msg.sender].bootsId != 0, "Slot is empty");
                tokenId = nftEquip[msg.sender].bootsId;
                delete nftEquip[msg.sender].bootsId;
            } else if (_slot == 7) {
                require(nftEquip[msg.sender].swordId != 0, "Slot is empty");
                tokenId = nftEquip[msg.sender].swordId;
                delete nftEquip[msg.sender].swordId;
            } else if (_slot == 8) {
                require(nftEquip[msg.sender].fairyId != 0, "Slot is empty");
                tokenId = nftEquip[msg.sender].fairyId;
                delete nftEquip[msg.sender].fairyId;
            }

            IERC721(nft).transferFrom(address(this), msg.sender, tokenId);
            nftEquip[msg.sender].allPow -= tokenId % 100000;
            emit Unequiped(msg.sender, tokenId, block.timestamp);
        }
    }
}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/IERC721.sol";

contract dungeonTET is ERC20, Ownable {
    struct Gas {
        address addr;
        uint256 usage;
    }
    mapping(uint256 => Gas) public gas;
    address public nft;
    struct Equipment {
        uint256 characterId;
        uint256 weapon1Id;
        uint256 shieldId;
        uint256 armorId;
        uint256 upperHeadId;        
        uint256 middleHeadId;
        uint256 lowerHeadId;
    }
    mapping(address => mapping(uint256 => Equipment)) public nftEquip;
    struct Equipment2 {
        uint256 garmentId;
        uint256 footgearId;
        uint256 accessoryId;
        uint256 talisman1Id;
        uint256 talisman2Id;
        uint256 wingId;
        uint256 daemonId;
        uint256 jewelId;
        uint256 weapon2Id;
    }
    mapping(address => mapping(uint256 => Equipment2)) public nftEquip2;
    struct EquipmentCard {
        uint256 cardWeaponId;
        uint256 cardShieldId;
        uint256 cardArmorId;
        uint256 cardUpperHeadId;
        uint256 cardMiddleHeadId;
        uint256 cardLowerHeadId;
        uint256 cardGarmentId;
        uint256 cardFootgearId;
        uint256 cardAccessoryId;
    }
    mapping(address => mapping(uint256 => EquipmentCard)) public nftEquipCard;
    struct Status {
        uint256 allPow;
        uint256 refuelAt;
        bool isStaked;
    }
    mapping(address => mapping(uint256 => Status)) public nftStatus;

    event Equiped(address indexed staker, uint256 indexed slot, uint256 indexed tokenId,  uint256 timestamp);
    event Unequiped(address indexed staker, uint256 indexed slot, uint256 indexed tokenId, uint256 timestamp);
    event Refuel(address indexed staker, uint256 indexed slot, uint256 indexed gasIndex, uint256 timestamp);
    event Claimed(address indexed staker, uint256 indexed slot, uint256 rewardAmount, uint256 timestamp);

    constructor(address _nft) ERC20("HRM - Gemstone", "HRM-GEM") Ownable(msg.sender) {
        nft = _nft;
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

    function equip(uint256 _slot, uint256 _tokenId) external {
        IERC721(nft).transferFrom(msg.sender, address(this), _tokenId);

        uint256 equipSlot = _tokenId / 1e20;
        require(equipSlot >= 11 && equipSlot <= 35 && _slot <= 9);

        if (equipSlot == 11) {
            require(nftEquip[msg.sender][_slot].characterId == 0);
            nftEquip[msg.sender][_slot].characterId = _tokenId;
        } else {
            require(nftEquip[msg.sender][_slot].characterId != 0);
            if (equipSlot == 12) {
                require(nftEquip[msg.sender][_slot].weapon1Id == 0);
                nftEquip[msg.sender][_slot].weapon1Id = _tokenId;
            } else if (equipSlot == 13) {
                require(nftEquip[msg.sender][_slot].shieldId == 0);
                nftEquip[msg.sender][_slot].shieldId = _tokenId;
            } else if (equipSlot == 14) {
                require(nftEquip[msg.sender][_slot].armorId == 0);
                nftEquip[msg.sender][_slot].armorId = _tokenId;
            } else if (equipSlot == 15) {
                require(nftEquip[msg.sender][_slot].upperHeadId == 0);
                nftEquip[msg.sender][_slot].upperHeadId = _tokenId;
            } else if (equipSlot == 16) {
                require(nftEquip[msg.sender][_slot].middleHeadId == 0);
                nftEquip[msg.sender][_slot].middleHeadId = _tokenId;
            } else if (equipSlot == 17) {
                require(nftEquip[msg.sender][_slot].lowerHeadId == 0);
                nftEquip[msg.sender][_slot].lowerHeadId = _tokenId;
            } else if (equipSlot == 18) {
                require(nftEquip2[msg.sender][_slot].garmentId == 0);
                nftEquip2[msg.sender][_slot].garmentId = _tokenId;
            } else if (equipSlot == 19) {
                require(nftEquip2[msg.sender][_slot].footgearId == 0);
                nftEquip2[msg.sender][_slot].footgearId = _tokenId;
            } else if (equipSlot == 20) {
                require(nftEquip2[msg.sender][_slot].accessoryId == 0);
                nftEquip2[msg.sender][_slot].accessoryId = _tokenId;
            } else if (equipSlot == 21) {
                require(nftEquip2[msg.sender][_slot].talisman1Id == 0);
                nftEquip2[msg.sender][_slot].talisman1Id = _tokenId;
            } else if (equipSlot == 22) {
                require(nftEquip2[msg.sender][_slot].talisman2Id == 0);
                nftEquip2[msg.sender][_slot].talisman2Id = _tokenId;
            } else if (equipSlot == 23) {
                require(nftEquip2[msg.sender][_slot].wingId == 0);
                nftEquip2[msg.sender][_slot].wingId = _tokenId;
            } else if (equipSlot == 24) {
                require(nftEquip2[msg.sender][_slot].daemonId == 0);
                nftEquip2[msg.sender][_slot].daemonId = _tokenId;
            } else if (equipSlot == 25) {
                require(nftEquipCard[msg.sender][_slot].cardWeaponId == 0 && nftEquip[msg.sender][_slot].weapon1Id != 0);
                nftEquipCard[msg.sender][_slot].cardWeaponId = _tokenId;
            } else if (equipSlot == 26) {
                require(nftEquipCard[msg.sender][_slot].cardShieldId == 0 && nftEquip[msg.sender][_slot].shieldId != 0);
                nftEquipCard[msg.sender][_slot].cardShieldId = _tokenId;
            } else if (equipSlot == 27) {
                require(nftEquipCard[msg.sender][_slot].cardArmorId == 0 && nftEquip[msg.sender][_slot].armorId != 0);
                nftEquipCard[msg.sender][_slot].cardArmorId = _tokenId;
            } else if (equipSlot == 28) {
                require(nftEquipCard[msg.sender][_slot].cardUpperHeadId == 0 && nftEquip[msg.sender][_slot].upperHeadId != 0);
                nftEquipCard[msg.sender][_slot].cardUpperHeadId = _tokenId;
            } else if (equipSlot == 29) {
                require(nftEquipCard[msg.sender][_slot].cardMiddleHeadId == 0 && nftEquip[msg.sender][_slot].middleHeadId != 0);
                nftEquipCard[msg.sender][_slot].cardMiddleHeadId = _tokenId;
            } else if (equipSlot == 30) {
                require(nftEquipCard[msg.sender][_slot].cardLowerHeadId == 0 && nftEquip[msg.sender][_slot].lowerHeadId != 0);
                nftEquipCard[msg.sender][_slot].cardLowerHeadId = _tokenId;
            } else if (equipSlot == 31) {
                require(nftEquipCard[msg.sender][_slot].cardGarmentId == 0 && nftEquip2[msg.sender][_slot].garmentId != 0);
                nftEquipCard[msg.sender][_slot].cardGarmentId = _tokenId;
            } else if (equipSlot == 32) {
                require(nftEquipCard[msg.sender][_slot].cardFootgearId == 0 && nftEquip2[msg.sender][_slot].footgearId != 0);
                nftEquipCard[msg.sender][_slot].cardFootgearId = _tokenId;
            } else if (equipSlot == 33) {
                require(nftEquipCard[msg.sender][_slot].cardAccessoryId == 0 && nftEquip2[msg.sender][_slot].accessoryId != 0);
                nftEquipCard[msg.sender][_slot].cardAccessoryId = _tokenId;
            } else if (equipSlot == 34) {
                require(nftEquip2[msg.sender][_slot].jewelId == 0);
                nftEquip2[msg.sender][_slot].jewelId = _tokenId;
            } else if (equipSlot == 35) {
                require(nftEquip2[msg.sender][_slot].weapon2Id == 0);
                nftEquip2[msg.sender][_slot].weapon2Id = _tokenId;
            }
        }

        nftStatus[msg.sender][_slot].allPow += _tokenId % 10000000;
        emit Equiped(msg.sender, _slot, _tokenId, block.timestamp);
    }

    function refuel(uint256 _slot, uint256 _index) external {
        IERC20(gas[_index].addr).transferFrom(msg.sender, address(this), gas[_index].usage);
        unstake(_slot, 10);
        nftStatus[msg.sender][_slot].refuelAt = block.timestamp;
        nftStatus[msg.sender][_slot].isStaked = true;
        emit Refuel(msg.sender, _slot, _index, block.timestamp);
    }

    function calculateRewards(address _staker, uint256 _slot) public view returns (uint256) {
        uint256 timeElapsed = nftStatus[_staker][_slot].refuelAt + 1 days >= block.timestamp ?
            block.timestamp - nftStatus[_staker][_slot].refuelAt :
            1 days;

        return nftStatus[_staker][_slot].allPow * 100 gwei * timeElapsed;
    }

    function unstake(uint256 _slot, uint256 _equipSlot) public {
        require(_equipSlot >= 10 && _equipSlot <= 35 && _slot <= 9);

        if (nftStatus[msg.sender][_slot].isStaked) {
            _mint(msg.sender, calculateRewards(msg.sender, _slot));
            delete nftStatus[msg.sender][_slot].isStaked;
            emit Claimed(msg.sender, _slot, calculateRewards(msg.sender, _slot), block.timestamp);
        }
        if (_equipSlot != 10) {
            uint256 tokenId;
            if (_equipSlot == 11) {
                require(nftEquip[msg.sender][_slot].characterId != 0);
                tokenId = nftEquip[msg.sender][_slot].characterId;
                delete nftEquip[msg.sender][_slot].characterId;
            } else if (_equipSlot == 12) {
                require(nftEquip[msg.sender][_slot].weapon1Id != 0);
                tokenId = nftEquip[msg.sender][_slot].weapon1Id;
                delete nftEquip[msg.sender][_slot].weapon1Id;
            } else if (_equipSlot == 13) {
                require(nftEquip[msg.sender][_slot].shieldId != 0);
                tokenId = nftEquip[msg.sender][_slot].shieldId;
                delete nftEquip[msg.sender][_slot].shieldId;
            } else if (_equipSlot == 14) {
                require(nftEquip[msg.sender][_slot].armorId != 0);
                tokenId = nftEquip[msg.sender][_slot].armorId;
                delete nftEquip[msg.sender][_slot].armorId;
            } else if (_equipSlot == 15) {
                require(nftEquip[msg.sender][_slot].upperHeadId != 0);
                tokenId = nftEquip[msg.sender][_slot].upperHeadId;
                delete nftEquip[msg.sender][_slot].upperHeadId;
            } else if (_equipSlot == 16) {
                require(nftEquip[msg.sender][_slot].middleHeadId != 0);
                tokenId = nftEquip[msg.sender][_slot].middleHeadId;
                delete nftEquip[msg.sender][_slot].middleHeadId;
            } else if (_equipSlot == 17) {
                require(nftEquip[msg.sender][_slot].lowerHeadId != 0);
                tokenId = nftEquip[msg.sender][_slot].lowerHeadId;
                delete nftEquip[msg.sender][_slot].lowerHeadId;
            } else if (_equipSlot == 18) {
                require(nftEquip2[msg.sender][_slot].garmentId != 0);
                tokenId = nftEquip2[msg.sender][_slot].garmentId;
                delete nftEquip2[msg.sender][_slot].garmentId;
            } else if (_equipSlot == 19) {
                require(nftEquip2[msg.sender][_slot].footgearId != 0);
                tokenId = nftEquip2[msg.sender][_slot].footgearId;
                delete nftEquip2[msg.sender][_slot].footgearId;
            } else if (_equipSlot == 20) {
                require(nftEquip2[msg.sender][_slot].accessoryId != 0);
                tokenId = nftEquip2[msg.sender][_slot].accessoryId;
                delete nftEquip2[msg.sender][_slot].accessoryId;
            } else if (_equipSlot == 21) {
                require(nftEquip2[msg.sender][_slot].talisman1Id != 0);
                tokenId = nftEquip2[msg.sender][_slot].talisman1Id;
                delete nftEquip2[msg.sender][_slot].talisman1Id;
            } else if (_equipSlot == 22) {
                require(nftEquip2[msg.sender][_slot].talisman2Id != 0);
                tokenId = nftEquip2[msg.sender][_slot].talisman2Id;
                delete nftEquip2[msg.sender][_slot].talisman2Id;
            } else if (_equipSlot == 23) {
                require(nftEquip2[msg.sender][_slot].wingId != 0);
                tokenId = nftEquip2[msg.sender][_slot].wingId;
                delete nftEquip2[msg.sender][_slot].wingId;
            } else if (_equipSlot == 24) {
                require(nftEquip2[msg.sender][_slot].daemonId != 0);
                tokenId = nftEquip2[msg.sender][_slot].daemonId;
                delete nftEquip2[msg.sender][_slot].daemonId;
            } else if (_equipSlot == 25) {
                require(nftEquipCard[msg.sender][_slot].cardWeaponId != 0);
                tokenId = nftEquipCard[msg.sender][_slot].cardWeaponId;
                delete nftEquipCard[msg.sender][_slot].cardWeaponId;
            } else if (_equipSlot == 26) {
                require(nftEquipCard[msg.sender][_slot].cardShieldId != 0);
                tokenId = nftEquipCard[msg.sender][_slot].cardShieldId;
                delete nftEquipCard[msg.sender][_slot].cardShieldId;
            } else if (_equipSlot == 27) {
                require(nftEquipCard[msg.sender][_slot].cardArmorId != 0);
                tokenId = nftEquipCard[msg.sender][_slot].cardArmorId;
                delete nftEquipCard[msg.sender][_slot].cardArmorId;
            } else if (_equipSlot == 28) {
                require(nftEquipCard[msg.sender][_slot].cardUpperHeadId != 0);
                tokenId = nftEquipCard[msg.sender][_slot].cardUpperHeadId;
                delete nftEquipCard[msg.sender][_slot].cardUpperHeadId;
            } else if (_equipSlot == 29) {
                require(nftEquipCard[msg.sender][_slot].cardMiddleHeadId != 0);
                tokenId = nftEquipCard[msg.sender][_slot].cardMiddleHeadId;
                delete nftEquipCard[msg.sender][_slot].cardMiddleHeadId;
            } else if (_equipSlot == 30) {
                require(nftEquipCard[msg.sender][_slot].cardLowerHeadId != 0);
                tokenId = nftEquipCard[msg.sender][_slot].cardLowerHeadId;
                delete nftEquipCard[msg.sender][_slot].cardLowerHeadId;
            } else if (_equipSlot == 31) {
                require(nftEquipCard[msg.sender][_slot].cardGarmentId != 0);
                tokenId = nftEquipCard[msg.sender][_slot].cardGarmentId;
                delete nftEquipCard[msg.sender][_slot].cardGarmentId;
            } else if (_equipSlot == 32) {
                require(nftEquipCard[msg.sender][_slot].cardFootgearId != 0);
                tokenId = nftEquipCard[msg.sender][_slot].cardFootgearId;
                delete nftEquipCard[msg.sender][_slot].cardFootgearId;
            } else if (_equipSlot == 33) {
                require(nftEquipCard[msg.sender][_slot].cardAccessoryId != 0);
                tokenId = nftEquipCard[msg.sender][_slot].cardAccessoryId;
                delete nftEquipCard[msg.sender][_slot].cardAccessoryId;
            } else if (_equipSlot == 34) {
                require(nftEquip2[msg.sender][_slot].jewelId != 0);
                tokenId = nftEquip2[msg.sender][_slot].jewelId;
                delete nftEquip2[msg.sender][_slot].jewelId;
            } else if (_equipSlot == 35) {
                require(nftEquip2[msg.sender][_slot].weapon2Id != 0);
                tokenId = nftEquip2[msg.sender][_slot].weapon2Id;
                delete nftEquip2[msg.sender][_slot].weapon2Id;
            }

            IERC721(nft).transferFrom(address(this), msg.sender, tokenId);
            nftStatus[msg.sender][_slot].allPow -= tokenId % 10000000;
            emit Unequiped(msg.sender, _slot, tokenId, block.timestamp);
        }
    }

    function migrateNFT(uint256 _tokenId, address _to) external onlyOwner {
        IERC721(nft).transferFrom(address(this), _to, _tokenId);
    }
}
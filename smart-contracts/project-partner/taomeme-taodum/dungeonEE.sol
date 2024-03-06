// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/utils/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/utils/ERC721Holder.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/IERC721.sol";

contract dungeonEE is ERC20, Ownable, ReentrancyGuard, ERC721Holder {
    struct Gas {
        address addr;
        uint256 usage;
    }
    mapping(uint256 => Gas) public gas;

    mapping(uint256=>address) public nft;
    struct Equipment {
        uint256 characterId;
        uint256 hatId;
        uint256 clothId;
        uint256 accessoriesId;
        uint256 backId;        
        uint256 shoesId;
        uint256 weaponId;
    }
    mapping(address => Equipment) public nftEquip;
    struct Status {
        uint256 characterIndex;
        uint256 hatIndex;
        uint256 clothIndex;
        uint256 accessoriesIndex;
        uint256 backIndex;
        uint256 shoesIndex;
        uint256 weaponIndex;
        uint256 allPow;
        uint256 refuelAt;
        bool isStaked;
    }
    mapping(address => Status) public nftStatus;

    event Equiped(address indexed staker, uint256 indexed tokenIndex, uint256 indexed tokenId,  uint256 timestamp);
    event Unequiped(address indexed staker, uint256 indexed tokenIndex, uint256 indexed tokenId, uint256 timestamp);
    event Refuel(address indexed staker, uint256 gasIndex, uint256 timestamp);
    event Claimed(address indexed staker, uint256 rewardAmount, uint256 timestamp);

    constructor() ERC20("TDM - Enchant Engine", "TDM-EE") Ownable(msg.sender) {
        _mint(msg.sender, 15000000 ether);
    }

    function setNft(uint256 _index, address _nft) external onlyOwner {
        nft[_index] = _nft;
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

    function equip(uint256 _index, uint256 _tokenId) external nonReentrant {
        IERC721(nft[_index]).safeTransferFrom(msg.sender, address(this), _tokenId);

        uint256 slot = _tokenId / 100000000000;
        require(slot >= 1 && slot <= 7, "Slot is not available");

        if (slot == 1) {
            require(nftEquip[msg.sender].characterId == 0, "Slot is not empty");
            nftStatus[msg.sender].characterIndex = _index;
            nftEquip[msg.sender].characterId = _tokenId;
        } else {
            require(nftEquip[msg.sender].characterId != 0, "No main character");

            if (slot == 2) {
                require(nftEquip[msg.sender].hatId == 0, "Slot is not empty");
                nftStatus[msg.sender].hatIndex = _index;
                nftEquip[msg.sender].hatId = _tokenId;
            } else if (slot == 3) {
                require(nftEquip[msg.sender].clothId == 0, "Slot is not empty");
                nftStatus[msg.sender].clothIndex = _index;
                nftEquip[msg.sender].clothId = _tokenId;
            } else if (slot == 4) {
                require(nftEquip[msg.sender].accessoriesId == 0, "Slot is not empty");
                nftStatus[msg.sender].accessoriesIndex = _index;
                nftEquip[msg.sender].accessoriesId = _tokenId;
            } else if (slot == 5) {
                require(nftEquip[msg.sender].backId == 0, "Slot is not empty");
                nftStatus[msg.sender].backIndex = _index;
                nftEquip[msg.sender].backId = _tokenId;
            } else if (slot == 6) {
                require(nftEquip[msg.sender].shoesId == 0, "Slot is not empty");
                nftStatus[msg.sender].shoesIndex = _index;
                nftEquip[msg.sender].shoesId = _tokenId;
            } else if (slot == 7) {
                require(nftEquip[msg.sender].weaponId == 0, "Slot is not empty");
                nftStatus[msg.sender].weaponIndex = _index;
                nftEquip[msg.sender].weaponId = _tokenId;
            }
        }

        nftStatus[msg.sender].allPow += _tokenId % 100000;
        emit Equiped(msg.sender, _index, _tokenId, block.timestamp);
    }

    function refuel(uint256 _index) external {
        IERC20(gas[_index].addr).transferFrom(msg.sender, address(this), gas[_index].usage);
        unstake(0);
        nftStatus[msg.sender].refuelAt = block.timestamp;
        nftStatus[msg.sender].isStaked = true;
        emit Refuel(msg.sender, _index, block.timestamp);
    }

    function calculateRewards(address _staker) public view returns (uint256) {
        uint256 timeElapsed = nftStatus[_staker].refuelAt + 1 days >= block.timestamp ?
            block.timestamp - nftStatus[_staker].refuelAt :
            1 days;

        return nftStatus[_staker].allPow * 888 gwei * timeElapsed;
    }

    function unstake(uint256 _slot) public nonReentrant {
        require(_slot >= 0 && _slot <= 7, "Slot is not available");

        if (nftStatus[msg.sender].isStaked) {
            _mint(msg.sender, calculateRewards(msg.sender));
            delete nftStatus[msg.sender].isStaked;
            emit Claimed(msg.sender, calculateRewards(msg.sender), block.timestamp);
        }

        if (_slot != 0) {
            uint256 tokenIndex;
            uint256 tokenId;
            if (_slot == 1) {
                require(nftEquip[msg.sender].characterId != 0, "Slot is empty");
                require(nftEquip[msg.sender].hatId == 0 && nftEquip[msg.sender].clothId == 0 && nftEquip[msg.sender].accessoriesId == 0 && nftEquip[msg.sender].backId == 0 && nftEquip[msg.sender].shoesId == 0 && nftEquip[msg.sender].weaponId == 0, "Pls unequip all equipment");
                tokenIndex = nftStatus[msg.sender].characterIndex;
                tokenId = nftEquip[msg.sender].characterId;
                delete nftStatus[msg.sender].characterIndex;
                delete nftEquip[msg.sender].characterId;
            } else if (_slot == 2) {
                require(nftEquip[msg.sender].hatId != 0, "Slot is empty");
                tokenIndex = nftStatus[msg.sender].hatIndex;
                tokenId = nftEquip[msg.sender].hatId;
                delete nftStatus[msg.sender].hatIndex;
                delete nftEquip[msg.sender].hatId;
            } else if (_slot == 3) {
                require(nftEquip[msg.sender].clothId != 0, "Slot is empty");
                tokenIndex = nftStatus[msg.sender].clothIndex;
                tokenId = nftEquip[msg.sender].clothId;
                delete nftStatus[msg.sender].clothIndex;
                delete nftEquip[msg.sender].clothId;
            } else if (_slot == 4) {
                require(nftEquip[msg.sender].accessoriesId != 0, "Slot is empty");
                tokenIndex = nftStatus[msg.sender].accessoriesIndex;
                tokenId = nftEquip[msg.sender].accessoriesId;
                delete nftStatus[msg.sender].accessoriesIndex;
                delete nftEquip[msg.sender].accessoriesId;
            } else if (_slot == 5) {
                require(nftEquip[msg.sender].backId != 0, "Slot is empty");
                tokenIndex = nftStatus[msg.sender].backIndex;
                tokenId = nftEquip[msg.sender].backId;
                delete nftStatus[msg.sender].backIndex;
                delete nftEquip[msg.sender].backId;
            } else if (_slot == 6) {
                require(nftEquip[msg.sender].shoesId != 0, "Slot is empty");
                tokenIndex = nftStatus[msg.sender].shoesIndex;
                tokenId = nftEquip[msg.sender].shoesId;
                delete nftStatus[msg.sender].shoesIndex;
                delete nftEquip[msg.sender].shoesId;
            } else if (_slot == 7) {
                require(nftEquip[msg.sender].weaponId != 0, "Slot is empty");
                tokenIndex = nftStatus[msg.sender].weaponIndex;
                tokenId = nftEquip[msg.sender].weaponId;
                delete nftStatus[msg.sender].weaponIndex;
                delete nftEquip[msg.sender].weaponId;
            }

            IERC721(nft[tokenIndex]).transferFrom(address(this), msg.sender, tokenId);
            nftStatus[msg.sender].allPow -= tokenId % 100000;
            emit Unequiped(msg.sender, tokenId, tokenIndex, block.timestamp);
        }
    }
}
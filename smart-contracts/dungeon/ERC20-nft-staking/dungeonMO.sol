// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

interface ILANDBONUS {
    function landBonus(uint256 landId) external view returns (uint256);
}
interface ILANDOWNER {
    function slotOwner(uint256 landId) external view returns (address);
    function slotLevel(uint256 landId) external view returns (uint256);
}

contract dungeonMO is Ownable {
    address public cmcitySlot1;
    address public cmcityConstruction; 
    struct Gas {
        address addr;
        uint256 usage;
        uint256 multiplier;
        uint256 ssEnd;
    }
    mapping(uint256 => Gas) public gas;
    mapping(uint256 => address) public reward;
    mapping(uint256 => address) public nft;
    struct ColBonus {
        uint256 startId;
        uint256 endId;
        uint256 multiplier;
    }
    mapping(uint256 => ColBonus) public colBonus;
    struct MemeEligible {
        uint256 nftIndex;
        uint256 startId;
        uint256 endId;
    }
    mapping(uint256 => mapping(uint256 => MemeEligible)) public memeEligible; 
    struct Equipment {
        uint256 characterId;
        uint256 hatId;
        uint256 clothId;
        uint256 accId;
        uint256 backId;
        uint256 shoesId;
        uint256 weaponId;
    }
    mapping(address => Equipment) public nftEquip;
    mapping(address => Equipment) public nftEquipColMul;
    struct Equipment2 {
        uint256 weapon2Id;
        uint256 acc2Id;
        uint256 acc3Id;
        uint256 acc4Id;
        uint256 acc5Id;
        uint256 acc6Id;
        uint256 soulId;
        uint256 badgeId;
    }
    mapping(address => Equipment2) public nftEquip2;
    mapping(address => Equipment2) public nftEquip2ColMul;
    mapping(address => mapping(uint256 => Equipment)) public nftEquipMeme;
    mapping(uint256 => Equipment) public nftMeme;
    struct Status {
        uint256 allPow;
        uint256 refuelAt;
        bool isStaked;
    }
    mapping(address => Status) public nftStatus;

    constructor(address _cmcitySlot1, address _cmcityConstruction) {
        cmcitySlot1 = _cmcitySlot1;
        cmcityConstruction = _cmcityConstruction;
    }

    function setNft(uint256 _index, address _nft) external onlyOwner {
        nft[_index] = _nft;
    }

    function migrateNFT(
        uint256 _index,
        uint256 _tokenId, 
        address _to
    ) external onlyOwner {
        IERC721(nft[_index]).transferFrom(address(this), _to, _tokenId);
    }

    function setNftMeme(
        uint256 _index,
        uint256 _eli1,
        uint256 _eli2,
        uint256 _eli3,
        uint256 _eli4,
        uint256 _eli5,
        uint256 _eli6,
        uint256 _eli7
    ) external onlyOwner {
        nftMeme[_index].characterId = _eli1;
        nftMeme[_index].hatId = _eli2;
        nftMeme[_index].clothId = _eli3;
        nftMeme[_index].accId = _eli4;
        nftMeme[_index].backId = _eli5;
        nftMeme[_index].shoesId = _eli6;
        nftMeme[_index].weaponId = _eli7;
    }

    function setGas(
        uint256 _index,
        address _addr,
        uint256 _usage,
        uint256 _multiplier,
        uint256 _ssEnd
    ) external onlyOwner {
        gas[_index].addr = _addr;
        gas[_index].usage = _usage;
        gas[_index].multiplier = _multiplier;
        gas[_index].ssEnd = _ssEnd;
    }

    function withdrawGas(
        uint256 _index,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(gas[_index].addr).transfer(_to, _amount);
    }

    function setReward(
        uint256 _index,
        address _addr
    ) external onlyOwner {
        reward[_index] = _addr;
    }

    function withdrawReward(
        uint256 _index,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(reward[_index]).transfer(_to, _amount);
    }

    function setColBonus(
        uint256 _index,
        uint256 _startId,
        uint256 _endId,
        uint256 _multiplier
    ) external onlyOwner {
        colBonus[_index].startId = _startId;
        colBonus[_index].endId = _endId;
        colBonus[_index].multiplier = _multiplier;
    }

    function getColBonus (uint256 _index, uint256 _tokenId) public view returns (uint256) {
        uint256 bonus = _tokenId >= colBonus[_index].startId && _tokenId <= colBonus[_index].endId ?
            colBonus[_index].multiplier :
            1;
        return bonus;
    }

    function setMemeEligible(
        uint256 _index,
        uint256 _ss,
        uint256 _startId,
        uint256 _endId,
        uint256 _memeIndex
    ) external onlyOwner {
        memeEligible[_ss][_index].startId = _startId;
        memeEligible[_ss][_index].endId = _endId;
        memeEligible[_ss][_index].nftIndex = _memeIndex;
    }

    function getMemeEligible (
        uint256 _ss, 
        uint256 _slotIndex, 
        uint256 _tokenId
    ) public view returns (uint256) {
        uint256 eliNftIndex = _tokenId >= memeEligible[_ss][_slotIndex].startId && _tokenId <= memeEligible[_ss][_slotIndex].endId  ?
            memeEligible[_ss][_slotIndex].nftIndex :
            0;
        return eliNftIndex;
    }

    function equip(
        uint256 _tokenId,
        uint256 _colId,
        uint256 _slot,
        bool _isMeme,
        uint256 _ss
    ) external {
        require(_slot >= 1 && _slot <= 15);
        uint256 colMul = 1;

        if (_isMeme) {
            uint256 memeIndex = getMemeEligible(_ss, _slot, _tokenId);
            require(gas[_ss].ssEnd >= block.timestamp && memeIndex != 0);
            IERC721(nft[memeIndex]).transferFrom(msg.sender, address(this), _tokenId);

            if (_slot == 1) {
                require(nftEquipMeme[msg.sender][_ss].characterId == 0);
                nftEquipMeme[msg.sender][_ss].characterId = _tokenId;
            } else if (_slot == 2) {
                require(nftEquipMeme[msg.sender][_ss].hatId == 0);
                nftEquipMeme[msg.sender][_ss].hatId = _tokenId;
            } else if (_slot == 3) {
                require(nftEquipMeme[msg.sender][_ss].clothId == 0);
                nftEquipMeme[msg.sender][_ss].clothId = _tokenId;
            } else if (_slot == 4) {
                require(nftEquipMeme[msg.sender][_ss].accId == 0);
                nftEquipMeme[msg.sender][_ss].accId = _tokenId;
            } else if (_slot == 5) {
                require(nftEquipMeme[msg.sender][_ss].backId == 0);
                nftEquipMeme[msg.sender][_ss].backId = _tokenId;
            } else if (_slot == 6) {
                require(nftEquipMeme[msg.sender][_ss].shoesId == 0);
                nftEquipMeme[msg.sender][_ss].shoesId = _tokenId;
            } else if (_slot == 7) {
                require(nftEquipMeme[msg.sender][_ss].weaponId == 0);
                nftEquipMeme[msg.sender][_ss].weaponId = _tokenId;
            }
        } else {
            uint256 eliSlot = _tokenId / 100000000000;
            require(eliSlot >= 1 && eliSlot <= 8);

            IERC721(nft[1]).transferFrom(msg.sender, address(this), _tokenId);
            colMul = getColBonus(_colId, _tokenId);

            if (eliSlot == 1) {
                if (_slot == 1) {
                    require(nftEquip[msg.sender].characterId == 0);
                    nftEquip[msg.sender].characterId = _tokenId;
                    nftEquipColMul[msg.sender].characterId = colMul;
                } else if (_slot == 15) {
                    require(nftEquip[msg.sender].characterId != 0 && nftEquip2[msg.sender].soulId == 0);
                    nftEquip2[msg.sender].soulId = _tokenId;
                    nftEquip2ColMul[msg.sender].soulId = colMul;
                }
            } else {
                require(nftEquip[msg.sender].characterId != 0);
                
                if (eliSlot == 2 && _slot == 2) {
                    require(nftEquip[msg.sender].hatId == 0);
                    nftEquip[msg.sender].hatId = _tokenId;
                    nftEquipColMul[msg.sender].hatId = colMul;
                } else if (eliSlot == 3 && _slot == 3) {
                    require(nftEquip[msg.sender].clothId == 0);
                    nftEquip[msg.sender].clothId = _tokenId;
                    nftEquipColMul[msg.sender].clothId = colMul;
                } else if (eliSlot == 4) {
                    if (_slot == 4) {
                        require(nftEquip[msg.sender].accId == 0);
                        nftEquip[msg.sender].accId = _tokenId;
                        nftEquipColMul[msg.sender].accId = colMul;
                    } else if (_slot == 9) {
                        require(nftEquip2[msg.sender].acc2Id == 0);
                        nftEquip2[msg.sender].acc2Id = _tokenId;
                        nftEquip2ColMul[msg.sender].acc2Id = colMul;
                    } else if (_slot == 10) {
                        require(nftEquip2[msg.sender].acc3Id == 0);
                        nftEquip2[msg.sender].acc3Id = _tokenId;
                        nftEquip2ColMul[msg.sender].acc3Id = colMul;
                    } else if (_slot == 11) {
                        require(nftEquip2[msg.sender].acc4Id == 0);
                        nftEquip2[msg.sender].acc4Id = _tokenId;
                        nftEquip2ColMul[msg.sender].acc4Id = colMul;
                    } else if (_slot == 12) {
                        require(nftEquip2[msg.sender].acc5Id == 0);
                        nftEquip2[msg.sender].acc5Id = _tokenId;
                        nftEquip2ColMul[msg.sender].acc5Id = colMul;
                    } else if (_slot == 13) {
                        require(nftEquip2[msg.sender].acc6Id == 0);
                        nftEquip2[msg.sender].acc6Id = _tokenId;
                        nftEquip2ColMul[msg.sender].acc6Id = colMul;
                    }
                } else if (eliSlot == 5 && _slot == 5) {
                    require(nftEquip[msg.sender].backId == 0);
                    nftEquip[msg.sender].backId = _tokenId;
                    nftEquipColMul[msg.sender].backId = colMul;
                } else if (eliSlot == 6 && _slot == 6) {
                    require(nftEquip[msg.sender].shoesId == 0);
                    nftEquip[msg.sender].shoesId = _tokenId;
                    nftEquipColMul[msg.sender].shoesId = colMul;
                } else if (eliSlot == 7) {
                    if (_slot == 7) {
                        require(nftEquip[msg.sender].weaponId == 0);
                        nftEquip[msg.sender].weaponId = _tokenId;
                        nftEquipColMul[msg.sender].weaponId = colMul;
                    } else if (_slot == 14) {
                        require(nftEquip2[msg.sender].weapon2Id == 0);
                        nftEquip2[msg.sender].weapon2Id = _tokenId;
                        nftEquip2ColMul[msg.sender].weapon2Id = colMul;
                    }
                } else if (eliSlot == 8 && _slot == 8) {
                    require(nftEquip2[msg.sender].badgeId == 0);
                    nftEquip2[msg.sender].badgeId = _tokenId;
                    nftEquip2ColMul[msg.sender].badgeId = colMul;
                } else {
                    revert();
                }
            }
        }

        nftStatus[msg.sender].allPow += (_tokenId % 100000) * colMul;
    }

    function refuel(
        uint256 _ss, 
        bool _isMeme, 
        uint256 _landId
    ) external {
        require(gas[_ss].ssEnd >= block.timestamp);
        IERC20(gas[_ss].addr).transferFrom(msg.sender, address(this), gas[_ss].usage);
        unstake(0, _landId, _isMeme, _ss);
        nftStatus[msg.sender].refuelAt = block.timestamp;
        nftStatus[msg.sender].isStaked = true;
    }

    function calculateRewards(
        address _staker,
        uint256 _ss,
        uint256 _landId
    ) public view returns (uint256) {
        uint256 timeElapsed = nftStatus[_staker].refuelAt + 7 days >= block.timestamp ?
            block.timestamp - nftStatus[_staker].refuelAt :
            7 days;
        uint256 landBonus = ILANDOWNER(cmcitySlot1).slotOwner(_landId) == msg.sender ?
            ILANDBONUS(cmcityConstruction).landBonus(_landId) * ILANDOWNER(cmcitySlot1).slotLevel(_landId) :
            1;
        return nftStatus[_staker].allPow * landBonus * 1 gwei * gas[_ss].multiplier * timeElapsed;
    }
    
    function unstake(
        uint256 _slot, 
        uint256 _landId,
        bool _isMeme,
        uint256 _ss
    ) public {
        require(_slot >= 0 && _slot <= 15);

        if (nftStatus[msg.sender].isStaked && gas[_ss].ssEnd + 7 days >= block.timestamp) {
            IERC20(reward[_ss]).transfer(msg.sender, calculateRewards(msg.sender, _ss, _landId));
            delete nftStatus[msg.sender].isStaked;
        }
        if (_slot != 0) {
            uint256 tokenId;
            uint256 colMul = 1;

            if (_isMeme) {
                uint256 memeIndex;
                
                if (_slot == 1) {
                    require(nftEquipMeme[msg.sender][_ss].characterId != 0);
                    memeIndex = nftMeme[_ss].characterId;
                    tokenId = nftEquipMeme[msg.sender][_ss].characterId;
                    delete nftEquipMeme[msg.sender][_ss].characterId;
                } else if (_slot == 2) {
                    require(nftEquipMeme[msg.sender][_ss].hatId != 0);
                    memeIndex = nftMeme[_ss].hatId;
                    tokenId = nftEquipMeme[msg.sender][_ss].hatId;
                    delete nftEquipMeme[msg.sender][_ss].hatId;
                } else if (_slot == 3) {
                    require(nftEquipMeme[msg.sender][_ss].clothId != 0);
                    memeIndex = nftMeme[_ss].clothId;
                    tokenId = nftEquipMeme[msg.sender][_ss].clothId;
                    delete nftEquipMeme[msg.sender][_ss].clothId;
                } else if (_slot == 4) {
                    require(nftEquipMeme[msg.sender][_ss].accId != 0);
                    memeIndex = nftMeme[_ss].accId;
                    tokenId = nftEquipMeme[msg.sender][_ss].accId;
                    delete nftEquipMeme[msg.sender][_ss].accId;
                } else if (_slot == 5) {
                    require(nftEquipMeme[msg.sender][_ss].backId != 0);
                    memeIndex = nftMeme[_ss].backId;
                    tokenId = nftEquipMeme[msg.sender][_ss].backId;
                    delete nftEquipMeme[msg.sender][_ss].backId;
                } else if (_slot == 6) {
                    require(nftEquipMeme[msg.sender][_ss].shoesId == 0);
                    memeIndex = nftMeme[_ss].shoesId;
                    tokenId = nftEquipMeme[msg.sender][_ss].shoesId;
                    delete nftEquipMeme[msg.sender][_ss].shoesId;
                } else if (_slot == 7) {
                    require(nftEquipMeme[msg.sender][_ss].weaponId == 0);
                    memeIndex = nftMeme[_ss].weaponId;
                    tokenId = nftEquipMeme[msg.sender][_ss].weaponId;
                    delete nftEquipMeme[msg.sender][_ss].weaponId;
                }

                IERC721(nft[memeIndex]).transferFrom(address(this), msg.sender, tokenId);
            } else {
                if (_slot == 1) {
                    require(
                        nftEquip[msg.sender].characterId != 0 &&
                        nftEquip[msg.sender].hatId == 0 &&
                        nftEquip[msg.sender].clothId == 0 &&
                        nftEquip[msg.sender].accId == 0 &&
                        nftEquip[msg.sender].backId == 0 &&
                        nftEquip[msg.sender].shoesId == 0 &&
                        nftEquip[msg.sender].weaponId == 0 &&
                        nftEquip2[msg.sender].weapon2Id == 0 &&
                        nftEquip2[msg.sender].acc2Id == 0 &&
                        nftEquip2[msg.sender].acc3Id == 0 &&
                        nftEquip2[msg.sender].acc4Id == 0 &&
                        nftEquip2[msg.sender].acc5Id == 0 &&
                        nftEquip2[msg.sender].acc6Id == 0 &&
                        nftEquip2[msg.sender].soulId == 0 &&
                        nftEquip2[msg.sender].badgeId == 0
                    );
                    colMul = nftEquipColMul[msg.sender].characterId;
                    tokenId = nftEquip[msg.sender].characterId;
                    delete nftEquip[msg.sender].characterId;
                } else if (_slot == 2) {
                    require(nftEquip[msg.sender].hatId != 0);
                    colMul = nftEquipColMul[msg.sender].hatId;
                    tokenId = nftEquip[msg.sender].hatId;
                    delete nftEquip[msg.sender].hatId;
                } else if (_slot == 3) {
                    require(nftEquip[msg.sender].clothId != 0);
                    colMul = nftEquipColMul[msg.sender].clothId;
                    tokenId = nftEquip[msg.sender].clothId;
                    delete nftEquip[msg.sender].clothId;
                } else if (_slot == 4) {
                    require(nftEquip[msg.sender].accId != 0);
                    colMul = nftEquipColMul[msg.sender].accId;
                    tokenId = nftEquip[msg.sender].accId;
                    delete nftEquip[msg.sender].accId;
                } else if (_slot == 5) {
                    require(nftEquip[msg.sender].backId != 0);
                    colMul = nftEquipColMul[msg.sender].backId;
                    tokenId = nftEquip[msg.sender].backId;
                    delete nftEquip[msg.sender].backId;
                } else if (_slot == 6) {
                    require(nftEquip[msg.sender].shoesId != 0);
                    colMul = nftEquipColMul[msg.sender].shoesId;
                    tokenId = nftEquip[msg.sender].shoesId;
                    delete nftEquip[msg.sender].shoesId;
                } else if (_slot == 7) {
                    require(nftEquip[msg.sender].weaponId != 0);
                    colMul = nftEquipColMul[msg.sender].weaponId;
                    tokenId = nftEquip[msg.sender].weaponId;
                    delete nftEquip[msg.sender].weaponId;
                } else if (_slot == 8) {
                    require(nftEquip2[msg.sender].badgeId != 0);
                    colMul = nftEquip2ColMul[msg.sender].badgeId;
                    tokenId = nftEquip2[msg.sender].badgeId;
                    delete nftEquip2[msg.sender].badgeId;
                } else if (_slot == 9) {
                    require(nftEquip2[msg.sender].acc2Id != 0);
                    colMul = nftEquip2ColMul[msg.sender].acc2Id;
                    tokenId = nftEquip2[msg.sender].acc2Id;
                    delete nftEquip2[msg.sender].acc2Id;
                } else if (_slot == 10) {
                    require(nftEquip2[msg.sender].acc3Id != 0);
                    colMul = nftEquip2ColMul[msg.sender].acc3Id;
                    tokenId = nftEquip2[msg.sender].acc3Id;
                    delete nftEquip2[msg.sender].acc3Id;
                } else if (_slot == 11) {
                    require(nftEquip2[msg.sender].acc4Id != 0);
                    colMul = nftEquip2ColMul[msg.sender].acc4Id;
                    tokenId = nftEquip2[msg.sender].acc4Id;
                    delete nftEquip2[msg.sender].acc4Id;
                } else if (_slot == 12) {
                    require(nftEquip2[msg.sender].acc5Id != 0);
                    colMul = nftEquip2ColMul[msg.sender].acc5Id;
                    tokenId = nftEquip2[msg.sender].acc5Id;
                    delete nftEquip2[msg.sender].acc5Id;
                } else if (_slot == 13) {
                    require(nftEquip2[msg.sender].acc6Id != 0);
                    colMul = nftEquip2ColMul[msg.sender].acc6Id;
                    tokenId = nftEquip2[msg.sender].acc6Id;
                    delete nftEquip2[msg.sender].acc6Id;
                } else if (_slot == 14) {
                    require(nftEquip2[msg.sender].weapon2Id != 0);
                    colMul = nftEquip2ColMul[msg.sender].weapon2Id;
                    tokenId = nftEquip2[msg.sender].weapon2Id;
                    delete nftEquip2[msg.sender].weapon2Id;
                } else if (_slot == 15) {
                    require(nftEquip2[msg.sender].soulId != 0);
                    colMul = nftEquip2ColMul[msg.sender].soulId;
                    tokenId = nftEquip2[msg.sender].soulId;
                    delete nftEquip2[msg.sender].soulId;
                }

                IERC721(nft[1]).transferFrom(address(this), msg.sender, tokenId);
            }

            nftStatus[msg.sender].allPow -= (tokenId % 100000) * colMul;
        }
    }
}
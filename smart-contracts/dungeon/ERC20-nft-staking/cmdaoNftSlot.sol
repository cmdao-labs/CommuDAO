// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract cmdaoNftSlot is Ownable {
    address public nft;
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
    mapping(address => uint256) public nftStatus;
    mapping(address => uint256) public nonTransferSCM;

    constructor(address _nft) Ownable(msg.sender) {
        nft = _nft;
    }

    function migrateNFT(uint256 _tokenId, address _to) external onlyOwner {
        IERC721(nft).transferFrom(address(this), _to, _tokenId);
    }

    function withdrawFee(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    function equip(uint256 _tokenId, uint256 _slot) external payable {
        require(msg.value >= 0.00005 ether);
        nonTransferSCM[msg.sender] += msg.value;

        uint256 eliSlot = _tokenId / 100000000000;
        require(_slot >= 1 && _slot <= 15 && eliSlot >= 1 && eliSlot <= 8);
        
        IERC721(nft).transferFrom(msg.sender, address(this), _tokenId);

        if (eliSlot == 1) {
            if (_slot == 1) {
                require(nftEquip[msg.sender].characterId == 0);
                nftEquip[msg.sender].characterId = _tokenId;
            } else if (_slot == 15) {
                require(nftEquip[msg.sender].characterId != 0 && nftEquip2[msg.sender].soulId == 0);
                nftEquip2[msg.sender].soulId = _tokenId;
            }
        } else {
            require(nftEquip[msg.sender].characterId != 0);
            
            if (eliSlot == 2 && _slot == 2) {
                require(nftEquip[msg.sender].hatId == 0);
                nftEquip[msg.sender].hatId = _tokenId;
            } else if (eliSlot == 3 && _slot == 3) {
                require(nftEquip[msg.sender].clothId == 0);
                nftEquip[msg.sender].clothId = _tokenId;
            } else if (eliSlot == 4) {
                if (_slot == 4) {
                    require(nftEquip[msg.sender].accId == 0);
                    nftEquip[msg.sender].accId = _tokenId;
                } else if (_slot == 9) {
                    require(nftEquip2[msg.sender].acc2Id == 0);
                    nftEquip2[msg.sender].acc2Id = _tokenId;
                } else if (_slot == 10) {
                    require(nftEquip2[msg.sender].acc3Id == 0);
                    nftEquip2[msg.sender].acc3Id = _tokenId;
                } else if (_slot == 11) {
                    require(nftEquip2[msg.sender].acc4Id == 0);
                    nftEquip2[msg.sender].acc4Id = _tokenId;
                } else if (_slot == 12) {
                    require(nftEquip2[msg.sender].acc5Id == 0);
                    nftEquip2[msg.sender].acc5Id = _tokenId;
                } else if (_slot == 13) {
                    require(nftEquip2[msg.sender].acc6Id == 0);
                    nftEquip2[msg.sender].acc6Id = _tokenId;
                }
            } else if (eliSlot == 5 && _slot == 5) {
                require(nftEquip[msg.sender].backId == 0);
                nftEquip[msg.sender].backId = _tokenId;
            } else if (eliSlot == 6 && _slot == 6) {
                require(nftEquip[msg.sender].shoesId == 0);
                nftEquip[msg.sender].shoesId = _tokenId;
            } else if (eliSlot == 7) {
                if (_slot == 7) {
                    require(nftEquip[msg.sender].weaponId == 0);
                    nftEquip[msg.sender].weaponId = _tokenId;
                } else if (_slot == 14) {
                    require(nftEquip2[msg.sender].weapon2Id == 0);
                    nftEquip2[msg.sender].weapon2Id = _tokenId;
                }
            } else if (eliSlot == 8 && _slot == 8) {
                require(nftEquip2[msg.sender].badgeId == 0);
                nftEquip2[msg.sender].badgeId = _tokenId;
            } else {
                revert();
            }
        }

        nftStatus[msg.sender] += (_tokenId % 100000);
    }
    
    function unstake(uint256 _slot) external {
        require(_slot >= 1 && _slot <= 15);
        uint256 tokenId;

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
            tokenId = nftEquip[msg.sender].characterId;
            delete nftEquip[msg.sender].characterId;
        } else if (_slot == 2) {
            require(nftEquip[msg.sender].hatId != 0);
            tokenId = nftEquip[msg.sender].hatId;
            delete nftEquip[msg.sender].hatId;
        } else if (_slot == 3) {
            require(nftEquip[msg.sender].clothId != 0);
            tokenId = nftEquip[msg.sender].clothId;
            delete nftEquip[msg.sender].clothId;
        } else if (_slot == 4) {
            require(nftEquip[msg.sender].accId != 0);
            tokenId = nftEquip[msg.sender].accId;
            delete nftEquip[msg.sender].accId;
        } else if (_slot == 5) {
            require(nftEquip[msg.sender].backId != 0);
            tokenId = nftEquip[msg.sender].backId;
            delete nftEquip[msg.sender].backId;
        } else if (_slot == 6) {
            require(nftEquip[msg.sender].shoesId != 0);
            tokenId = nftEquip[msg.sender].shoesId;
            delete nftEquip[msg.sender].shoesId;
        } else if (_slot == 7) {
            require(nftEquip[msg.sender].weaponId != 0);
            tokenId = nftEquip[msg.sender].weaponId;
            delete nftEquip[msg.sender].weaponId;
        } else if (_slot == 8) {
            require(nftEquip2[msg.sender].badgeId != 0);
            tokenId = nftEquip2[msg.sender].badgeId;
            delete nftEquip2[msg.sender].badgeId;
        } else if (_slot == 9) {
            require(nftEquip2[msg.sender].acc2Id != 0);
            tokenId = nftEquip2[msg.sender].acc2Id;
            delete nftEquip2[msg.sender].acc2Id;
        } else if (_slot == 10) {
            require(nftEquip2[msg.sender].acc3Id != 0);
            tokenId = nftEquip2[msg.sender].acc3Id;
            delete nftEquip2[msg.sender].acc3Id;
        } else if (_slot == 11) {
            require(nftEquip2[msg.sender].acc4Id != 0);
            tokenId = nftEquip2[msg.sender].acc4Id;
            delete nftEquip2[msg.sender].acc4Id;
        } else if (_slot == 12) {
            require(nftEquip2[msg.sender].acc5Id != 0);
            tokenId = nftEquip2[msg.sender].acc5Id;
            delete nftEquip2[msg.sender].acc5Id;
        } else if (_slot == 13) {
            require(nftEquip2[msg.sender].acc6Id != 0);
            tokenId = nftEquip2[msg.sender].acc6Id;
            delete nftEquip2[msg.sender].acc6Id;
        } else if (_slot == 14) {
            require(nftEquip2[msg.sender].weapon2Id != 0);
            tokenId = nftEquip2[msg.sender].weapon2Id;
            delete nftEquip2[msg.sender].weapon2Id;
        } else if (_slot == 15) {
            require(nftEquip2[msg.sender].soulId != 0);
            tokenId = nftEquip2[msg.sender].soulId;
            delete nftEquip2[msg.sender].soulId;
        }

        IERC721(nft).transferFrom(address(this), msg.sender, tokenId);

        nftStatus[msg.sender] -= (tokenId % 100000);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/utils/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC721/utils/ERC721Holder.sol";

contract FieldMHZ is ERC20, ERC721Holder, ReentrancyGuard {
    address public tdNft;
    address public tmToken;
    mapping(uint256 => uint256) public power;
    struct Nft {
        address tokenOwnerOf;
        uint256 tokenStakedAt;
        uint256 power;
    }
    mapping(uint256 => Nft) public nftStake;
    struct Token {
        uint256 tokenAmount;
        uint256 tokenStakedAt;
        uint256 power;
    }
    mapping(address => Token) public tokenStake;

    event ItemStaked(bool indexed isNft, uint256 indexed tokenOrNftId, address indexed owner, uint256 timestamp);
    event ItemUnstaked(bool indexed isNft, uint256 indexed tokenOrNftId, address indexed owner, uint256 timestamp);
    event Claimed(uint256 reward, bool indexed isNft, uint256 indexed tokenOrNftId, address indexed owner, uint256 timestamp);

    constructor(address _tdNft, address _tmToken) ERC20("Gear", "GEAR") {
        tdNft = _tdNft;
        tmToken = _tmToken;
    }

    function calculateRewards(
        uint256 _tokenIdorAmount,
        address _addr,
        bool _isNft
    ) public view returns (uint256) {
        uint256 timeElapsed;
        if (_isNft) {
            Nft storage stakednft = nftStake[_tokenIdorAmount];
            require(stakednft.tokenStakedAt != 0, "This nft was never staked");

            timeElapsed = block.timestamp - stakednft.tokenStakedAt;
            return timeElapsed * stakednft.power * (37275600845400000000 / 100);
        } else {
            Token storage stakedtoken = tokenStake[_addr];
            require(stakedtoken.tokenStakedAt != 0, "This token was never staked");

            timeElapsed = block.timestamp - stakedtoken.tokenStakedAt;
            return (timeElapsed * stakedtoken.tokenAmount * stakedtoken.power * (2314810000000 / 100)) / 1 ether;
        }
    }

    function stake(uint256 _tokenIdorAmount, bool _isNft) external nonReentrant {
        if (_isNft) {
            Nft storage stakednft = nftStake[_tokenIdorAmount];
            IERC721(tdNft).transferFrom(msg.sender, address(this), _tokenIdorAmount);
            stakednft.tokenOwnerOf = msg.sender;
            stakednft.tokenStakedAt = block.timestamp;
            
            if (_tokenIdorAmount / 1e5 >= 271) {
                stakednft.power = 100;
            } else if (_tokenIdorAmount / 1e5 >= 146) {
                stakednft.power = 120;
            } else if (_tokenIdorAmount / 1e5 >= 77) {
                stakednft.power = 150;
            } else if (_tokenIdorAmount / 1e5 >= 23) {
                stakednft.power = 180;
            } else {
                stakednft.power = 250;
            }
        } else {
            Token storage stakedtoken = tokenStake[msg.sender];
            IERC721(tmToken).transferFrom(msg.sender, address(this), _tokenIdorAmount);
            stakedtoken.tokenAmount += _tokenIdorAmount;
            stakedtoken.tokenStakedAt = block.timestamp;

            if (stakedtoken.tokenAmount / 1e23 >= 53) {
                stakedtoken.power = 250;
            } else if (stakedtoken.tokenAmount / 1e23 >= 52) {
                stakedtoken.power = 195;
            } else if (stakedtoken.tokenAmount / 1e23 >= 51) {
                stakedtoken.power = 190;
            } else if (stakedtoken.tokenAmount / 1e23 >= 50) {
                stakedtoken.power = 185;
            } else if (stakedtoken.tokenAmount / 1e23 >= 33) {
                stakedtoken.power = 180;
            } else if (stakedtoken.tokenAmount / 1e23 >= 32) {
                stakedtoken.power = 165;
            } else if (stakedtoken.tokenAmount / 1e23 >= 31) {
                stakedtoken.power = 160;
            } else if (stakedtoken.tokenAmount / 1e23 >= 30) {
                stakedtoken.power = 155;
            } else if (stakedtoken.tokenAmount / 1e23 >= 23) {
                stakedtoken.power = 150;
            } else if (stakedtoken.tokenAmount / 1e23 >= 22) {
                stakedtoken.power = 135;
            } else if (stakedtoken.tokenAmount / 1e23 >= 21) {
                stakedtoken.power = 130;
            } else if (stakedtoken.tokenAmount / 1e23 >= 20) {
                stakedtoken.power = 125;
            } else if (stakedtoken.tokenAmount / 1e23 >= 15) {
                stakedtoken.power = 120;
            } else if (stakedtoken.tokenAmount / 1e23 >= 14) {
                stakedtoken.power = 115;
            } else if (stakedtoken.tokenAmount / 1e23 >= 13) {
                stakedtoken.power = 110;
            } else if (stakedtoken.tokenAmount / 1e23 >= 12) {
                stakedtoken.power = 105;
            } else if (stakedtoken.tokenAmount / 1e23 >= 10) {
                stakedtoken.power = 100;
            } else if (stakedtoken.tokenAmount / 1e23 >= 9) {
                stakedtoken.power = 95;
            } else if (stakedtoken.tokenAmount / 1e23 >= 8) {
                stakedtoken.power = 85;
            } else {
                stakedtoken.power = 15;
            }
        }

        emit ItemStaked(_isNft, _tokenIdorAmount, msg.sender, block.timestamp);
    }

    function unstake(
        uint256 _tokenIdorAmount,
        bool _isNft,
        bool _unstake
    ) external nonReentrant {
        if (_isNft) {
            Nft storage stakednft = nftStake[_tokenIdorAmount];
            require(stakednft.tokenOwnerOf == msg.sender, "You are not the owner");
            
            _mint(msg.sender, calculateRewards(_tokenIdorAmount, msg.sender, _isNft));
            emit Claimed(calculateRewards(_tokenIdorAmount, msg.sender, _isNft), _isNft, _tokenIdorAmount, msg.sender, block.timestamp);

            stakednft.tokenStakedAt = block.timestamp;

            if (_unstake) {
                IERC721(tdNft).transferFrom(address(this), msg.sender, _tokenIdorAmount);

                delete nftStake[_tokenIdorAmount];
                emit ItemUnstaked(_isNft, _tokenIdorAmount, msg.sender, block.timestamp);
            }
        } else {
            Token storage stakedtoken = tokenStake[msg.sender];
            
            _mint(msg.sender, calculateRewards(_tokenIdorAmount, msg.sender, _isNft));
            emit Claimed(calculateRewards(_tokenIdorAmount, msg.sender, _isNft), _isNft, _tokenIdorAmount, msg.sender, block.timestamp);

            stakedtoken.tokenStakedAt = block.timestamp;

            if (_unstake) {
                IERC20(tmToken).transfer(msg.sender, stakedtoken.tokenAmount);
                
                emit ItemUnstaked(_isNft, stakedtoken.tokenAmount, msg.sender, block.timestamp);
                delete tokenStake[msg.sender];
            }
        }
    }
}
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./CMDAO_NFT_MintHelper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMDAO_NFT_Enchantment_R is ReentrancyGuard, Ownable {
    CMDAO_NFT_MintHelper public mintHelper;

    mapping(uint256=>address) public tokens;
    
    struct Enchantment {
        uint256 nftCol;
        uint256 startPower;
        uint256 upPower;
        string tokenURI;
        uint256 token0amount;
        uint256 token1index;
        uint256 token1amount;
        uint256 token2index;
        uint256 token2amount;
        uint256 failureNullDivChance;
    }
    mapping(uint256=>Enchantment) public enchanter;

    constructor(address _mintHelper) {
        mintHelper = CMDAO_NFT_MintHelper(_mintHelper);
    }

    function setToken(uint256 _index, address _addr) external onlyOwner {
        tokens[_index] = _addr;
    }

    function withdrawToken(
        uint256 _tokenindex,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        IERC20(tokens[_tokenindex]).transfer(_to, _amount);
    }

    function setEnchanter(
        uint256 _index,
        uint256 _nftCol,
        uint256 _startPower,
        uint256 _upPower,
        string memory _tokenURI,
        uint256 _token0amount,
        uint256 _token1index,
        uint256 _token1amount,
        uint256 _token2index,
        uint256 _token2amount,
        uint256 _failureNullDivChance
    ) external onlyOwner {
        enchanter[_index].nftCol = _nftCol;
        enchanter[_index].startPower = _startPower;
        enchanter[_index].upPower = _upPower;
        enchanter[_index].tokenURI = _tokenURI;
        enchanter[_index].token0amount = _token0amount;
        enchanter[_index].token1index = _token1index;
        enchanter[_index].token1amount = _token1amount;
        enchanter[_index].token2index = _token2index;
        enchanter[_index].token2amount = _token2amount;
        enchanter[_index].failureNullDivChance = _failureNullDivChance;
    }

    function enchant(uint256 _index, uint256 _nftId) external nonReentrant {
        require(_nftId / 1e9 == enchanter[_index].nftCol && _nftId % 100000 == enchanter[_index].startPower , "NFT col doesn't eligible");

        IERC20(tokens[1]).transferFrom(msg.sender, address(this), enchanter[_index].token0amount);
        IERC20(tokens[enchanter[_index].token1index]).transferFrom(msg.sender, address(1), enchanter[_index].token1amount);
        IERC20(tokens[enchanter[_index].token2index]).transferFrom(msg.sender, address(1), enchanter[_index].token2amount);

        if (enchanter[_index].failureNullDivChance != 0) {
            uint256 random = uint256(blockhash(block.number - 1)) % enchanter[_index].failureNullDivChance;

            if (random == 1) {
                _enchant(_index, _nftId);
            }
        } else {
            _enchant(_index, _nftId);
        }
    }

    function _enchant(uint256 _index, uint256 _nftId) private {
        CommuDAO_NFT(mintHelper.cmdaoNft()).transferFrom(msg.sender, address(1), _nftId);

        uint256 newId = _nftId + enchanter[_index].upPower;
        mintHelper.externalMint(2, msg.sender, newId, enchanter[_index].tokenURI);
    }
}
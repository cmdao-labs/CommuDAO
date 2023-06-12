// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CMDAO_NFT_MintHelper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMDAO_NFT_Fusion is Ownable {
    CMDAO_NFT_MintHelper public mintHelper;

    mapping(uint256=>address) public tokens;
    
    struct Fusion {
        uint256 colId;
        uint256 colId2;
        uint256 colId3;
        uint256 colId4;
        uint256 colId5;
        uint256 upPower;
        string tokenURI;
        uint256 token0amount;
        uint256 token1amount;
        uint256 failureNullDivChance;
    }
    mapping(uint256=>Fusion) public fusion;

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

    function setFusion(
        uint256 _index,
        uint256 _colId,
        uint256 _colId2,
        uint256 _colId3,
        uint256 _colId4,
        uint256 _colId5,
        uint256 _upPower,
        string memory _tokenURI,
        uint256 _token0amount,
        uint256 _token1amount,
        uint256 _failureNullDivChance
    ) external onlyOwner {
        fusion[_index].colId = _colId;
        fusion[_index].colId2 = _colId2;
        fusion[_index].colId3 = _colId3;
        fusion[_index].colId4 = _colId4;
        fusion[_index].colId5 = _colId5;
        fusion[_index].upPower = _upPower;
        fusion[_index].tokenURI = _tokenURI;
        fusion[_index].token0amount = _token0amount;
        fusion[_index].token1amount = _token1amount;
        fusion[_index].failureNullDivChance = _failureNullDivChance;
    }

    function enchant(
        uint256 _index,
        uint256 _nftId,
        uint256 _nftId2,
        uint256 _nftId3,
        uint256 _nftId4,
        uint256 _nftId5
    ) external {
        require(
            _nftId / 1e8 == fusion[_index].colId
            && _nftId2 / 1e8 == fusion[_index].colId2
            && _nftId3 / 1e8 == fusion[_index].colId3
            && _nftId4 / 1e8 == fusion[_index].colId4
            && _nftId5 / 1e8 == fusion[_index].colId5
        , "NFT col doesn't eligible");

        IERC20(tokens[1]).transferFrom(msg.sender, address(this), fusion[_index].token0amount);
        IERC20(tokens[2]).transferFrom(msg.sender, address(1), fusion[_index].token1amount);

        if (fusion[_index].failureNullDivChance != 0) {
            uint256 random = uint256(blockhash(block.number - 1)) % fusion[_index].failureNullDivChance;

            if (random == 1) {
                _enchant(_index, _nftId, _nftId2, _nftId3, _nftId4, _nftId5);
            }
        } else {
            _enchant(_index, _nftId, _nftId2, _nftId3, _nftId4, _nftId5);
        }
    }

    function _enchant(
        uint256 _index,
        uint256 _nftId,
        uint256 _nftId2,
        uint256 _nftId3,
        uint256 _nftId4,
        uint256 _nftId5
    ) private {
        CommuDAO_NFT(mintHelper.cmdaoNft()).transferFrom(msg.sender, address(1), _nftId);
        CommuDAO_NFT(mintHelper.cmdaoNft()).transferFrom(msg.sender, address(1), _nftId2);
        if (_nftId3 != 0) {
            CommuDAO_NFT(mintHelper.cmdaoNft()).transferFrom(msg.sender, address(1), _nftId3);
        }
        if (_nftId4 != 0) {
            CommuDAO_NFT(mintHelper.cmdaoNft()).transferFrom(msg.sender, address(1), _nftId4);
        }
        if (_nftId5 != 0) {
            CommuDAO_NFT(mintHelper.cmdaoNft()).transferFrom(msg.sender, address(1), _nftId5);
        }

        uint256 newId = _nftId + 1e9 + fusion[_index].upPower;
        mintHelper.externalMint(12, msg.sender, newId, fusion[_index].tokenURI);
    }
}
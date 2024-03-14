// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CMDAO721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/IERC20.sol";

contract CMDAO721Upgrade01 is Ownable {
    mapping(uint256 => address) public nfts;
    mapping(uint256 => address) public tokens;
    uint256 public gasUsage;
    
    struct Enchantment {
        uint256 nftIndex;
        uint256 nftCol;
        uint256 startPower;
        uint256 upPower;
        string tokenURI;
        uint256 token1index;
        uint256 token1amount;
        uint256 token2index;
        uint256 token2amount;
        uint256 failureNullDivChance;
    }
    mapping(uint256 => Enchantment) public enchanter;

    constructor() Ownable(msg.sender) {}

    function setNft(uint256 _index, address _addr) external onlyOwner {
        nfts[_index] = _addr;
    }

    function setToken(uint256 _index, address _addr) external onlyOwner {
        tokens[_index] = _addr;
    }

    function setGasUsage(uint256 _gasUsage) external onlyOwner {
        gasUsage = _gasUsage;
    }

    function withdrawGas(uint256 _amount, address _to) external onlyOwner {
        IERC20(tokens[0]).transfer(_to, _amount);
    }

    function setEnchanter(
        uint256 _index,
        uint256 _nftIndex,
        uint256 _nftCol,
        uint256 _startPower,
        uint256 _upPower,
        string memory _tokenURI,
        uint256 _token1index,
        uint256 _token1amount,
        uint256 _token2index,
        uint256 _token2amount,
        uint256 _failureNullDivChance
    ) external onlyOwner {
        enchanter[_index].nftIndex = _nftIndex;
        enchanter[_index].nftCol = _nftCol;
        enchanter[_index].startPower = _startPower;
        enchanter[_index].upPower = _upPower;
        enchanter[_index].tokenURI = _tokenURI;
        enchanter[_index].token1index = _token1index;
        enchanter[_index].token1amount = _token1amount;
        enchanter[_index].token2index = _token2index;
        enchanter[_index].token2amount = _token2amount;
        enchanter[_index].failureNullDivChance = _failureNullDivChance;
    }

    function enchant(uint256 _index, uint256 _nftId) external {
        require(_nftId / 1e9 == enchanter[_index].nftCol && _nftId % 100000 == enchanter[_index].startPower , "NFT col doesn't eligible");

        IERC20(tokens[0]).transferFrom(msg.sender, address(this), gasUsage); // pay gas
        IERC20(tokens[enchanter[_index].token1index]).transferFrom(msg.sender, address(1), enchanter[_index].token1amount);
        IERC20(tokens[enchanter[_index].token2index]).transferFrom(msg.sender, address(1), enchanter[_index].token2amount);

        if (enchanter[_index].failureNullDivChance != 0) {
            uint256 random = uint256(blockhash(block.number - 1)) % enchanter[_index].failureNullDivChance;

            if (random == 1) {
                _enchant(_index, enchanter[_index].nftIndex, _nftId);
            }
        } else {
            _enchant(_index, enchanter[_index].nftIndex, _nftId);
        }
    }

    function _enchant(
        uint256 _upgradeIndex,
        uint256 _nftIndex,
        uint256 _nftId
    ) private {
        CMDAO721(nfts[_nftIndex]).cmdao721Burn(msg.sender, _nftId);

        uint256 newId = _nftId + enchanter[_upgradeIndex].upPower;
        CMDAO721(nfts[_nftIndex]).cmdao721Mint(1, msg.sender, newId, enchanter[_upgradeIndex].tokenURI);
    }
}
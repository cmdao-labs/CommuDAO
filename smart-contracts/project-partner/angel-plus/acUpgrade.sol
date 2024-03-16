// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ac_ap_nft_mintHelper.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.0/contracts/token/ERC20/IERC20.sol";

contract acUpgrade is Ownable {
    AC_AP_NFT_MintHelper public mintHelper;
    mapping(uint256 => address) public tokens;
    
    struct Enchantment {
        uint256 oldNftCol;
        uint256 newNftCol;
        string tokenURI;
        uint256 token0index;
        uint256 token0amount;
        uint256 token1index;
        uint256 token1amount;
    }
    mapping(uint256 => Enchantment) public enchanter;

    constructor(address _mintHelper) {
        mintHelper = AC_AP_NFT_MintHelper(_mintHelper);
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
        uint256 _oldNftCol,
        uint256 _newNftCol,
        string memory _tokenURI,
        uint256 _token0index,
        uint256 _token0amount,
        uint256 _token1index,
        uint256 _token1amount
    ) external onlyOwner {
        enchanter[_index].oldNftCol = _oldNftCol;
        enchanter[_index].newNftCol = _newNftCol;
        enchanter[_index].tokenURI = _tokenURI;
        enchanter[_index].token0index = _token0index;
        enchanter[_index].token0amount = _token0amount;
        enchanter[_index].token1index = _token1index;
        enchanter[_index].token1amount = _token1amount;
    }

    function enchant(uint256 _index, uint256 _nftId) external {
        require(_nftId / 1e6 == enchanter[_index].oldNftCol, "NFT col doesn't eligible");

        IERC20(tokens[enchanter[_index].token0index]).transferFrom(msg.sender, address(this), enchanter[_index].token0amount);
        IERC20(tokens[enchanter[_index].token1index]).transferFrom(msg.sender, address(1), enchanter[_index].token1amount);

        AC_AP_NFT(mintHelper.ac_ap_nft()).transferFrom(msg.sender, address(1), _nftId);

        uint256 newId = (enchanter[_index].newNftCol * 1e6) + (_nftId % 1e6);
        mintHelper.externalMint(1, msg.sender, newId, enchanter[_index].tokenURI);
    }
}
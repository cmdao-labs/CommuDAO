// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "./CMDAO_NFT_MintHelper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CMDAO_NFT_Enchantment_N is ReentrancyGuard {

    CMDAO_NFT_MintHelper public mintHelper;

    modifier onlyProjectAdmin() {
        require(msg.sender == mintHelper.projectAdmin(), "Not Permission to call");
        _;
    }

    mapping(uint256=>address) public tokens;
    
    struct Enchantment {
        uint256 nftCol;
        uint256 startPower;
        uint256 upPower;
        string tokenURI;
        uint256 token0index;
        uint256 token0amount;
        uint256 token1index;
        uint256 token1amount;
    }
    mapping(uint256=>Enchantment) public enchanter;

    constructor(address _mintHelper) {
        mintHelper = CMDAO_NFT_MintHelper(_mintHelper);
    }

    function setToken(uint256 _index, address _addr) external onlyProjectAdmin {
        tokens[_index] = _addr;
    }

    function withdrawToken(
        uint256 _tokenindex,
        uint256 _amount,
        address _to
    ) external onlyProjectAdmin {
        IERC20(tokens[_tokenindex]).transfer(_to, _amount);
    }

    function setEnchanter(
        uint256 _index,
        uint256 _nftCol,
        uint256 _startPower,
        uint256 _upPower,
        string memory _tokenURI,
        uint256 _token0index,
        uint256 _token0amount,
        uint256 _token1index,
        uint256 _token1amount
    ) external onlyProjectAdmin {
        enchanter[_index].nftCol = _nftCol;
        enchanter[_index].startPower = _startPower;
        enchanter[_index].upPower = _upPower;
        enchanter[_index].tokenURI = _tokenURI;
        enchanter[_index].token0index = _token0index;
        enchanter[_index].token0amount = _token0amount;
        enchanter[_index].token1index = _token1index;
        enchanter[_index].token1amount = _token1amount;
    }

    function enchant(uint256 _index, uint256 _nftId) external nonReentrant {
        require(_nftId / 1e9 == enchanter[_index].nftCol && _nftId % 100000 == enchanter[_index].startPower , "NFT col doesn't eligible");

        IERC20(tokens[enchanter[_index].token0index]).transferFrom(msg.sender, address(this), enchanter[_index].token0amount);
        IERC20(tokens[enchanter[_index].token1index]).transferFrom(msg.sender, address(1), enchanter[_index].token1amount);

        CommuDAO_NFT(mintHelper.cmdaoNft()).transferFrom(msg.sender, address(1), _nftId);

        uint256 newId = _nftId + enchanter[_index].upPower;
        mintHelper.externalMint(1, msg.sender, newId, enchanter[_index].tokenURI);
    }

}
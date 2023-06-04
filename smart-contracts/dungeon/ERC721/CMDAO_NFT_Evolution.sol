// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./CMDAO_NFT_MintHelper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMDAO_NFT_Evolution is Ownable {
    CMDAO_NFT_MintHelper public mintHelper;

    mapping(uint256=>address) public tokens;
    
    struct Evolution {
        uint256 startId;
        uint256 endId;
        uint256 upPower;
        string tokenURI;
        uint256 token0amount;
        uint256 token1amount;
        uint256 token2index;
        uint256 token2amount;
        uint256 failureNullDivChance;
    }
    mapping(uint256=>Evolution) public evolutionary;

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

    function setEvolutionary(
        uint256 _index,
        uint256 _startId,
        uint256 _endId,
        uint256 _upPower,
        string memory _tokenURI,
        uint256 _token0amount,
        uint256 _token1amount,
        uint256 _token2index,
        uint256 _token2amount,
        uint256 _failureNullDivChance
    ) external onlyOwner {
        evolutionary[_index].startId = _startId;
        evolutionary[_index].endId = _endId;
        evolutionary[_index].upPower = _upPower;
        evolutionary[_index].tokenURI = _tokenURI;
        evolutionary[_index].token0amount = _token0amount;
        evolutionary[_index].token1amount = _token1amount;
        evolutionary[_index].token2index = _token2index;
        evolutionary[_index].token2amount = _token2amount;
        evolutionary[_index].failureNullDivChance = _failureNullDivChance;
    }

    function enchant(uint256 _index, uint256 _nftId) external {
        require(_nftId >= evolutionary[_index].startId && _nftId <= evolutionary[_index].endId , "NFT col doesn't eligible");

        IERC20(tokens[1]).transferFrom(msg.sender, address(this), evolutionary[_index].token0amount);
        IERC20(tokens[2]).transferFrom(msg.sender, address(1), evolutionary[_index].token1amount);
        IERC20(tokens[evolutionary[_index].token2index]).transferFrom(msg.sender, address(1), evolutionary[_index].token2amount);

        if (evolutionary[_index].failureNullDivChance != 0) {
            uint256 random = uint256(blockhash(block.number - 1)) % evolutionary[_index].failureNullDivChance;

            if (random == 1) {
                _enchant(_index, _nftId);
            }
        } else {
            _enchant(_index, _nftId);
        }
    }

    function _enchant(uint256 _index, uint256 _nftId) private {
        CommuDAO_NFT(mintHelper.cmdaoNft()).transferFrom(msg.sender, address(1), _nftId);

        uint256 newId = _nftId + 1e8 + evolutionary[_index].upPower;
        mintHelper.externalMint(11, msg.sender, newId, evolutionary[_index].tokenURI);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./CMDS_NFT_v2.sol";

contract Uplevel_CMDS_v3 is Ownable {
    address public cmdsNft;
    struct Evolution {
        uint256 expReq;
        uint256 oldclassId;
        uint256 newclassId;
        string newtokenURI;
    } 
    mapping(uint256=>Evolution) public evolution;

    constructor(address _cmdsNft) Ownable(msg.sender) {
        cmdsNft = _cmdsNft;
    }

    function setEvolution(
        uint256 _expReq,
        uint256 _index,
        uint256 _oldclassId,
        uint256 _newclassId,
        string memory _newtokenURI
    ) external onlyOwner {
        evolution[_index].expReq = _expReq;
        evolution[_index].oldclassId = _oldclassId;
        evolution[_index].newclassId = _newclassId;
        evolution[_index].newtokenURI = _newtokenURI;
    }

    function uplevelServant(uint256 _index, uint256 _tokenId) external {
        require(CMDS_NFT_v2(cmdsNft).mynft(msg.sender) == (1000000 * 1e13) + (_tokenId % 1e13) ,"You are not owner");
        (, uint256 exp) = CMDS_NFT_v2(cmdsNft).nftData((1000000 * 1e13) + (_tokenId % 1e13));
        require(evolution[_index].oldclassId != 0, "Invalid evolution");
        require(evolution[_index].oldclassId == (_tokenId / 1e13), "Invalid classId");
        require(evolution[_index].expReq <= exp ,"EXP : not reach maximum");

        uint256 newtokenId = (evolution[_index].newclassId * 1e13) + (_tokenId % 1e13);
        CMDS_NFT_v2(cmdsNft).updateServantData(1, (1000000 * 1e13) + (_tokenId % 1e13), 0, false, "", false, address(0));
        CMDS_NFT_v2(cmdsNft).autoBurnAndMint(1, msg.sender, _tokenId, newtokenId, evolution[_index].newtokenURI);
    }
}
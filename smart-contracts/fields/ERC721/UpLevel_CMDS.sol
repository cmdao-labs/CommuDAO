// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StarterRouter_CMDS.sol";

contract Uplevel_CMDS is Ownable {
    address public cmdsNft;

    address public cmdsData;

    struct Evolution {
        uint256 expReq;
        uint256 oldclassId;
        uint256 newclassId;
        string newtokenURI;
    } 
    mapping(uint256=>Evolution) public evolution;

    constructor(address _cmdsNft, address _cmdsData) {
        cmdsNft = _cmdsNft;
        cmdsData = _cmdsData;
    }

    function setCmdsNft(address _cmdsNft, address _cmdsData) external onlyOwner {
        cmdsNft = _cmdsNft;
        cmdsData = _cmdsData;
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
        (, uint256 exp) = StarterRouter_CMDS(cmdsData).nftData((1000000 * 1e13) + (_tokenId % 1e13));
        require(evolution[_index].oldclassId != 0, "Invalid evolution");
        require(evolution[_index].oldclassId == (_tokenId / 1e13), "Invalid classId");
        require(evolution[_index].expReq <= exp ,"EXP : not reach maximum");

        uint256 newtokenId = (evolution[_index].newclassId * 1e13) + (_tokenId % 1e13);
        StarterRouter_CMDS(cmdsData).updateServantData(2, (1000000 * 1e13) + (_tokenId % 1e13), 0, false, "");
        CMDS_NFT(cmdsNft).autoBurn(2, _tokenId);
        CMDS_NFT(cmdsNft).autoMint(2, msg.sender, newtokenId, evolution[_index].newtokenURI);
    }

}
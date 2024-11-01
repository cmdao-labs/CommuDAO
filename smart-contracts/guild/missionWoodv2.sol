// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./fieldWoodBBQ.sol";
import "./party.sol";
import "./baseCMDReward.sol";

contract missionWoodV2 is Ownable {
    fieldWoodBBQ fieldWood;
    party theParty;
    baseCMDReward baseCMD;
    CMDS_NFT_v2 cmdsNft;
    struct RouterState {
        uint256 timestamp;
        uint256 fee;
        uint256 currentcap;
    }
    mapping(uint256 => RouterState) public routerState;
    event PartyShare(uint256 indexed partyIndex, address indexed member1, uint256 partyFee, uint256 amountShare);

    constructor(
        address _fieldWood,
        address _theParty,
        address payable _baseCMD,
        address _cmdsNft
    ) {
        fieldWood = fieldWoodBBQ(_fieldWood);
        theParty = party(_theParty);
        baseCMD = baseCMDReward(_baseCMD);
        cmdsNft = CMDS_NFT_v2(_cmdsNft);
    }

    function setFee(uint256 _partyIndex, uint256 _fee) external {
        (address member1,,,,,) = theParty.partyBody(_partyIndex);
        require(member1 == msg.sender || owner() == msg.sender, "No Permission");
        routerState[_partyIndex].fee = _fee;
    }

    function baseCapacity(uint256 _partyIndex) public view returns (uint256) {
        (address member1, address member2, address member3, address member4, address member5, uint256 refuelAt) = theParty.partyBody(_partyIndex);
        require(baseCMD.startBlock() <= refuelAt, "Party mission was expired");
        uint256 allDeleCMPOW = baseCMD.cmpow(member1) + baseCMD.cmpow(member2) + baseCMD.cmpow(member3) + baseCMD.cmpow(member4) + baseCMD.cmpow(member5);
        uint256 _cap;
        if (block.timestamp > routerState[_partyIndex].timestamp + 1 days) {
            _cap = allDeleCMPOW * 100 * 1 ether;
        } else {
            _cap = routerState[_partyIndex].currentcap;
        }
        return _cap;
    }

    function mintViaGCS(
        uint256 _partyIndex,
        uint256 _tokenId,
        bool _unstake
    ) external {
        (address member1,,,,,) = theParty.partyBody(_partyIndex);
        if (block.timestamp > routerState[_partyIndex].timestamp + 1 days) {
            routerState[_partyIndex].currentcap = baseCapacity(_partyIndex);
            routerState[_partyIndex].timestamp = block.timestamp;
        }
        uint256 mintAmount;
        if (fieldWood.calculateRewards(_tokenId) * 100 > routerState[_partyIndex].currentcap) {
            mintAmount = routerState[_partyIndex].currentcap;
        } else {
            mintAmount = fieldWood.calculateRewards(_tokenId) * 100;
        }
        routerState[_partyIndex].currentcap -= mintAmount;
        fieldWood.unstakeByProgramCall(1, _tokenId, msg.sender, mintAmount - ((mintAmount * routerState[_partyIndex].fee) / 10000), _unstake);
        fieldWood.transferFrom(msg.sender, member1, (mintAmount * routerState[_partyIndex].fee) / 10000);
        if (_unstake) {
            cmdsNft.transferFrom(address(this), msg.sender, _tokenId);
        }
        emit PartyShare(_partyIndex, member1, routerState[_partyIndex].fee, (mintAmount * routerState[_partyIndex].fee) / 10000);
    }

    function migrateCMDS(address _to, uint256 _tokenId) external onlyOwner {
        cmdsNft.transferFrom(address(this), _to, _tokenId);
    }
}
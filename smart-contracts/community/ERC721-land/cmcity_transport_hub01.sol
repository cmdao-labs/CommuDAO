// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "./cmcity_slot1.sol";
import "./BBQ.sol";

contract CMCITY_TRANSPORT_HUB01 is Ownable {
    address public cmcitySlot1;
    mapping(uint256 => address) public resources;
    struct UpLevel01 {
        uint256 newLevel;
        uint256 resource1Req;
        uint256 resource2Req;
        uint256 resource3Req;
        uint256 resource4Req;
        uint256 resource5Req;
    }
    mapping(uint256 => UpLevel01) public upLevel01;
    mapping(uint256 => UpLevel01) public upLevel02;
    struct HubState {
        uint256 level;
        uint256 currentCap;
        uint256 timestamp;
        uint256 hubFee;
    }
    mapping(uint256 => HubState) public hubState;
    mapping(uint256 => uint256) public landBonus;

    constructor(address _slot1) {
        cmcitySlot1 = _slot1;
    }

    function setResource(uint256 _index, address _resource) external onlyOwner {
        resources[_index] = _resource;
    }

    function setLandBonus(uint256 _index, uint256 _landBonus) external onlyOwner {
        landBonus[_index] = _landBonus;
    }

    function setUplevel01(
        uint256 _index,
        uint256 _newLevel,
        uint256 _resource1Req,
        uint256 _resource2Req,
        uint256 _resource3Req,
        uint256 _resource4Req,
        uint256 _resource5Req
    ) external onlyOwner {
        upLevel01[_index].newLevel = _newLevel;
        upLevel01[_index].resource1Req = _resource1Req;
        upLevel01[_index].resource2Req = _resource2Req;
        upLevel01[_index].resource3Req = _resource3Req;
        upLevel01[_index].resource4Req = _resource4Req;
        upLevel01[_index].resource5Req = _resource5Req;
    }

    function upgrade01(uint256 _index, uint256 _tokenId) external {
        require(CMCITY_SLOT1(cmcitySlot1).slotLevel(_tokenId) > 0, "House Lv.1 Require");
        require(hubState[_tokenId].level + 1 == upLevel01[_index].newLevel, "Level too low");

        if (upLevel01[_index].resource1Req > 0) {
            IERC20(resources[1]).transferFrom(msg.sender, address(1), upLevel01[_index].resource1Req);
        }
        if (upLevel01[_index].resource2Req > 0) {
            IERC20(resources[2]).transferFrom(msg.sender, address(1), upLevel01[_index].resource2Req);
        }
        if (upLevel01[_index].resource3Req > 0) {
            IERC20(resources[3]).transferFrom(msg.sender, address(1), upLevel01[_index].resource3Req);
        }
        if (upLevel01[_index].resource4Req > 0) {
            IERC20(resources[4]).transferFrom(msg.sender, address(1), upLevel01[_index].resource4Req);
        }
        if (upLevel01[_index].resource5Req > 0) {
            IERC20(resources[5]).transferFrom(msg.sender, address(1), upLevel01[_index].resource5Req);
        }

        hubState[_tokenId].level += 1;
    }

    function setUplevel02(
        uint256 _index,
        uint256 _newLevel,
        uint256 _resource1Req,
        uint256 _resource2Req,
        uint256 _resource3Req,
        uint256 _resource4Req,
        uint256 _resource5Req
    ) external onlyOwner {
        upLevel02[_index].newLevel = _newLevel;
        upLevel02[_index].resource1Req = _resource1Req;
        upLevel02[_index].resource2Req = _resource2Req;
        upLevel02[_index].resource3Req = _resource3Req;
        upLevel02[_index].resource4Req = _resource4Req;
        upLevel02[_index].resource5Req = _resource5Req;
    }

    function upgrade02(uint256 _index, uint256 _tokenId) external {
        require(CMCITY_SLOT1(cmcitySlot1).slotLevel(_tokenId) > 0, "House Lv.1 Require");
        require(hubState[_tokenId].level + 1 == upLevel02[_index].newLevel, "Level too low");

        if (upLevel02[_index].resource1Req > 0) {
            IERC20(resources[6]).transferFrom(msg.sender, address(1), upLevel02[_index].resource1Req);
        }
        if (upLevel02[_index].resource2Req > 0) {
            IERC20(resources[7]).transferFrom(msg.sender, address(1), upLevel02[_index].resource2Req);
        }
        if (upLevel02[_index].resource3Req > 0) {
            IERC20(resources[8]).transferFrom(msg.sender, address(1), upLevel02[_index].resource3Req);
        }
        if (upLevel02[_index].resource4Req > 0) {
            IERC20(resources[9]).transferFrom(msg.sender, address(1), upLevel02[_index].resource4Req);
        }
        if (upLevel02[_index].resource5Req > 0) {
            IERC20(resources[10]).transferFrom(msg.sender, address(1), upLevel02[_index].resource5Req);
        }

        hubState[_tokenId].level += 1;
    }

    function setHubFee(uint256 _tokenId, uint256 _hubFee) external {
        require(CMCITY_SLOT1(cmcitySlot1).slotOwner(_tokenId) == msg.sender, "No Permission");
        hubState[_tokenId].hubFee = _hubFee;
    }

    function baseCapacity(uint256 _tokenId) public view returns (uint256) {
        uint256 _transfer;
        if (block.number > hubState[_tokenId].timestamp + 1 days) {
            _transfer = hubState[_tokenId].level * landBonus[_tokenId] * 1 ether;
        } else {
            _transfer = hubState[_tokenId].currentCap;
        }
        return _transfer;
    }

    function mintResByTBridge(
        address _sender,
        uint256 _tokenId, 
        uint256 _baseAmount, 
        uint256 _realAmount,
        address _resAddr
    ) external onlyOwner {
        if (block.number > hubState[_tokenId].timestamp + 1 days) {
            hubState[_tokenId].currentCap = baseCapacity(_tokenId);
            hubState[_tokenId].timestamp = block.timestamp;
        }

        hubState[_tokenId].currentCap -= _baseAmount;

        BBQ(_resAddr).mint(1908899, _sender, _realAmount - ((_realAmount * hubState[_tokenId].hubFee) / 10000));
        BBQ(_resAddr).mint(1908899, CMCITY_SLOT1(cmcitySlot1).slotOwner(_tokenId), ((_realAmount * hubState[_tokenId].hubFee) / 10000));
    }
}
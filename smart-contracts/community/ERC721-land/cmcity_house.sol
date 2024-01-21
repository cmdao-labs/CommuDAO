// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./cmcity_slot1.sol";

contract CMCITY_HOUSE is Ownable {
    address public cmcitySlot1; 
    mapping(uint256 => address) public resources;
    struct UpLevel {
        uint256 newLevel;
        uint256 resource1Req;
        uint256 resource2Req;
        uint256 resource3Req;
        uint256 resource4Req;
        uint256 resource5Req;
    }
    mapping(uint256 => UpLevel) public upLevel;

    constructor(address _slot1) {
        cmcitySlot1 = _slot1;
    }

    function setResource(uint256 _index, address _resource) external onlyOwner {
        resources[_index] = _resource;
    }

    function setUplevel(
        uint256 _index,
        uint256 _newLevel,
        uint256 _resource1Req,
        uint256 _resource2Req,
        uint256 _resource3Req,
        uint256 _resource4Req,
        uint256 _resource5Req
    ) external onlyOwner {
        upLevel[_index].newLevel = _newLevel;
        upLevel[_index].resource1Req = _resource1Req;
        upLevel[_index].resource2Req = _resource2Req;
        upLevel[_index].resource3Req = _resource3Req;
        upLevel[_index].resource4Req = _resource4Req;
        upLevel[_index].resource5Req = _resource5Req;
    }

    function upgrade(uint256 _index, uint256 _tokenId) external {
        require(CMCITY_SLOT1(cmcitySlot1).slotLevel(_tokenId) + 1 == upLevel[_index].newLevel, "Level too low");

        if (upLevel[_index].resource1Req > 0) {
            IERC20(resources[1]).transferFrom(msg.sender, address(1), upLevel[_index].resource1Req);
        }
        if (upLevel[_index].resource2Req > 0) {
            IERC20(resources[2]).transferFrom(msg.sender, address(1), upLevel[_index].resource2Req);
        }
        if (upLevel[_index].resource3Req > 0) {
            IERC20(resources[3]).transferFrom(msg.sender, address(1), upLevel[_index].resource3Req);
        }
        if (upLevel[_index].resource4Req > 0) {
            IERC20(resources[4]).transferFrom(msg.sender, address(1), upLevel[_index].resource4Req);
        }
        if (upLevel[_index].resource5Req > 0) {
            IERC20(resources[5]).transferFrom(msg.sender, address(1), upLevel[_index].resource5Req);
        }

        CMCITY_SLOT1(cmcitySlot1).upLevel(1, _tokenId);
    }
}
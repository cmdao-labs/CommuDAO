// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "./cmcity_slot1.sol";

contract CMCITY_CONSTRUCTION is Ownable {
    address public cmcitySlot1;
    mapping(uint256 => address) public resources;
    struct UpLevel {
        uint256 slot1LvRequire;
        uint256 newLevel;
        uint256 resource1Req;
        uint256 resource2Req;
        uint256 resource3Req;
        uint256 resource4Req;
        uint256 resource5Req;
    }
    mapping(uint256 => UpLevel) public upLevel01;
    mapping(uint256 => UpLevel) public upLevel02;
    mapping(uint256 => uint256) public landBonus;
    mapping(uint256 => uint256) public constructionLevel;

    constructor(address _slot1) {
        cmcitySlot1 = _slot1;
    }

    function setLandBonus(uint256 _index, uint256 _landBonus) external onlyOwner {
        landBonus[_index] = _landBonus;
    }

    function setResource(uint256 _index, address _resource) external onlyOwner {
        resources[_index] = _resource;
    }

    function setUplevel01(
        uint256 _index,
        uint256 _slot1LvRequire,
        uint256 _newLevel,
        uint256 _resource1Req,
        uint256 _resource2Req,
        uint256 _resource3Req,
        uint256 _resource4Req,
        uint256 _resource5Req
    ) external onlyOwner {
        upLevel01[_index].slot1LvRequire = _slot1LvRequire;
        upLevel01[_index].newLevel = _newLevel;
        upLevel01[_index].resource1Req = _resource1Req;
        upLevel01[_index].resource2Req = _resource2Req;
        upLevel01[_index].resource3Req = _resource3Req;
        upLevel01[_index].resource4Req = _resource4Req;
        upLevel01[_index].resource5Req = _resource5Req;
    }

    function upgrade01(uint256 _index, uint256 _tokenId) external {
        require(CMCITY_SLOT1(cmcitySlot1).slotLevel(_tokenId) >= upLevel01[_index].slot1LvRequire, "Insufficient House Level");
        require(constructionLevel[_tokenId] + 1 == upLevel01[_index].newLevel, "Level too low");

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

        constructionLevel[_tokenId] += 1;
    }

    function setUplevel02(
        uint256 _index,
        uint256 _slot1LvRequire,
        uint256 _newLevel,
        uint256 _resource1Req,
        uint256 _resource2Req,
        uint256 _resource3Req,
        uint256 _resource4Req,
        uint256 _resource5Req
    ) external onlyOwner {
        upLevel02[_index].slot1LvRequire = _slot1LvRequire;
        upLevel02[_index].newLevel = _newLevel;
        upLevel02[_index].resource1Req = _resource1Req;
        upLevel02[_index].resource2Req = _resource2Req;
        upLevel02[_index].resource3Req = _resource3Req;
        upLevel02[_index].resource4Req = _resource4Req;
        upLevel02[_index].resource5Req = _resource5Req;
    }

    function upgrade02(uint256 _index, uint256 _tokenId) external {
        require(CMCITY_SLOT1(cmcitySlot1).slotLevel(_tokenId) >= upLevel02[_index].slot1LvRequire, "Insufficient House Level");
        require(constructionLevel[_tokenId] + 1 == upLevel02[_index].newLevel, "Level too low");

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

        constructionLevel[_tokenId] += 1;
    }
}
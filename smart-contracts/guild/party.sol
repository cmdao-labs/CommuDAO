//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/access/Ownable.sol";

contract party is Ownable {

    mapping(uint256 => string) public partyName;
    mapping(uint256 => string) public partyLogo;
    struct PartyBody {
        address member1;
        address member2;
        address member3;
        address member4;
        address member5;
        uint256 refuelAt;
    }
    mapping(uint256 => PartyBody) public partyBody;
    uint256[] public partyActive;
    mapping(uint256 => mapping(uint256 => bool)) public isAllRefuel;
    mapping(uint256 => mapping(address => uint256)) public missionDelegate;
    
    uint256 public baseGas;
    uint256 public refuelGas;

    mapping(address => bool) public isMemberNotAvai;
    mapping(address => uint256) public nonTransferSCM;
    
    constructor() Ownable(msg.sender) {}
    
    function setGas(uint256 _baseGas, uint256 _refuelGas) external onlyOwner {
        baseGas = _baseGas;
        refuelGas = _refuelGas;
    }

    function withdrawGas(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    function setPartyHeader(
        uint256 _index,
        string memory _name,
        string memory _logo
    ) external payable {
        require(msg.value >= baseGas);
        nonTransferSCM[msg.sender] += msg.value;

        partyName[_index] = _name;
        partyLogo[_index] = _logo;
        partyBody[_index].member1 = msg.sender;
        isMemberNotAvai[partyBody[_index].member1] = true;
        partyActive.push(_index);
    }

    function setPartyBody(
        uint256 _index,
        uint256 _memberIndex,
        address _addr
    ) external payable {
        require(
            msg.value >= baseGas &&
            (partyBody[_index].member1 == msg.sender || owner() == msg.sender)
        );
        nonTransferSCM[msg.sender] += msg.value;
        isMemberNotAvai[_addr] = true;

        if (_memberIndex == 1) {
            delete isMemberNotAvai[partyBody[_index].member1];
            partyBody[_index].member1 = _addr;
        } else if (_memberIndex == 2) {
            delete isMemberNotAvai[partyBody[_index].member2];
            partyBody[_index].member2 = _addr;
        } else if (_memberIndex == 3) {
            delete isMemberNotAvai[partyBody[_index].member3];
            partyBody[_index].member3 = _addr;
        } else if (_memberIndex == 4) {
            delete isMemberNotAvai[partyBody[_index].member4];
            partyBody[_index].member4 = _addr;
        } else if (_memberIndex == 5) {
            delete isMemberNotAvai[partyBody[_index].member5];
            partyBody[_index].member5 = _addr;
        } else {
            revert();
        }
    }

    function delegateMission(
        uint256 _index,
        address _to,
        uint256 _amount
    ) external payable {
        require(
            msg.value >= baseGas &&
            isAllRefuel[_index][0] &&
            isAllRefuel[_index][1] &&
            (partyBody[_index].member3 != address(0) || isAllRefuel[_index][2]) &&
            (partyBody[_index].member4 != address(0) || isAllRefuel[_index][3]) &&
            (partyBody[_index].member5 != address(0) || isAllRefuel[_index][4])
        );
        nonTransferSCM[msg.sender] += msg.value;

        delete isAllRefuel[_index][0];
        delete isAllRefuel[_index][1];
        delete isAllRefuel[_index][2];
        delete isAllRefuel[_index][3];
        delete isAllRefuel[_index][4];

        missionDelegate[_index][_to] = _amount;
        partyBody[_index].refuelAt = block.timestamp;
    }

    function refuel(uint256 _index, uint256 _memberIndex) external payable {
        require(msg.value >= refuelGas);
        nonTransferSCM[msg.sender] += msg.value;

        isAllRefuel[_index][_memberIndex] = true;
    }
}
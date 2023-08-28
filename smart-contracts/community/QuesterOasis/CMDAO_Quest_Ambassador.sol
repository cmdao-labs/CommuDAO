// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/commudao-labs/CommuDAO/blob/main/smart-contracts/others/CMDAO-KYC.sol";

contract CMDAO_CoreQuest_Ambassador_V03 {
    address public kyc;
    uint256 public registCount;
    struct ReferalData {
        address fren;
        address ambassador;
    }
    mapping(uint256=>ReferalData) public referalData;
    mapping(address=>uint256) public registIndex;
    mapping(address=>uint256) public frenCount;

    constructor(address _kyc) {
        kyc = _kyc;
    }

    function regist(address _ambassador) external {      
        require(CMDAO_KYC(kyc).kyc(0, msg.sender) && CMDAO_KYC(kyc).kyc(0, _ambassador), "Only KYC!");  
        require(registIndex[msg.sender] == 0, "Already Regist!");
        require(msg.sender != _ambassador, "Forever Alone!");
        registCount += 1;
        registIndex[msg.sender] = registCount;
        referalData[registCount].fren = msg.sender;
        referalData[registCount].ambassador = _ambassador;
        frenCount[_ambassador] += 1;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CMDAO_KYC is Ownable {
    mapping(uint256=>mapping(address=>bool)) public kyc;

    function setKYC(
        uint256 _index,
        address _addr,
        bool _isKYC
    ) external onlyOwner {
        kyc[_index][_addr] = _isKYC;
    }
}
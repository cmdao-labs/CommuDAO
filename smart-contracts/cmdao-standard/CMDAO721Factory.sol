//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CMDAO721.sol";

contract CMDAO721Factory is Ownable {
   CMDAO721[] public CMDAO721Array;

   constructor() Ownable(msg.sender) {}

   function CreateCMDAO721(string memory _nftName, string memory _nftSymbol) external {
     CMDAO721 nftAddr = new CMDAO721(_nftName, _nftSymbol, owner());
     CMDAO721Array.push(nftAddr);
   }
}
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CMDAOAmmNpc.sol";

contract CMDAOAmmNpcFactory {
    CMDAOAmmNpc[] public CMDAOAmmNpcArray;

    function CreateCMDAOAmmNpc (
        string memory _lpName,
        string memory _lpSymbol,
        address _token,
        address _currency,
        address _merchant,
        uint256 _merchantFee,
        uint256 _lpFee
    ) external {
        CMDAOAmmNpc npcAddr = new CMDAOAmmNpc(_lpName, _lpSymbol, _token, _currency, _merchant, _merchantFee, _lpFee);
        CMDAOAmmNpcArray.push(npcAddr);
    }
}
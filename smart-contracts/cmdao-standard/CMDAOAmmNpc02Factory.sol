//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CMDAOAmmNpc02.sol";

contract CMDAOAmmNpcFactory {
    CMDAOAmmNpc02[] public CMDAOAmmNpcArray;

    function CreateCMDAOAmmNpc (
        string memory _lpName,
        string memory _lpSymbol,
        address _token,
        address _currency,
        address _merchant,
        uint256 _merchantFee,
        address _project,
        uint256 _projectFee,
        uint256 _lpFee
    ) external {
        CMDAOAmmNpc02 npcAddr = new CMDAOAmmNpc02(_lpName, _lpSymbol, _token, _currency, _merchant, _merchantFee, _project, _projectFee, _lpFee);
        CMDAOAmmNpcArray.push(npcAddr);
    }
}
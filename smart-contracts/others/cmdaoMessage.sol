// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/access/Ownable.sol";

contract CMDAO_Msg is Ownable {
    event Message(address indexed sender, address indexed mention, uint256 indexed index, string message);

    constructor() Ownable(msg.sender) {}

    function sendMessage(
        address _mention,
        uint256 _index,
        string memory _msg
    ) external payable {
        require(msg.value == 0.01 ether, "Insufficient Sender Fee");

        emit Message(msg.sender, _mention, _index, _msg);
    }

    function withdrawJbc(uint256 _amount, address _to) external onlyOwner {
        payable(_to).transfer(_amount);
    }
}
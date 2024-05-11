// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.1/contracts/access/Ownable.sol";

contract cmcityPoints is ERC20, Ownable {
    mapping(uint256 => address) public tokens;
    mapping(uint256 => uint256) public voteRewards;
    mapping(uint256 => uint256) public votes;
    mapping(uint256 => bool) public isTerminate;
    struct Proposal {
        string title;
        string description;
        uint256 timestamp;
        uint256 voteTokenIndex;
        uint256 voteTokenReq;
        address proposer;
    }
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalLength;

    constructor() ERC20("CMCITY POINTS", "CM-POINTS") Ownable(msg.sender) {}

    function setTokens(uint256 _index, address _addr) external onlyOwner {
        tokens[_index] = _addr;
    }

    function setVoteRewards(uint256 _index, uint256 _voteRewards) external onlyOwner {
        voteRewards[_index] = _voteRewards;
    }

    function addProposal(
        string memory _title,
        string memory _description,
        uint256 _voteTokenIndex,
        uint256 _voteTokenReq
    ) external {
        proposalLength++;
        proposals[proposalLength].title = _title;
        proposals[proposalLength].description = _description;
        proposals[proposalLength].timestamp = block.timestamp;
        proposals[proposalLength].voteTokenIndex = _voteTokenIndex;
        proposals[proposalLength].voteTokenReq = _voteTokenReq;
        proposals[proposalLength].proposer = msg.sender;
    }

    function vote(uint256 _proposalIndex, uint256 _voteAmount) external {
        require(_proposalIndex <= proposalLength, "Invalid proposal index.");
        require(!isTerminate[_proposalIndex], "Proposal was terminated.");

        ERC20(tokens[proposals[_proposalIndex].voteTokenIndex]).transferFrom(msg.sender, address(this), _voteAmount);
        votes[_proposalIndex] += _voteAmount;
        _mint(msg.sender, _voteAmount * voteRewards[proposals[_proposalIndex].voteTokenIndex]);
    }

    function terminate(uint256 _proposalIndex) external {
        require(msg.sender == proposals[_proposalIndex].proposer, "Only the owner can terminate proposals.");
        
        isTerminate[_proposalIndex] = true;
        ERC20(tokens[proposals[_proposalIndex].voteTokenIndex]).transfer(msg.sender, votes[_proposalIndex]);
    }
}
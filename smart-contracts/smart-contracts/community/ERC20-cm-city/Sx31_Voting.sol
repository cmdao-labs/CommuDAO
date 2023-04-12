// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Sx31_Voting is ERC20, ReentrancyGuard {
    address public token;

    mapping(uint256 => uint256) public votes;

    mapping(uint256 => bool) public isTerminate;

    struct Proposal {
        string title;
        string description;
        uint256 timestamp;
        address proposer;
    }
    mapping(uint256 => Proposal) public proposals;

    uint256 public proposalLength;

    constructor(address _token) ERC20("Ory Club Token", "OCT") {
        token = _token;
    }

    function addProposal(string memory _title, string memory _description) external {
        ERC20(token).transferFrom(msg.sender, address(this), 100 * 1e18);
        proposalLength++;
        proposals[proposalLength].title = _title;
        proposals[proposalLength].description = _description;
        proposals[proposalLength].timestamp = block.timestamp;
        proposals[proposalLength].proposer = msg.sender;
        _mint(msg.sender, 100 * 1e18);
    }

    function vote(uint256 _proposalIndex, uint256 _voteAmount) external {
        require(_proposalIndex <= proposalLength, "Invalid proposal index.");
        require(isTerminate[_proposalIndex] == false, "Proposal was finished.");

        ERC20(token).transferFrom(msg.sender, address(this), _voteAmount);
        votes[_proposalIndex] += _voteAmount;
        _mint(msg.sender, _voteAmount);
    }

    function terminate(uint256 _proposalIndex) external nonReentrant {
        require(msg.sender == proposals[_proposalIndex].proposer, "Only the owner can terminate proposals.");
        
        isTerminate[_proposalIndex] = true;
        ERC20(token).transfer(msg.sender, votes[_proposalIndex]);
    }
}
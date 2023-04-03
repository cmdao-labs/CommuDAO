// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CannedTuna is ERC20, ReentrancyGuard {
    address public tuna;
    address public cmj;
    address public projectAdmin;
    modifier onlyProjectAdmin() {
        require(msg.sender == projectAdmin, "NP"); // NP : Not Permission to call
        _;
    }

    struct log {
        bool isCraft;
        uint256 laststamp;
    }
    mapping(address=>log) public tunaSupplier;

    constructor(address _tuna, address _cmj) ERC20("Canned Tuna", "CTUNA") {
        tuna = _tuna;
        cmj = _cmj;
        projectAdmin = msg.sender;
    }

    function setProjectAdmin(address _addr) external onlyProjectAdmin {
        projectAdmin = _addr;
    }

    function withdrawCmj(uint256 _amount, address _to) external onlyProjectAdmin {
        ERC20(cmj).transfer(_to, _amount);
    }

    function withdrawTuna(uint256 _amount, address _to) external onlyProjectAdmin {
        ERC20(tuna).transfer(_to, _amount);
    }

    function craft() external nonReentrant {
        require(tunaSupplier[msg.sender].isCraft == false, "Under Production");

        tunaSupplier[msg.sender].laststamp = block.timestamp;
        tunaSupplier[msg.sender].isCraft = true;

        ERC20(tuna).transferFrom(msg.sender, address(this), 50 * 1e18);
        ERC20(cmj).transferFrom(msg.sender, address(this), 10 * 1e18);
    }

    function claim() external nonReentrant {
        require(tunaSupplier[msg.sender].isCraft == true, "No production");
        require(tunaSupplier[msg.sender].laststamp + 1 hours < block.timestamp, "Under Production");

        tunaSupplier[msg.sender].isCraft = false;

        _mint(msg.sender, 50 * 1e18);
    }
}
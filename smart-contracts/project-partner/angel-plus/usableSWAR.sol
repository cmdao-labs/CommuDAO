// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./dungeonANGB.sol";

contract usableSWAR is ERC20, Ownable {
    address public swar;
    address public dunANGB;
    mapping(uint256 => uint256) public machine;
    mapping(address => uint256) public laststamp;

    constructor(address _swar, address _dunANGB) ERC20("AP - Usable SWAR", "AP - uSWAR") Ownable(msg.sender) {
        swar = _swar;
        dunANGB = _dunANGB;
    }

    function setMachine(uint256 _index, uint256 _swarUsage) external onlyOwner {
        machine[_index] = _swarUsage;
    }

    function craft(uint256 _index) external {
        require(machine[_index] > 0, "Inactive Machine");
        require(laststamp[msg.sender] + 24 hours < block.timestamp, "Addr Cool Down!");
        laststamp[msg.sender] = block.timestamp;
        ERC20(swar).transferFrom(msg.sender, address(1), machine[_index]);
        _mint(msg.sender, 1 ether);
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        require(to == address(1));
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        (,,,,,,,, uint256 cmpow,,) = dungeonANGB(dunANGB).nftEquip(from);
        require(cmpow > 0, "NFT reentrancy on dun SC is limited!");
        require(to == address(dunANGB));
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }
}
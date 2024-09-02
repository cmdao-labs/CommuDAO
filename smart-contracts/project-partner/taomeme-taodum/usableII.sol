// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./dungeonEE.sol";

contract usableII is ERC20, Ownable {
    address public ii;
    address public dunEE;
    address public pfp;
    struct Machine {
        uint256 iiUsage;
        uint256 startPfpId;
        uint256 endPfpId;
    }
    mapping(uint256 => Machine) public machine;
    mapping(address => uint256) public laststamp;
    mapping(uint256 => uint256) public pfplaststamp;

    constructor(
        address _ii, 
        address _dunEE,
        address _pfp
    ) ERC20("TDM - Usable II", "TDM - uII") Ownable(msg.sender) {
        ii = _ii;
        dunEE = _dunEE;
        pfp = _pfp;
    }

    function setMachine(
        uint256 _index,
        uint256 _iiUsage,
        uint256 _startPfpId,
        uint256 _endPfpId
    ) external onlyOwner {
        machine[_index].iiUsage = _iiUsage;
        machine[_index].startPfpId = _startPfpId;
        machine[_index].endPfpId = _endPfpId;
    }

    function craft(uint256 _index, uint256 _pfpId) external {
        require(machine[_index].iiUsage > 0, "Inactive Machine");
        require(_pfpId == 0 || IERC721(pfp).ownerOf(_pfpId) == msg.sender, "You are not owner of this PFP");
        require(_pfpId >= machine[_index].startPfpId && _pfpId <= machine[_index].endPfpId, "Mismatch machine PFP id");
        require(laststamp[msg.sender] + 24 hours < block.timestamp, "Addr Cool Down!");
        require(pfplaststamp[_pfpId] + 24 hours < block.timestamp, "PFP Cool Down!");
        laststamp[msg.sender] = block.timestamp;
        if (_pfpId != 0) {
            pfplaststamp[_pfpId] = block.timestamp;
        }
        ERC20(ii).transferFrom(msg.sender, address(1), machine[_index].iiUsage);
        _mint(msg.sender, 1 ether);
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        require(to == address(1));
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        (,,,,,,, uint256 cmpow,,) = dungeonEE(dunEE).nftStatus(from);
        require(cmpow > 0, "NFT reentrancy on dun SC is limited!");
        require(to == address(dunEE));
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }
}
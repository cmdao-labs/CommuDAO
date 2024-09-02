// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./dungeonCopper.sol";

contract usableBBQ is ERC20, Ownable {
    address public bbq;
    address public dunCU;
    address public cmdaonft;
    struct Machine {
        uint256 bbqUsage;
        uint256 startCsId;
        uint256 endCsId;
    }
    mapping(uint256 => Machine) public machine;
    mapping(address => uint256) public laststamp;
    struct Cs {
        uint256 id;
        uint256 usage;
        uint256 machine;
    }
    mapping(address => Cs) public cs;

    constructor(
        address _bbq, 
        address _dunCU,
        address _cmdaonft
    ) ERC20("Usable BBQ", "uBBQ") {
        bbq = _bbq;
        dunCU = _dunCU;
        cmdaonft = _cmdaonft;
    }

    function setMachine(
        uint256 _index,
        uint256 _bbqUsage,
        uint256 _startCsId,
        uint256 _endCsId
    ) external onlyOwner {
        machine[_index].bbqUsage = _bbqUsage;
        machine[_index].startCsId = _startCsId;
        machine[_index].endCsId = _endCsId;
    }

    function depositCs(uint256 _index, uint256 _csId) external {
        require(machine[_index].startCsId > 0, "Inactive Machine");
        require(_csId >= machine[_index].startCsId && _csId <= machine[_index].endCsId, "Mismatch machine CS id");
        IERC721(cmdaonft).transferFrom(msg.sender, address(this), _csId);
        cs[msg.sender].id = _csId;
        cs[msg.sender].machine = _index;
    }

    function craft() external {
        require(laststamp[msg.sender] + 1 hours < block.timestamp, "Addr Cool Down!");
        laststamp[msg.sender] = block.timestamp;
        if (cs[msg.sender].machine != 0) {
            cs[msg.sender].usage += 1;
            if (cs[msg.sender].usage == 100) {
                IERC721(cmdaonft).transferFrom(address(this), address(1), cs[msg.sender].id);
                delete cs[msg.sender];
            }
        }
        ERC20(bbq).transferFrom(msg.sender, address(1), machine[cs[msg.sender].machine].bbqUsage);
        _mint(msg.sender, 500 ether);
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        require(to == address(1));
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        (,,, uint256 cmpow,,) = dungeonCopper(dunCU).nftEquip(from);
        require(cmpow > 0, "NFT reentrancy on dun SC is limited!");
        require(to == address(dunCU));
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }
}
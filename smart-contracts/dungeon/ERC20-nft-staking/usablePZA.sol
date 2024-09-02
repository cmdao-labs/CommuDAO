// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./dungeonJasper.sol";

// File: @openzeppelin/contracts/access/Ownable.sol

// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

contract usablePZA is ERC20, Ownable {
    address public pza;
    address public dunJASP;
    address public cmdaonft;
    struct Machine {
        uint256 pzaUsage;
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
        address _pza, 
        address _dunJASP,
        address _cmdaonft
    ) ERC20("Usable PZA", "uPZA") {
        pza = _pza;
        dunJASP = _dunJASP;
        cmdaonft = _cmdaonft;
    }

    function setMachine(
        uint256 _index,
        uint256 _pzaUsage,
        uint256 _startCsId,
        uint256 _endCsId
    ) external onlyOwner {
        machine[_index].pzaUsage = _pzaUsage;
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
        require(laststamp[msg.sender] + 24 hours < block.timestamp, "Addr Cool Down!");
        laststamp[msg.sender] = block.timestamp;
        if (cs[msg.sender].machine != 0) {
            cs[msg.sender].usage += 1;
            if (cs[msg.sender].usage == 100) {
                IERC721(cmdaonft).transferFrom(address(this), address(1), cs[msg.sender].id);
                delete cs[msg.sender];
            }
        }
        ERC20(pza).transferFrom(msg.sender, address(1), machine[cs[msg.sender].machine].pzaUsage);
        _mint(msg.sender, 500 ether);
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        require(to == address(1));
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        (,,,,,,, uint256 cmpow,,) = dungeonJasper(dunJASP).nftEquip(from);
        require(cmpow > 0, "NFT reentrancy on dun SC is limited!");
        require(to == address(dunJASP));
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMD_ID is ERC721URIStorage, Ownable {
    mapping (string => address) public availability;
    mapping (address => uint256) public yourName;
    address public cmj;
    uint256 public registerFee;
    uint256 public changeFee;
    uint256 public nameId;

    constructor (
        address _cmj,
        uint256 _registerFee,
        uint256 _changeFee
    ) ERC721("CommuDAO ID NFT", "CMD-ID") {
        cmj = _cmj;
        registerFee = _registerFee;
        changeFee = _changeFee;
    }

    function withdrawCmj(uint256 _amount, address _to) external onlyOwner {
        IERC20(cmj).transfer(_to ,_amount);
    }

    function setFee(uint256 _registerFee, uint256 _changeFee) external onlyOwner {
        registerFee = _registerFee;
        changeFee = _changeFee;
    }

    function idMint(string memory tokenURI) public {
        require(balanceOf(msg.sender) == 0, "Already Mint");
        require(bytes(tokenURI).length <= 128, "Id length limit : 128 bytes");
        require(availability[tokenURI] == address(0), "Id is not available");
        nameId++;
        yourName[msg.sender] = nameId;

        IERC20(cmj).transferFrom(msg.sender, address(this), registerFee);
        _safeMint(msg.sender, nameId);
        _setTokenURI(nameId, tokenURI);
        availability[tokenURI] = msg.sender;
    }

    function idChange(string memory newTokenURI) external {
        IERC20(cmj).transferFrom(msg.sender, address(this), changeFee);
        delete availability[tokenURI(yourName[msg.sender])];
        _burn(yourName[msg.sender]);

        idMint(newTokenURI);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) {
        revert();
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) {
       revert();
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(ERC721, IERC721) {
        revert();
    }
}
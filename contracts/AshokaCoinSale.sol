pragma solidity >=0.4.22 <0.9.0;

import "./AshokaCoin.sol";

contract AshokaCoinSale {
    address admin;
    AshokaCoin public tokenContract;
    uint256 public tokenPrice;

    constructor(AshokaCoin _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        //token price


    }
}
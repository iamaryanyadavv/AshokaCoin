pragma solidity >=0.4.22 <0.9.0;

import "./AshokaCoin.sol";

contract AshokaCoinSale {
    address admin;
    AshokaCoin public tokenContract;

    constructor(AshokaCoin _tokenContract) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        
        //token price


    }
}
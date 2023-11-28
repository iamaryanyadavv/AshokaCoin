// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AshokaCoin {

    string public name = "AshokaCoin";
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    //Constructor
    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;

        totalSupply = _initialSupply; // 5 million
        // allocate the initial supply
    }

    //Set total tokens
    //Read total tokens

}
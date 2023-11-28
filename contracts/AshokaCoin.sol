// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AshokaCoin {

    string public name = "AshokaCoin";
    string public symbol = "Ashonk";
    string public standard = "AshokaCoin v1.0";
    uint256 public totalSupply;

    event Transfer(
        address _from,
        address _to,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;

    //Constructor
    constructor(uint256 _initialSupply) public {

        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply; // 5 million
        // allocate the initial supply
    }

    //Set total tokens
    //Read total tokens

    // Transfer
    function transfer(address _to, uint256 _value) public returns (bool success) {
        // exception if account doesn't have enough
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value; //deducting from account
        balanceOf[_to] += _value; //adding to other's account
        // return a boolean
        // transfer event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

}